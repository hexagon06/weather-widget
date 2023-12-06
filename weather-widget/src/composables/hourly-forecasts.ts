import { ComputedRef, Ref, computed } from 'vue';
import { Timelines } from '../weather-api/tomorrowio-forecast';

export function useHourlyForecasts(
  forecast: ComputedRef<Timelines | undefined>,
  selectedDayTime: Ref<string>,
) {
  const hourlyInterval = 3;
  const hourValues = computed(() => {
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

  return { hourValues };
}
