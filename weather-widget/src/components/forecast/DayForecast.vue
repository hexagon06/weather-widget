<script setup lang="ts">
import { computed, toRef } from 'vue';
import { DailyValues } from '../../weather-api/tomorrowio-forecast';
import WeatherVisual from '../parts/WeatherVisual.vue';
import Sun from '../../assets/icons/Sun.svg';
import Moon from '../../assets/icons/Moon.svg';

const props = defineProps<{ day: DailyValues; time: string }>();
const time = toRef(props, 'time');
const day = toRef(props, 'day');
const date = computed(() => new Date(Date.parse(time.value)));
const longDay = computed(() =>
  date.value.toLocaleDateString(undefined, {
    weekday: 'long',
  }),
);
const shortDate = computed(() =>
  date.value.toLocaleDateString(undefined, {
    dateStyle: 'short',
  }),
);

function toYesNo(value: number | undefined) {
  if (value === undefined) return;
  if (value === 1) return 'Yes';
  return 'No';
}

const dayData = computed(() => [
  { label: 'humidity', value: day.value.humidityAvg },
  { label: 'pressure', value: day.value.pressureSurfaceLevelAvg },
  { label: 'Uv Health concern', value: toYesNo(day.value.uvHealthConcernAvg) },
]);
</script>

<template>
  <div class="flex flex-col">
    <h2 class="text-2xl">{{ longDay }}</h2>
    <p class="text-sm">{{ shortDate }}</p>
    <WeatherVisual
      :code="day.weatherCodeMin"
      :sun-is-up="true"
      class="flex-col"
      size="lg"
    />
    <div class="flex justify-center">
      <div class="grid grid-cols-[40px_1fr] items-center">
        <img :src="Sun" class="h-8 inline" />
        <span class="text-right text-2xl">{{ day.temperatureMax }}°C </span>
        <img :src="Moon" class="h-10 inline" />
        <span class="text-right text-xl">{{ day.temperatureMin }}°C </span>
      </div>
    </div>
    <p class="mt-2">Feels like</p>
    <div class="flex justify-center">
      <div class="grid grid-cols-[40px_1fr] items-center">
        <img :src="Sun" class="h-8 inline" />
        <span class="text-right text-md"
          >{{ day.temperatureApparentMax }}°C
        </span>
        <img :src="Moon" class="h-10 inline" />
        <span class="text-right text-lg"
          >{{ day.temperatureApparentMin }}°C
        </span>
      </div>
    </div>
    <div
      v-for="(data, i) in dayData"
      :key="`info_${i}`"
      class="flex justify-between"
    >
      <p class="capitalize">{{ data.label }}</p>
      <p>{{ data.value }}</p>
    </div>
  </div>
</template>
