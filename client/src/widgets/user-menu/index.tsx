import {
  Button,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  rem,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { IconLogout, IconPalette, IconSettings, IconStar } from '@tabler/icons-react';
import Image from 'next/image';
import { ThemeSwitcher } from './ui/theme-switcher';

import styles from './styles.module.css';

const user = {
  name: 'Иван Иванов',
  email: 'Ivanov.II@example.com',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
};

export const UserMenu = () => {
  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center">
      <Menu
        width={250}
        position="bottom-end"
        transitionProps={{ transition: 'pop' }}
        closeOnItemClick={false}
        withinPortal
      >
        <MenuTarget>
          <Button variant="transparent" className={styles.target}>
            <Image src="/assets/avatar.png" width={42} height={42} alt={user.name} />
          </Button>
        </MenuTarget>
        <MenuDropdown>
          <MenuItem>
            <Group>
              <Image src="/assets/avatar.png" width={32} height={32} alt={user.name} />
              <Text>{user.name}</Text>
            </Group>
          </MenuItem>

          <MenuItem
            leftSection={
              <IconStar
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.yellow[6]}
              />
            }
          >
            Успеваемость
          </MenuItem>
          <MenuItem
            leftSection={<IconPalette style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            rightSection={<ThemeSwitcher />}
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            style={{ cursor: 'pointer' }}
          >
            Темная тема
          </MenuItem>
          <MenuItem
            leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          >
            Настройки
          </MenuItem>
          <MenuItem
            leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          >
            Выйти
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </Group>
  );
};
