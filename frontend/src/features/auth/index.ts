'use server'

import { generateQueryParams } from "@lib/utils"

export async function signup(params: SignUpParams) {
  const response = await fetch(`${process.env.API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      password: params.password,
      // TODO: remove this when backend is ready
      firstname: "",
      secondname: "",
    }),
  })

  const data = (await response.json()) as {
    access_token: string
    refresh_token: string
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
}

export async function signin(params: SignInParams) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: params.email,
        password: params.password,
      }),
    })

    const data = (await response.json()) as {
      access_token: string
      refresh_token: string
    }
    
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    console.log(`error`, error)
    return { error: { message: 'Failed to login', error } }
  }
}

export async function refresh({ refreshToken }: RefreshParams) {
  const queryParams = generateQueryParams({ refresh_token :refreshToken })

  const response = await fetch(`${process.env.API_URL}/api/auth/refresh?${queryParams}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  })

  const tokensOrError = (await response.json()) as {
    access_token: string
    refresh_token: string
  };

  if (!response.ok) {
    throw tokensOrError;
  }

  return {
    accessToken: tokensOrError.access_token,
    refreshToken: tokensOrError.refresh_token,
  };
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