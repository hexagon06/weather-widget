<script setup lang="ts">
defineProps<{ temperature: number; temperatureApparent: number }>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <b class="text-xl" title="temperature">{{ temperature }}°C</b>
    <sub class="ml-1" title="Feels like"> {{ temperatureApparent }}°C </sub>
  </div>
</template>
