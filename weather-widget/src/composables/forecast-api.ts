import { Ref, ref, watch } from 'vue';
import { getForecast } from '../weather-api/tomorrowio';
import { ForecastResponse } from '../weather-api/tomorrowio-forecast';

export function useForecastApi(location: Ref<string | null>) {
  const isLoading = ref(false);
  // const forecast = ref<Timelines | undefined>();
  const response = ref<ForecastResponse>();
  const failure = ref(false);

  watch(location, () => refreshData());
  async function refreshData() {
    try {
      if (location.value) {
        isLoading.value = true;
        response.value = await getForecast(location.value);

        failure.value = false;
      }
    } catch (e) {
      failure.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, response, failure };
}
