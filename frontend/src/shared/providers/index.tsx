import { AuthProvider } from "./auth-provider"
import { QueryProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"

type ProvidersProps = {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
