<script>
export default {
  props: ["title"],
};
</script>

<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#navbar-help"
      data-bs-toggle="dropdown"
      data-bs-auto-close="outside"
      role="button"
      aria-expanded="false"
    >
      <span class="nav-link-icon d-md-none d-lg-inline-block"
        ><!-- Download SVG icon from http://tabler-icons.io/i/lifebuoy -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-message"
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
          <path
            d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"
          ></path>
          <line x1="8" y1="9" x2="16" y2="9"></line>
          <line x1="8" y1="13" x2="14" y2="13"></line>
        </svg>
      </span>
      <span class="nav-link-title"> {{ title }} </span>
    </a>
    <div class="dropdown-menu">
      <slot name="item-dropdown"></slot>
    </div>
  </li>
</template>
