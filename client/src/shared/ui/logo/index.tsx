import { rem, useMantineTheme } from "@mantine/core";
import { IconCookie } from "@tabler/icons-react"

export const Logo = () => {
  const theme = useMantineTheme();

  return (
    <IconCookie
      style={{ width: rem(40), height: rem(40) }}
      stroke={2}
      color={theme.colors.blue[6]}
    />
  )
}