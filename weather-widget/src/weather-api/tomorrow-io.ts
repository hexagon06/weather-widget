import moment from 'moment';
import axios from 'axios';
import { WeatherResponse, fieldNames } from './tomorrowio';
import querystring from 'query-string';
import { tomorrowioConfig } from './tomorrowio-config';

// specify the timezone, using standard IANA timezone format
const timezone = 'Europe/Amsterdam';

const paramsSerializer = (params: Record<string, unknown>) =>
  querystring.stringify(params, { arrayFormat: 'comma' });

function getTiming() {
  // configure the time frame up to 6 hours back and 15 days out
  const now = moment.utc();
  const startTime = moment.utc(now).add(0, 'minutes').toISOString();
  const endTime = moment.utc(now).add(1, 'days').toISOString();
  return { startTime, endTime };
}

export function getForecast(lat: number, long: number, timesteps: string[]) {
  const location = [lat, long];
  const { apikey, units } = tomorrowioConfig;
  const params = {
    apikey,
    units,
    location,
    fields: fieldNames,
    timesteps,
    ...getTiming(),
    timezone,
  };

  return axios.get<WeatherResponse>(tomorrowioConfig.getTimelineURL, {
    params,
    paramsSerializer,
  });
}
