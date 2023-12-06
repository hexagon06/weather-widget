<script setup lang="ts">
import { toRef } from 'vue';
import { HourlyValues } from '../../weather-api/tomorrowio-forecast';
import PredicitonTime from '../parts/PredicitonTime.vue';
import WeatherVisual from '../parts/WeatherVisual.vue';
import WindVisual from '../parts/WindVisual.vue';
import { useDayNight } from '../../composables/day-night';
import ForecastTemperature from '../parts/ForecastTemperature.vue';

const props = defineProps<{ prediction: HourlyValues; time: string }>();
const time = toRef(props, 'time');

const { isSunUp } = useDayNight(time);
</script>

<template>
  <div
    class="grid grid-cols-[1fr_2fr_1fr_.7fr] grid-flow-row gap-x-4 gap-y-2 items-center"
  >
    <PredicitonTime :time="time" class="text-lg" />
    <WeatherVisual :code="prediction.weatherCode" :sun-is-up="isSunUp" />
    <ForecastTemperature
      :temperature="prediction.temperature"
      :temperature-apparent="prediction.temperatureApparent"
    />
    <WindVisual
      :direction="prediction.windDirection"
      :speed="prediction.windSpeed"
    />
  </div>
</template>
