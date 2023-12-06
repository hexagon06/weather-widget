import { ComputedRef, computed, ref, watch } from 'vue';
import { Daily, Timelines } from '../weather-api/tomorrowio-forecast';

function sortByDay(a: Daily, b: Daily) {
  return Date.parse(a.time) - Date.parse(b.time);
}

export function useDaySelection(forecast: ComputedRef<Timelines | undefined>) {
  const selectedDayTime = ref<string>('');

  watch(forecast, (newValue) => {
    selectedDayTime.value = newValue?.daily[0].time ?? '';
  });
  const days = computed(() => {
    return forecast.value?.daily.slice().sort(sortByDay).slice(0, 6) ?? [];
  });
  const selectableDays = computed(() => {
    return days.value.map((d) => ({
      time: d.time,
      code: d.values.weatherCodeMin,
    }));
  });

  const selectedDay = computed(() => {
    const selected = days.value.find((d) => d.time === selectedDayTime.value);
    if (selected) return selected;
    const first = selectableDays.value[0];
    return days.value.find((d) => d.time === first.time);
  });

  return { selectedDayTime, selectedDay, selectableDays };
}
