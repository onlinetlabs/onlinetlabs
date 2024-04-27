'use client';

import { ActionIcon, Group, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';

import styles from './styles.module.css';

export const ThemeActionIcon = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        <IconSun className={cx(styles.icon, styles.light)} stroke={1.5} />
        <IconMoon className={cx(styles.icon, styles.dark)} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
};
