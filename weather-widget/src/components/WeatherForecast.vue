<script setup lang="ts">
import { ref } from 'vue';
import { getForecast } from '../weather-api/tomorrow-io';

// set the timesteps, like "current", "1h" and "1d"
const timesteps = ['current', '1h', '1d'];
const failure = ref(false);
async function fetchWeather() {
  try {
    await getForecast(40.758, -73.9855, timesteps);
  } catch (e) {
    failure.value = true;
  }
}
</script>

<template>
  <div>
    <button @click="fetchWeather">Fetch!</button>
    <p v-if="failure">Oh noes! something went wrong</p>
  </div>
</template>
