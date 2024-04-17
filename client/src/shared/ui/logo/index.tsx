import { rem, useMantineTheme } from "@mantine/core";
import { IconCookie } from "@tabler/icons-react"

export const Logo = () => {
  const theme = useMantineTheme();

  return (
    <IconCookie
      style={{ width: rem(32), height: rem(32) }}
      stroke={2}
      color={theme.colors.blue[6]}
    />
  )
}