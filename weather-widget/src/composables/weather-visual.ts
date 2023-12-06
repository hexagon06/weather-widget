import { Ref, computed } from 'vue';

import { weatherCode } from '../weather-api/weather-codes';
import { useWeatherIcon } from './weather-icon';

export function useWeatherVisual(code: Ref<number>) {
  const { icon } = useWeatherIcon(code);
  const text = computed(() => {
    const codeKey = `${code.value}` as keyof typeof weatherCode;
    return weatherCode[codeKey];
  });
  const weatherVisual = computed(() => {
    if (icon.value) {
      return {
        ...icon.value,
        text: text.value,
      };
    } else {
      return {
        alt: 'unknown',
        text: text.value,
        day: null,
        night: null,
      };
    }
  });

  return {
    weatherVisual,
  };
}
