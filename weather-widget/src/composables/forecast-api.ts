import { Ref, ref, watch } from 'vue';
import { getForecast } from '../weather-api/tomorrowio';
import { ForecastResponse } from '../weather-api/tomorrowio-forecast';
import { AxiosError } from 'axios';

export function useForecastApi(location: Ref<string | null>) {
  const isLoading = ref(false);
  const response = ref<ForecastResponse>();
  const failure = ref<string | boolean>(false);

  watch(location, () => refreshData());
  async function refreshData() {
    try {
      if (location.value) {
        isLoading.value = true;
        response.value = await getForecast(location.value);

        failure.value = false;
      }
    } catch (e) {
      if ((e as AxiosError)?.code === 'ERR_BAD_REQUEST') {
        failure.value = 'bad';
      } else {
        failure.value = true;
      }
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, response, failure };
}
