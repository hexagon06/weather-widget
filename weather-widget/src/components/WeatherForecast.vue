<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DayForecast from './forecast/DayForecast.vue';
import HourForecast from './forecast/HourForecast.vue';
import LocationPicker from './parts/LocationPicker.vue';
import LoadingIndicator from './parts/LoadingIndicator.vue';
import DaySelection from './parts/DaySelection.vue';
import { useForecastSelection } from '../composables/forecast-selection';
import { useDaySelection } from '../composables/day-selection';
import { useHourlyForecasts } from '../composables/hourly-forecasts';

const locations = [
  'Amsterdam',
  'Groningen',
  'New York',
  'Salvador',
  'Mumbai',
  'Hong Kong',
];

const location = ref<string | null>(null);
onMounted(() => (location.value = locations[1]));

const { isLoading, failure, forecast, locationName } =
  useForecastSelection(location);

const { selectedDayTime, selectedDay, selectableDays } =
  useDaySelection(forecast);

const { hourValues } = useHourlyForecasts(forecast, selectedDayTime);
</script>

<template>
  <div class="bg-slate-300 bg-opacity-25 rounded-xl p-4">
    <LocationPicker v-model="location" :locations="locations" />
    <div class="flex flex-col justify-center bg-stone-500 bg-opacity-50 p-1">
      <div v-if="isLoading" class="flex justify-center">
        <LoadingIndicator />
      </div>
      <p v-else-if="failure">Oh noes! something went wrong</p>
      <template v-else>
        <h1 class="text-left text-2xl font-bold mt-2 mb-3 ml-1">
          {{ locationName }}
        </h1>
        <div
          v-if="forecast"
          class="mt-3 flex justify-stretch gap-3 bg-stone-600 min-h-[360px] py-2"
        >
          <div class="flex flex-col gap-2 w-52 pl-2">
            <DayForecast
              v-if="selectedDay"
              :time="selectedDay.time"
              :day="selectedDay.values"
            />
          </div>
          <div class="flex-grow flex flex-col gap-2">
            <HourForecast
              v-for="(prediction, i) in hourValues"
              :key="`prediction_${i}`"
              :time="prediction.time"
              :prediction="prediction.values"
              class="bg-opacity-25"
              :class="i % 2 === 0 ? ['bg-stone-700'] : ['bg-slate-700']"
            />
          </div>
        </div>
        <DaySelection
          v-model="selectedDayTime"
          :days="selectableDays"
          class="mx-3"
        />
      </template>
    </div>
  </div>
</template>
