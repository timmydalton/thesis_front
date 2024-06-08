<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <a-config-provider :theme="{hashed: false}">
    <div class="store-view">
      <RouterView />
    </div>
  </a-config-provider>
</template>
