<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useWeatherVisual } from './weather-icon';

const props = defineProps<{ code: number; sunIsUp: boolean }>();
const { code, sunIsUp } = toRefs(props);

const { weatherVisual } = useWeatherVisual(code);
const icon = computed(() => {
  return sunIsUp.value ? weatherVisual.value.day : weatherVisual.value.night;
});
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <img :src="icon ?? ''" :alt="weatherVisual.alt" />
    <p>{{ weatherVisual.text }}</p>
  </div>
</template>
