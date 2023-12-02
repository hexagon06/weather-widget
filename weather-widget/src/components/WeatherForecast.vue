<script setup lang="ts">
import { ref } from 'vue';
import { getForecast } from '../weather-api/tomorrowio';
import {
  ForecastLocation,
  Timelines,
} from '../weather-api/tomorrowio-forecast';
import ForecastPrediction from './ForecastPrediction.vue';
const failure = ref(false);
const forecast = ref<Timelines | null>(null);
const location = ref<ForecastLocation>();

async function refreshData() {
  try {
    const result = await getForecast({ lat: 53.2194, long: 6.5665 });
    forecast.value = result.timelines;
    location.value = result.location;
  } catch (e) {
    failure.value = true;
  }
}
</script>

<template>
  <div>
    <button @click="refreshData">Fetch!</button>
    <p v-if="failure">Oh noes! something went wrong</p>
    <div v-if="forecast">
      <div>
        <h2>Hourly</h2>
        <div class="flex gap-3">
          <ForecastPrediction
            v-for="(prediction, i) in forecast.hourly.splice(0, 12)"
            :key="`prediction_${i}`"
            :time="prediction.time"
            :prediction="prediction.values"
          ></ForecastPrediction>
        </div>
      </div>
    </div>
  </div>
</template>
