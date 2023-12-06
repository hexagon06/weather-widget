<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getForecast } from '../weather-api/tomorrowio';
import { Timelines } from '../weather-api/tomorrowio-forecast';
import HourForecast from './forecast/HourForecast.vue';
import LocationPicker from './parts/LocationPicker.vue';
import LoadingIndicator from './parts/LoadingIndicator.vue';

const failure = ref(false);
const forecast = ref<Timelines | undefined>();
const location = ref<string | null>(null);
watch(location, () => refreshData());
const locationName = ref<string>();
const isLoading = ref(false);

async function refreshData() {
  try {
    if (location.value) {
      isLoading.value = true;
      const result = await getForecast(location.value);
      // temp; this error shows up because of the temp data
      forecast.value = result.timelines;
      locationName.value = result.location.name;
      failure.value = false;
    }
  } catch (e) {
    failure.value = true;
  } finally {
    isLoading.value = false;
  }
}

const hourlyInterval = 3;
const upcomingHours = computed(
  () =>
    forecast.value?.hourly
      .filter((_, i) => i % hourlyInterval === 0)
      .slice(0, 6),
);
</script>

<template>
  <div class="max-w-[720px] bg-slate-300 bg-opacity-25 rounded-xl p-4">
    <LocationPicker v-model="location" />
    <div class="flex flex-col justify-center bg-stone-500 bg-opacity-50 p-1">
      <div v-if="isLoading" class="flex justify-center">
        <LoadingIndicator />
      </div>
      <p v-else-if="failure">Oh noes! something went wrong</p>
      <template v-else>
        <h1 class="text-2xl font-bold mt-2">{{ locationName }}</h1>
        <div v-if="forecast" class="mt-3 flex flex-col gap-2">
          <HourForecast
            v-for="(prediction, i) in upcomingHours"
            :key="`prediction_${i}`"
            :time="prediction.time"
            :prediction="prediction.values"
            class="bg-opacity-25"
            :class="i % 2 === 0 ? ['bg-stone-700'] : ['bg-slate-700']"
          />

          <!-- <div v-if="forecastDays">
        <div v-for="(day, i) in forecastDays" :key="`day_${i}`">
          <p>{{ day.time }}</p>
          <div
            v-for="(val, j) in Object.keys(day.values)"
            :key="`day_${i}_v${j}`"
          >
            {{ val }}: {{ day.values[val as keyof DailyValues] }}
          </div>
        </div>
      </div> -->
        </div>
      </template>
    </div>
  </div>
</template>
