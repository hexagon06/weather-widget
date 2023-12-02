<script setup lang="ts">
import { ref } from 'vue';
import { getForecast } from '../weather-api/tomorrow-io';
import { createTiming } from '../weather-api/create-timing';
import { fieldNames } from '../weather-api/request-types';
import { Timeline } from '../weather-api/response-types';
// set the timesteps, like "current", "1h" and "1d"
const timesteps = ['current', '1h', '1d'];
// specify the timezone, using standard IANA timezone format
const timezone = 'Europe/Amsterdam';
const failure = ref(false);
const forecast = ref<Timeline[]>([]);

async function fetchWeather() {
  try {
    const timing = createTiming();
    const result = await getForecast(
      { lat: 40.758, long: -73.9855 },
      timesteps,
      timing,
      fieldNames,
      timezone,
    );
    forecast.value = result.data.timelines;
  } catch (e) {
    failure.value = true;
  }
}
</script>

<template>
  <div>
    <button @click="fetchWeather">Fetch!</button>
    <p v-if="failure">Oh noes! something went wrong</p>
    <div v-if="forecast.length > 0">
      <div v-for="(timeline, i) in forecast" :key="`timeline_${i}`">
        <h3>{{ timeline.startTime }} - {{ timeline.endTime }}</h3>
        <div
          v-for="(interval, j) in timeline.intervals"
          :key="`${i}_interval_${j}`"
        >
          <b>{{ interval.startTime }}</b>
          <div
            v-for="(value, k) in interval.values"
            :key="`${i}_${j}_value_${k}`"
          >
            <span
              ><i>{{ k }}:</i> {{ value }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
