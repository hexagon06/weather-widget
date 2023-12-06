<script setup lang="ts">
import { toRef } from 'vue';
import { DailyValues } from '../../weather-api/tomorrowio-forecast';
// import WeatherVisual from '../parts/WeatherVisual.vue';
// import WindVisual from '../parts/WindVisual.vue';
import PredictionDay from '../parts/PredictionDay.vue';
import WeatherVisual from '../parts/WeatherVisual.vue';
// import ForecastTemperature from '../parts/ForecastTemperature.vue';

const props = defineProps<{ day: DailyValues; time: string }>();
const time = toRef(props, 'time');
</script>

<template>
  <div class="grid grid-cols-2 items-center">
    <PredictionDay :time="time" class="text-lg" />
    <WeatherVisual :code="day.weatherCodeMin" :sun-is-up="true" hide-text />
    <!-- <WeatherVisual :code="prediction.weatherCode" :sun-is-up="isSunUp" /> -->
    <!-- <ForecastTemperature
      :temperature="prediction.temperature"
      :temperature-apparent="prediction.temperatureApparent"
    />
    <WindVisual
      :direction="prediction.windDirection"
      :speed="prediction.windSpeed"
    /> -->
  </div>
</template>
