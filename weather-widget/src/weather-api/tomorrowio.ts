import axios, { AxiosResponse } from 'axios';
import { WeatherResponse, WeatherValues } from './tomorrowio-timeline';
import { tomorrowioConfig } from './tomorrowio-config';
import { paramsSerializer } from './params-serializer';
import { RequestTiming, RequestLocation } from './request-types';
import { ForecastResponse } from './tomorrowio-forecast';

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

// These functions should expose the tomorrow.io api
// It should not contain any business logic, only the composition of the requests
// It should make it clear for the rest of the application what values need to be provided

/**
 * Request the forecast for a location
 *
 * @param location Location for which we want the forcast in latitude and longitude
 * @param timesteps Timesteps of the timelines: "best", "1m", "5m", "15m", "30m", "1h", "1d" or "current"
 * @param timing The start and endtime of the forecast
 * @param fields The data fields for each point in time
 * @param timezone The timezone parameter displays the response datetime in the requested timezone.
 * @returns A weather response
 */
export async function getTimeline(
  location: RequestLocation,
  timesteps: string[],
  timing: RequestTiming,
  fields: (keyof WeatherValues)[],
  timezone: string,
) {
  const { apikey, units } = tomorrowioConfig;
  const params = {
    apikey,
    units,
    location,
    fields,
    timesteps,
    ...timing,
    timezone,
  };

  const response = await axios.get<
    WeatherResponse,
    AxiosResponse<WeatherResponse>
  >(`${corsAnywhere}${tomorrowioConfig.getTimelineURL}`, {
    params,
    paramsSerializer,
  });

  return response.data;
}

export async function getForecast(location: RequestLocation) {
  const { apikey, units } = tomorrowioConfig;
  const params = {
    apikey,
    units,
    location,
  };

  const response = await axios.get<
    ForecastResponse,
    AxiosResponse<ForecastResponse>
  >(`${corsAnywhere}${tomorrowioConfig.getForecastURL}`, {
    params,
    paramsSerializer,
  });

  return response.data;
}
