<script setup lang="ts">
import { ref, watch } from 'vue';
import { getForecast } from '../weather-api/tomorrowio';
import { Timelines } from '../weather-api/tomorrowio-forecast';
import ForecastPrediction from './ForecastPrediction.vue';
import LocationPicker from './LocationPicker.vue';

const failure = ref(false);
const forecast = ref<Timelines | null>(null);
const location = ref<string | null>(null);
watch(location, () => refreshData());

async function refreshData() {
  try {
    if (location.value) {
      const result = await getForecast(location.value);
      forecast.value = result.timelines;
    }
  } catch (e) {
    failure.value = true;
  }
}
</script>

<template>
  <div>
    <button @click="refreshData">Fetch!</button>
    <LocationPicker v-model="location" />
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
