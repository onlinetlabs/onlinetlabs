'use client';

import { NAVIGATION } from '@entities/navigation';
import { AppShellHeader, Burger, Group, UnstyledButton } from '@mantine/core';
import { headerModal } from '@widgets/header';
import { UserMenu } from '@widgets/user-menu';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@ui/logo';

import styles from './styles.module.css';

export const Header = () => {
  const pathname = usePathname();

  const { isBurgerOpened } = useUnit({
    isBurgerOpened: headerModal.$isBurgerOpen,
  });

  const toggleBurger = useUnit(headerModal.toggleBurger);

  return (
    <AppShellHeader className={styles.header}>
      <Group h="100%" px="md">
        <Burger
          opened={isBurgerOpened}
          onClick={() => toggleBurger(!isBurgerOpened)}
          hiddenFrom="sm"
          size="sm"
        />
        <Group justify="space-between" style={{ flex: 1 }}>
          <Link href="/" className={styles.logo}>
            <Logo />
          </Link>
          <Group gap={5} visibleFrom="sm" mx="auto">
            {NAVIGATION.map((item) => (
              <UnstyledButton
                component={Link}
                key={item.id}
                data-active={item.path === pathname || undefined}
                className={styles.link}
                href={item.path}
              >
                {item.label}
              </UnstyledButton>
            ))}
          </Group>
          <UserMenu />
        </Group>
      </Group>
    </AppShellHeader>
  );
};
