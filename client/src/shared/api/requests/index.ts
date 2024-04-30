import { createRequestFx } from './create-request-fx';

export const requestFx = createRequestFx({
  baseURL: '/api',
  withTokenInHeaders: true,
});

export const commonRequestFx = createRequestFx({
  baseURL: process.env.EXTERNAL_API_URL,
  headers: {
    'X-API-KEY': process.env.API_TOKEN ?? '',
  },
});
