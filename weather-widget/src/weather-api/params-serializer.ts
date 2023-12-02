import querystring from 'query-string';

export const paramsSerializer = (params: Record<string, unknown>) =>
  querystring.stringify(params, { arrayFormat: 'comma' });
