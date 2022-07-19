<script>
import BaseLayout from "../components/BaseLayout.vue";
import BaseModal from "../components/modals/BaseModal.vue";
import CardActions from "../components/cards/CardActions.vue";
import { HTTP } from "../../axios.js";

export default {
  components: {
    BaseLayout,
    BaseModal,
    CardActions,
  },
  data() {
    return {
      input: {},
      data: {
        getSession: {
          message: null,
          data: {
            qr: null,
          },
        },
        devices: [],
        scanning_success: false,
      },
    };
  },
  mounted() {
    this.getDevices();
  },
  methods: {
    createDevice() {
      this.data.getSession.message = "Generate Qrcode, mohon tunggu...";
      HTTP.post("sessions/add", {
        id: this.input.id,
        isLegacy: false,
      })
        .then((response) => {
          this.data.getSession = response.data;
          this.verifyScan();
        })
        .catch((e) => {
          this.data.getSession.message = "Generate Qrcode gagal...";
          console.log(e);
        });
    },
    getDevices() {
      HTTP.get("sessions/list")
        .then((response) => {
          var data = response.data.data;
          this.data.devices = data.map((item) => {
            return {
              name: item.name,
              type: item.isLegacy == true ? "Legacy" : "Multi Device",
            };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    verifyScan() {
      var verify = setInterval(() => {
        HTTP.get("sessions/status/" + this.input.id)
          .then((response) => {
            if (response.data.data.status == "authenticated") {
              // stop interval
              clearInterval(verify);
              // close modal n clear data
              document.getElementById("closeModal").click();
              this.data.getSession.message = null;
              this.data.getSession.data.qr = null;
              this.input = {};

              this.getDevices();
            }
          })
          .catch((err) => {
            clearInterval(verify);
            this.data.getSession.message =
              "Tidak ada device yang terhubung, " + err;
            this.data.getSession.data.qr = null;
            this.input = {};
          });
      }, 3000);
    },
  },
};
</script>

<template>
  <BaseLayout>
    <div class="container-xl">
      <!-- Page title -->
      <div class="page-header d-print-none">
        <div class="row g-2 align-items-center">
          <div class="col">
            <!-- Page pre-title -->
            <div class="page-pretitle">Devices</div>
            <h2 class="page-title">Devices List</h2>
          </div>
          <!-- Page title actions -->
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <a
                href="#"
                class="btn btn-primary d-none d-sm-inline-block"
                data-bs-toggle="modal"
                data-bs-target="#modal-report"
              >
                <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Tambah Device
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- page body -->
    <div class="page-body">
      <div class="container-xl">
        <div class="col-12">
          <div class="row row-cards" v-if="data.devices.length > 0">
            <CardActions
              v-for="(device, index) in data.devices"
              :key="index"
              :title="device.name"
              :type="device.type"
            />
          </div>
          <div class="empty" v-else>
            <div class="empty-img">
              <img
                src="@/assets/undraw_printing_invoices_5r4r.svg"
                height="128"
                alt=""
              />
            </div>
            <p class="empty-title">Belum ada device yang terhubung</p>
            <p class="empty-subtitle text-muted">
              Silahkan tambah device terlebih dahulu
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <BaseModal title="Tambah Device">
      <template #content>
        <div class="mb-3">
          <label class="form-label">ID</label>
          <input
            type="text"
            class="form-control"
            v-model="input.id"
            placeholder="Your device ID"
            autocomplete="off"
          />
        </div>
        <div class="mb-3 text-center">
          <p>{{ data.getSession.message }}</p>
          <img :src="data.getSession.data.qr" />
        </div>
      </template>
      <template #footer>
        <a
          href="#"
          class="btn btn-link link-secondary"
          id="closeModal"
          data-bs-dismiss="modal"
        >
          Cancel
        </a>
        <button @click="createDevice()" class="btn btn-primary ms-auto">
          <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Tambah Device Baru
        </button>
      </template>
    </BaseModal>
  </BaseLayout>
</template>
