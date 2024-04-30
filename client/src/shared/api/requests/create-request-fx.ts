import { createEffect } from 'effector';
import { ofetch, type FetchOptions } from 'ofetch';

type RequestParams = FetchOptions & {
  url: string;
};

type Fn<P> = (params: P) => RequestParams;

type Payload<P> = RequestParams | Fn<P>;

type RequestInstanceParams<P> = RequestParams & {
  withTokenInHeaders?: boolean;
  payload: Payload<P>;
};

type CreateRequestFxParams = Omit<RequestInstanceParams<RequestParams>, 'payload' | 'url'>;

function getConfig<P>(payload: Payload<P>, params: P): RequestParams {
  return typeof payload === 'function' ? payload(params) : payload;
}

const createRequestInstance = <P = RequestParams, R = void>({
  baseURL,
  headers,
  payload,
  withTokenInHeaders,
}: RequestInstanceParams<P>) =>
  createEffect<P, R>((params) => {
    const { url, ...fetchOptions } = getConfig(payload, params);

    const newHeaders = new Headers(headers);

    if (withTokenInHeaders) {
      newHeaders.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    }

    return ofetch(url, {
      ...fetchOptions,
      headers: newHeaders,
      baseURL,
    });
  });

export const createRequestFx =
  (params: CreateRequestFxParams) =>
  <P = RequestParams, R = void>(payload: Payload<P>) =>
    createRequestInstance<P, R>({
      ...(params as RequestParams),
      payload,
    });
