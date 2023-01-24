<script>
import BaseLayout from "../components/BaseLayout.vue";
import { HTTP } from "../../axios.js";

export default {
  components: {
    BaseLayout,
  },
  mounted() {
    this.getDevices();
  },
  data() {
    return {
      input: {},
      data: {
        devices: [],
      },
    };
  },
  methods: {
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
    imageChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();

      reader.onload = (event) => {
        const image = event.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");

        this.input.image = image;
      };
      reader.readAsDataURL(file);
    },
    sendMessages() {
      HTTP.post("chats/send?id=" + this.input.sender, {
        receiver: this.input.receiver,
        message: {
          image: this.input.image,
          caption: this.input.caption,
        },
      })
        .then((response) => {
          this.$swal({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 3000,
            toast: true,
          });
          this.input = {};
        })
        .catch((err) => {
          this.$swal({
            position: "top-end",
            icon: "error",
            title: err,
            showConfirmButton: false,
            timer: 3000,
            toast: true,
          });
          this.input = {};
        });
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
            <div class="page-pretitle">Messages</div>
            <h2 class="page-title">Message Image</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- page body -->
    <div class="page-body">
      <div class="container-xl">
        <div class="row row-cards">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Message Image</h4>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-xl-6">
                    <div class="mb-3">
                      <div class="form-label">Sender</div>
                      <select class="form-select" v-model="input.sender">
                        <option disabled value="">Please select sender</option>
                        <option
                          v-for="(device, index) in data.devices"
                          :key="index"
                          :value="device.name"
                        >
                          {{ device.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="mb-3">
                      <div class="form-label">Number Receiver</div>
                      <input
                        type="text"
                        class="form-control"
                        name="example-text-input"
                        placeholder="62xxxxxxxxxx"
                        v-model="input.receiver"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-6">
                    <div class="mb-3">
                      <div class="form-label">Image</div>
                      <input
                        type="file"
                        @change="imageChange"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="mb-3">
                      <div class="form-label">Caption</div>
                      <input
                        type="text"
                        class="form-control"
                        name="example-text-input"
                        placeholder="Caption"
                        v-model="input.caption"
                      />
                    </div>
                  </div>
                </div>
                <img :src="input.image" alt="" />
              </div>
              <div class="card-footer text-end">
                <div class="d-flex">
                  <button
                    @click="sendMessages()"
                    class="btn btn-primary ms-auto"
                  >
                    Send message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
