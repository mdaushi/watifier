<script setup>
import ItemTopbar from "./ItemTopbar.vue";
import Search from "./Search.vue";
</script>

<template>
  <div class="navbar-expand-md">
    <div class="collapse navbar-collapse" id="navbar-menu">
      <div class="navbar navbar-light">
        <div class="container-xl">
          <ul class="navbar-nav">
            <ItemTopbar title="Home" to="/">
              <template #icon>
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
                  <polyline points="5 12 3 12 12 3 21 12 19 12" />
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                </svg>
              </template>
            </ItemTopbar>
            <ItemTopbar title="Devices" to="/devices">
              <template #icon>
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
              </template>
            </ItemTopbar>
          </ul>
          <Search />
        </div>
      </div>
    </div>
  </div>
</template>
