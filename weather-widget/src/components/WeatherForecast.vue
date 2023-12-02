<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getForecast } from '../weather-api/tomorrowio';
import { Timelines } from '../weather-api/tomorrowio-forecast';
import ForecastPrediction from './forecast/ForecastPrediction.vue';
import LocationPicker from './LocationPicker.vue';

const failure = ref(false);
const forecast = ref<Timelines | undefined>();
const location = ref<string | null>(null);
watch(location, () => refreshData());
const locationName = ref<string>();

async function refreshData() {
  try {
    if (location.value) {
      const result = await getForecast(location.value);
      // temp; this error shows up because of the temp data
      forecast.value = result.timelines;
      locationName.value = result.location.name;
    }
  } catch (e) {
    failure.value = true;
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
  <div>
    <LocationPicker v-model="location" />
    <p class="text-2xl font-bold">{{ locationName }}</p>
    <p v-if="failure">Oh noes! something went wrong</p>
    <div v-if="forecast" class="mt-3 flex">
      <div
        class="grid grid-rows-[1fr_150px_1fr_1fr] grid-flow-col gap-x-4 gap-y-2"
      >
        <ForecastPrediction
          v-for="(prediction, i) in upcomingHours"
          :key="`prediction_${i}`"
          :time="prediction.time"
          :prediction="prediction.values"
        ></ForecastPrediction>
      </div>
    </div>
  </div>
</template>
