<script setup>
    defineProps(['title', 'to'])
</script>

<template>
  <li class="nav-item active">
    <a class="nav-link" :href="to">
      <span class="nav-link-icon d-md-none d-lg-inline-block"
        ><!-- Download SVG icon from http://tabler-icons.io/i/home -->
        <slot name="icon"></slot>
      </span>
      <span class="nav-link-title"> {{title}} </span>
    </a>
  </li>
</template>
