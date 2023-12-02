import { WeatherValues } from './tomorrowio-timeline';

export type RequestTiming = { startTime: string; endTime: string };

// list the fields
export const fieldNames: (keyof WeatherValues)[] = [
  'precipitationIntensity',
  'precipitationType',
  'windSpeed',
  'windGust',
  'windDirection',
  'temperature',
  'temperatureApparent',
  'cloudCover',
  'cloudBase',
  'cloudCeiling',
  'weatherCode',
];

export type RequestLocation = string;
// | {
//     lat: number;
//     long: number;
//   };
