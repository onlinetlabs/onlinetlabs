'use server'

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
}

export async function refresh(refreshToken: string) {
  const response = await fetch(`${process.env.API_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
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