<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useWeatherVisual } from '../../composables/weather-visual';

const props = defineProps<{ code: number; sunIsUp: boolean }>();
const { code, sunIsUp } = toRefs(props);

const { weatherVisual } = useWeatherVisual(code);
const icon = computed(() => {
  return sunIsUp.value ? weatherVisual.value.day : weatherVisual.value.night;
});
</script>

<template>
  <div class="flex gap-2 items-center">
    <img :src="icon ?? ''" :alt="weatherVisual.alt" class="h-16" />
    <p class="whitespace-nowrap overflow-ellipsis" :title="weatherVisual.text">
      {{ weatherVisual.text }}
    </p>
  </div>
</template>
