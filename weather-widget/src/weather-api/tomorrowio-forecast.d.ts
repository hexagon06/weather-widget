export interface ForecastResponse {
  timelines: Timelines;
  location: ForecastLocation;
}

export interface Timelines {
  hourly: Hourly[];
  minutely: Minutely[];
  daily: Daily[];
}

export interface Hourly {
  time: string;
  values: Values;
}

export interface Values {
  cloudBase?: number;
  cloudCeiling?: number;
  cloudCover: number;
  dewPoint: number;
  evapotranspiration: number;
  freezingRainIntensity: number;
  humidity: number;
  iceAccumulation?: number;
  iceAccumulationLwe?: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainAccumulation: number;
  rainAccumulationLwe?: number;
  rainIntensity: number;
  sleetAccumulation: number;
  sleetAccumulationLwe?: number;
  sleetIntensity: number;
  snowAccumulation?: number;
  snowAccumulationLwe?: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern?: number;
  uvIndex?: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}

export interface Minutely {
  time: string;
  values: Values2;
}

export interface Values2 {
  cloudBase: number;
  cloudCeiling: number;
  cloudCover: number;
  dewPoint: number;
  freezingRainIntensity: number;
  humidity: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainIntensity: number;
  sleetIntensity: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}

export interface Daily {
  time: string;
  values: Values3;
}

export interface Values3 {
  cloudBaseAvg: number;
  cloudBaseMax: number;
  cloudBaseMin: number;
  cloudCeilingAvg: number;
  cloudCeilingMax: number;
  cloudCeilingMin: number;
  cloudCoverAvg: number;
  cloudCoverMax: number;
  cloudCoverMin: number;
  dewPointAvg: number;
  dewPointMax: number;
  dewPointMin: number;
  evapotranspirationAvg: number;
  evapotranspirationMax: number;
  evapotranspirationMin: number;
  evapotranspirationSum: number;
  freezingRainIntensityAvg: number;
  freezingRainIntensityMax: number;
  freezingRainIntensityMin: number;
  humidityAvg: number;
  humidityMax: number;
  humidityMin: number;
  iceAccumulationAvg: number;
  iceAccumulationLweAvg: number;
  iceAccumulationLweMax: number;
  iceAccumulationLweMin: number;
  iceAccumulationMax: number;
  iceAccumulationMin: number;
  iceAccumulationSum: number;
  moonriseTime: string;
  moonsetTime: string;
  precipitationProbabilityAvg: number;
  precipitationProbabilityMax: number;
  precipitationProbabilityMin: number;
  pressureSurfaceLevelAvg: number;
  pressureSurfaceLevelMax: number;
  pressureSurfaceLevelMin: number;
  rainAccumulationAvg: number;
  rainAccumulationLweAvg: number;
  rainAccumulationLweMax: number;
  rainAccumulationLweMin: number;
  rainAccumulationMax: number;
  rainAccumulationMin: number;
  rainAccumulationSum: number;
  rainIntensityAvg: number;
  rainIntensityMax: number;
  rainIntensityMin: number;
  sleetAccumulationAvg: number;
  sleetAccumulationLweAvg: number;
  sleetAccumulationLweMax: number;
  sleetAccumulationLweMin: number;
  sleetAccumulationMax: number;
  sleetAccumulationMin: number;
  sleetIntensityAvg: number;
  sleetIntensityMax: number;
  sleetIntensityMin: number;
  snowAccumulationAvg: number;
  snowAccumulationLweAvg: number;
  snowAccumulationLweMax: number;
  snowAccumulationLweMin: number;
  snowAccumulationMax: number;
  snowAccumulationMin: number;
  snowAccumulationSum: number;
  snowIntensityAvg: number;
  snowIntensityMax: number;
  snowIntensityMin: number;
  sunriseTime: string;
  sunsetTime: string;
  temperatureApparentAvg: number;
  temperatureApparentMax: number;
  temperatureApparentMin: number;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
  uvHealthConcernAvg?: number;
  uvHealthConcernMax?: number;
  uvHealthConcernMin?: number;
  uvIndexAvg?: number;
  uvIndexMax?: number;
  uvIndexMin?: number;
  visibilityAvg: number;
  visibilityMax: number;
  visibilityMin: number;
  weatherCodeMax: number;
  weatherCodeMin: number;
  windDirectionAvg: number;
  windGustAvg: number;
  windGustMax: number;
  windGustMin: number;
  windSpeedAvg: number;
  windSpeedMax: number;
  windSpeedMin: number;
}

export interface ForecastLocation {
  lat: number;
  lon: number;
  name: string;
  type: string;
}
