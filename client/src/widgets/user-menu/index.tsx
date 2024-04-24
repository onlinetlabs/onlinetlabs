import { useState } from 'react';
import {
  Avatar,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  rem,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconLogout, IconSettings, IconStar } from '@tabler/icons-react';
import { clsx } from 'clsx';

import styles from './styles.module.css';

const user = {
  name: 'Иван Иванов',
  email: 'Ivanov.II@example.com',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
};

export const UserMenu = () => {
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Group justify="center">
      <Menu
        withArrow
        width={250}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <MenuTarget>
          {/* <Avatar
            className={clsx(styles.user, { [styles.userActive]: userMenuOpened })}
            src={null}
            alt={user.name}
            radius="xl"
            size={40}
          >
            {user.name
              .split(' ')
              .map((part) => part[0])
              .join('')}
          </Avatar> */}
          <Avatar
            className={clsx(styles.user, { [styles.userActive]: userMenuOpened })}
            src={null}
            alt={user.name}
            radius="xl"
            size={40}
          />
        </MenuTarget>
        <MenuDropdown>
          <MenuItem>
            <Group>
              <Avatar radius="xl" src={null} />
              <Text>{user.name}</Text>
            </Group>
          </MenuItem>

          <Menu.Divider />

          <MenuItem
            leftSection={
              <IconStar
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.red[6]}
              />
            }
          >
            Мои курсы
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
            Мои лабы
          </MenuItem>

          <Menu.Divider />
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
