import { Group, rem, Switch, useComputedColorScheme, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

export const ThemeSwitcher = () => {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const theme = useMantineTheme();

  const checked = computedColorScheme === 'dark';

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Group justify="center">
      <Switch
        aria-label="Включить темную тему"
        checked={checked}
        size="md"
        onClick={undefined}
        color="dark.7"
        onLabel={sunIcon}
        offLabel={moonIcon}
        style={{ pointerEvents: 'none' }}
      />
    </Group>
  );
};
