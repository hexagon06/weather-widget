import { Ref, computed } from 'vue';
import { useForecastApi } from './forecast-api';

export function useForecastSelection(location: Ref<string | null>) {
  const { isLoading, response, failure } = useForecastApi(location);

  const forecast = computed(() => response.value?.timelines);
  const locationName = computed(() => response.value?.location.name);

  return { isLoading, failure, forecast, locationName };
}
