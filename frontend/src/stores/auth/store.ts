import { createStore } from 'zustand/vanilla'

export type AuthState = {
  count: number
}

export type AuthActions = {
  decrementCount: () => void
  incrementCount: () => void
}

export type AuthStore = AuthState & AuthActions

export const initAuthStore = (): AuthState => {
  return { count: new Date().getFullYear() }
}

export const defaultInitState: AuthState = {
  count: 0,
}

export const createAuthStore = (
  initState: AuthState = defaultInitState,
) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }))
}
