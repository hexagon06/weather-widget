<script setup lang="ts">
defineProps<{ temperature: number; temperatureApparent: number }>();
</script>

<template>
  <div class="mx-auto">
    <div class="flex flex-col items-end">
      <b class="text-xl" title="temperature">{{ temperature }}°C</b>
      <p class="text-xs mr-2" title="Feels like">{{ temperatureApparent }}°C</p>
    </div>
  </div>
</template>
