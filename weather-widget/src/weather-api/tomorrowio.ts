// used https://transform.tools/json-to-typescript to generate the initial types
// Did not rename this file to a .d.ts because it is very convenient to have the fieldnames next to the field definition.

export interface WeatherResponse {
  data: WeatherData;
  warnings: Warning[];
}

export interface WeatherData {
  timelines: Timeline[];
}

export interface Timeline {
  timestep: string;
  startTime: string;
  endTime: string;
  intervals: Interval[];
}

export interface Interval {
  startTime: string;
  values: WeatherValues;
}
// list the fields
export const fieldNames = [
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

type FieldNames =
  | 'precipitationIntensity'
  | 'precipitationType'
  | 'windSpeed'
  | 'windGust'
  | 'windDirection'
  | 'temperature'
  | 'temperatureApparent'
  | 'cloudCover'
  | 'cloudBase'
  | 'cloudCeiling'
  | 'weatherCode';

export type WeatherValues = Partial<{ [key in FieldNames]: number }>;

export interface Warning {
  code: number;
  type: string;
  message: string;
  meta: Meta;
}

export interface Meta {
  timestep: string;
  from: string;
  to: string;
}
