<script setup lang="ts">
import { computed, toRef } from 'vue';
import { Values } from '../../weather-api/tomorrowio-forecast';
import PredicitonTime from './PredicitonTime.vue';
import WeatherVisual from './WeatherVisual.vue';
import WindVisual from './WindVisual.vue';

const props = defineProps<{ prediction: Values; time: string }>();
const time = toRef(props, 'time');

const date = computed(() => new Date(Date.parse(time.value)));
const sunUp = 6;
const sunDown = 19;
const isSunUp = computed(() => {
  const hours = date.value.getHours();
  return hours > sunUp && hours < sunDown;
});
</script>

<template>
  <h3><PredicitonTime :time="time" /></h3>
  <WeatherVisual :code="prediction.weatherCode" :sun-is-up="isSunUp" />
  <div>
    <b class="text-xl">{{ prediction.temperature }}°C</b>
    <sub class="ml-1">{{ prediction.temperatureApparent }}°C</sub>
  </div>
  <WindVisual
    :direction="prediction.windDirection"
    :speed="prediction.windSpeed"
  />
  <!-- <div>
    <template v-for="key in Object.keys(prediction)">
      <div v-if="prediction[key as keyof Values] !== 0" :key="key">
        <b>{{ key }}:</b> {{ prediction[key as keyof Values] }}
      </div>
    </template>
  </div> -->
</template>
