const PREFIX = '/api/auth';

export const login = async (body: LoginDto): Promise<AuthResponse> => {
  const response = await fetch(`${PREFIX}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = (await response.json()) as AuthResponseRaw;

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
}

export const signup = async (body: SignUpDto): Promise<AuthResponse> => {
  const response = await fetch(`${PREFIX}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
      // TODO: remove this when backend is ready
      firstname: '',
      secondname: '',
    }),
  })

  const data = (await response.json()) as AuthResponseRaw;

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
}

export type LoginDto = {
  email: string;
  password: string;
}

export type SignUpDto = {
  email: string;
  firstname?: string;
  secondname?: string;
  password: string;
}

type AuthResponseRaw = {
  access_token: string;
  refresh_token: string;
}

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
}