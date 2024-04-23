'use client';

import { NAVIGATION } from '@entities/navigation';
import { AppShellNavbar, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './styles.module.css';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <AppShellNavbar py="md" px={4} withBorder={false}>
      {NAVIGATION.map((item) => (
        <UnstyledButton
          key={item.id}
          component={Link}
          data-active={item.path === pathname || undefined}
          className={styles.control}
          href={item.path}
        >
          {item.label}
        </UnstyledButton>
      ))}
    </AppShellNavbar>
  );
};
