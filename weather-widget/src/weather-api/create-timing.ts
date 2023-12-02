import moment from 'moment';
import { RequestTiming } from './request-types';

export function createTiming(): RequestTiming {
  // configure the time frame up to 6 hours back and 15 days out
  const now = moment.utc();
  const startTime = moment.utc(now).add(0, 'minutes').toISOString();
  const endTime = moment.utc(now).add(1, 'days').toISOString();
  return { startTime, endTime };
}
