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
    sendMessages() {
      HTTP.post("chats/send?id=" + this.input.sender, {
        receiver: this.input.receiver,
        message: {
          text: this.input.message,
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
            <h2 class="page-title">Message Text</h2>
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
                <h4 class="card-title">Message Text</h4>
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
                <div class="mb-3">
                  <label class="form-label">
                    Message
                    <span class="form-label-description">56/100</span></label
                  >
                  <textarea
                    class="form-control"
                    name="example-textarea-input"
                    rows="6"
                    placeholder="Halo, Watifier"
                    v-model="input.message"
                  ></textarea>
                </div>
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
