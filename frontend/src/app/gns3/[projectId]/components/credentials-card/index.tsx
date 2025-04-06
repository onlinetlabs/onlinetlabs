import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { CredentialsInput } from "./credentials-input"

export function CredentialsCard() {
  return (
    <Card className="relative flex w-full flex-col md:w-9/12">
      <CardHeader>
        <CardTitle className="text-sm">
          Учетная запись GNS3
        </CardTitle>
        <CardDescription>
          Используйте этот логин и пароль для доступа к GNS3 серверу
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-x-4">
        <CredentialsInput
          label="Логин"
          defaultValue="admin"
        />
        <CredentialsInput
          label="Пароль"
          defaultValue="admin"
        />
      </CardContent>
    </Card>
  )
}