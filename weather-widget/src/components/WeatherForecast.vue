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

const upcomingHours = computed(() => forecast.value?.hourly.slice(0, 6));
</script>

<template>
  <div>
    <LocationPicker v-model="location" />
    <p class="text-2xl font-bold">{{ locationName }}</p>
    <p v-if="failure">Oh noes! something went wrong</p>
    <div v-if="forecast">
      <div class="mt-3">
        <!-- <div class="flex gap-2">
          <ForecastPrediction
            v-for="(prediction, i) in upcomingHours"
            :key="`prediction_${i}`"
            :time="prediction.time"
            :prediction="prediction.values"
          ></ForecastPrediction>
        </div> -->
        <div class="grid grid-cols-5 grid-flow-col">
          <ForecastPrediction
            v-for="(prediction, i) in upcomingHours"
            :key="`prediction_${i}`"
            :time="prediction.time"
            :prediction="prediction.values"
          ></ForecastPrediction>
        </div>
      </div>
    </div>
  </div>
</template>
