'use server';

import { api } from '@lib/api';
import { generateQueryParams } from '@lib/utils';

export async function signup(params: SignUpParams) {
  const response = await api.post('/api/auth/signup', {
    email: params.email,
    password: params.password,
    // TODO: remove this when backend is ready
    firstname: '',
    secondname: '',
  });

  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
  };
}

export async function signin(params: SignInParams) {
  try {
    const response = await api.post('/api/auth/login', {
      email: params.email,
      password: params.password,
    });

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Login failed:', error?.response?.data || error.message);
    return { error: { message: 'Failed to login', error } };
  }
}

export async function refresh({ refreshToken }: RefreshParams) {
  const query = generateQueryParams({ refresh_token: refreshToken });

  try {
    const response = await api.post(`/api/auth/refresh?${query}`, {
      refresh_token: refreshToken,
    });

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Token refresh failed:', error?.response?.data || error.message);
    throw error?.response?.data || error;
  }
}

export type SignUpParams = {
  email: string
  firstname?: string
  secondname?: string
  password: string
}

export type SignInParams = {
  email: string
  password: string
}

export type RefreshParams = {
  refreshToken: string
}