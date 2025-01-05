import { login, signup, type LoginDto, type SignUpDto } from '@api/auth'
import { createStore } from 'zustand/vanilla'

export type AuthState = {
  count: number;
  accessToken: string;
  refreshToken: string;
}

export type AuthActions = {
  decrementCount: () => void;
  incrementCount: () => void;
  login: (params: LoginDto) => Promise<void>;
  signup: (params: SignUpDto) => Promise<void>;
}

export type AuthStore = AuthState & AuthActions

export const initAuthStore = (): AuthState => {
  return defaultInitState;
  // return {
  //   count: new Date().getFullYear(),
  //   accessToken: '',
  //   refreshToken: '',
  // }
}

export const defaultInitState: AuthState = {
  count: 0,
  accessToken: '',
  refreshToken: '',
}

export const createAuthStore = (
  initState: AuthState = defaultInitState,
) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
    login: async (params: LoginDto) => {
      const { accessToken, refreshToken } = await login(params);
      set({ accessToken, refreshToken });
    },
    signup: async (params: SignUpDto) => {
      const { accessToken, refreshToken } = await signup(params);
      set({ accessToken, refreshToken });
    },
  }))
}
