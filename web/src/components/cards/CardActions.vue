<script>
export default {
  props: ["title", "type"],
};
</script>

<template>
  <div class="col-sm-6 col-lg-3">
    <div class="card card-sm">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-auto">
            <span class="bg-twitter text-white avatar"
              ><!-- Download SVG icon from http://tabler-icons.io/i/brand-twitter -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-device-mobile"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="6" y="3" width="12" height="18" rx="2"></rect>
                <line x1="11" y1="4" x2="13" y2="4"></line>
                <line x1="12" y1="17" x2="12" y2="17.01"></line>
              </svg>
            </span>
          </div>
          <div class="col">
            <div class="font-weight-medium">{{ title }}</div>
            <div class="text-muted">{{ type }}</div>
          </div>
          <div class="col-auto">
            <div class="card-actions">
              <div class="dropdown">
                <a
                  href="#"
                  class="btn-action dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  ><!-- Download SVG icon from http://tabler-icons.io/i/dots-vertical -->
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
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                  </svg>
                </a>
                <div class="dropdown-menu dropdown-menu-end" style="">
                  <a class="dropdown-item" href="#">Edit user</a>
                  <a class="dropdown-item" href="#">Change permissions</a>
                  <a class="dropdown-item text-danger" href="#">Delete user</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
