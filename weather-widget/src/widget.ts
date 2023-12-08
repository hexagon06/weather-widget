import { defineCustomElement } from 'vue';
import WeatherForecastSFC from './components/WeatherForecast.vue';

const WeatherForecast = defineCustomElement(WeatherForecastSFC);

// export individual elements
export { WeatherForecast };

export function register() {
  customElements.define('weather-forecast', WeatherForecast);
}

// register global typings
declare module 'vue' {
  export interface GlobalComponents {
    WeatherForecast: typeof WeatherForecast;
  }
}
