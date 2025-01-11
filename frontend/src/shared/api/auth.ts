const PREFIX = "/api/auth"

export const login = async (
  body: LoginDto,
  basePath: string = ""
): Promise<AuthResponse> => {
  const response = await fetch(`${basePath}${PREFIX}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const data = (await response.json()) as AuthResponseRaw

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  }
}

export const signup = async (
  body: SignUpDto,
  basePath: string = ""
): Promise<AuthResponse> => {
  const response = await fetch(`${basePath}${PREFIX}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
      // TODO: remove this when backend is ready
      firstname: "",
      secondname: "",
    }),
  })

  const data = (await response.json()) as AuthResponseRaw

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  }
}

export const refresh = async (
  refreshToken: string,
  basePath: string = ""
): Promise<AuthResponse> => {
  const response = await fetch(`${basePath}${PREFIX}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  })

  const data = (await response.json()) as AuthResponseRaw

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  }
}

export type LoginDto = {
  email: string
  password: string
}

export type SignUpDto = {
  email: string
  firstname?: string
  secondname?: string
  password: string
}

type AuthResponseRaw = {
  access_token: string
  refresh_token: string
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
}
