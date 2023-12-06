<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import PredictionDay from './PredictionDay.vue';
import WeatherVisual from './WeatherVisual.vue';

type MiniDay = { time: string; code: number };

const props = defineProps<{ days: MiniDay[]; modelValue: string }>();
const emit = defineEmits(['update:modelValue']);
const selectedTime = useVModel(props, 'modelValue', emit);

function isSelected(day: MiniDay): boolean {
  return selectedTime.value === day.time;
}
</script>

<template>
  <div class="flex gap-2">
    <div
      v-for="(day, i) in days"
      :key="`day_${i}`"
      class="flex-grow flex flex-col gap-1 items-center transition-all p-2"
      :role="isSelected(day) ? '' : 'button'"
      :class="isSelected(day) ? ['bg-stone-600'] : ['hover:bg-stone-500']"
      @click="selectedTime = day.time"
    >
      <WeatherVisual :code="day.code" :sun-is-up="true" hide-text />
      <PredictionDay :time="day.time" class="text-lg" />
    </div>
  </div>
</template>
