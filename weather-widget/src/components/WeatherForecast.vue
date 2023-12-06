<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getForecast } from '../weather-api/tomorrowio';
import { Daily, Timelines } from '../weather-api/tomorrowio-forecast';
import DayForecast from './forecast/DayForecast.vue';
import HourForecast from './forecast/HourForecast.vue';
import LocationPicker from './parts/LocationPicker.vue';
import LoadingIndicator from './parts/LoadingIndicator.vue';
import DaySelection from './parts/DaySelection.vue';

const failure = ref(false);
const forecast = ref<Timelines | undefined>();
const location = ref<string | null>(null);
watch(location, () => refreshData());
const locationName = ref<string>();
const isLoading = ref(false);

async function refreshData() {
  try {
    if (location.value) {
      isLoading.value = true;
      const result = await getForecast(location.value);
      forecast.value = result.timelines;
      if (selectedDayTime.value === '') {
        selectedDayTime.value = result.timelines.daily[0].time;
      }
      locationName.value = result.location.name;
      failure.value = false;
    }
  } catch (e) {
    failure.value = true;
  } finally {
    isLoading.value = false;
  }
}

function sortByDay(a: Daily, b: Daily) {
  return Date.parse(a.time) - Date.parse(b.time);
}
const days = computed(() => {
  return forecast.value?.daily.slice().sort(sortByDay).slice(0, 6) ?? [];
});
const selectableDays = computed(() => {
  return days.value.map((d) => ({
    time: d.time,
    code: d.values.weatherCodeMin,
  }));
});

const selectedDayTime = ref<string>('');
const selectedDay = computed(() => {
  const selected = days.value.find((d) => d.time === selectedDayTime.value);
  if (selected) return selected;
  const first = selectableDays.value[0];
  return days.value.find((d) => d.time === first.time);
});

const hourlyInterval = 3;
const upcomingHours = computed(() => {
  let start = 0,
    end = 6;
  if (selectedDayTime.value !== '') {
    const selectedTime = Date.parse(selectedDayTime.value);
    start =
      forecast.value?.hourly.findIndex(
        (h) => Date.parse(h.time) >= selectedTime,
      ) ?? 0;
    end = 6 + start;
  }

  return forecast.value?.hourly
    .filter((_, i) => i % hourlyInterval === 0)
    .slice(start, end);
});
</script>

<template>
  <div class="bg-slate-300 bg-opacity-25 rounded-xl p-4">
    <LocationPicker v-model="location" />
    <div class="flex flex-col justify-center bg-stone-500 bg-opacity-50 p-1">
      <div v-if="isLoading" class="flex justify-center">
        <LoadingIndicator />
      </div>
      <p v-else-if="failure">Oh noes! something went wrong</p>
      <template v-else>
        <h1 class="text-left text-2xl font-bold mt-2 mb-3">
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
              v-for="(prediction, i) in upcomingHours"
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
