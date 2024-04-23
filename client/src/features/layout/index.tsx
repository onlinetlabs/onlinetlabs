'use client';

import type { PropsWithChildren, ReactNode } from 'react';
import { AppShell, AppShellMain } from '@mantine/core';
import { headerModal } from '@widgets/header';
import { useUnit } from 'effector-react';

import styles from './styles.module.css';

export const Layout = ({ header, navbar, children, aside, footer }: PropsWithChildren<Props>) => {
  const { isBurgerOpened } = useUnit({
    isBurgerOpened: headerModal.$isBurgerOpen,
  });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !isBurgerOpened },
      }}
      padding="md"
    >
      {header}
      {navbar}
      <AppShellMain className={styles.main}>{children}</AppShellMain>
      {aside}
      {footer}
    </AppShell>
  );
};

type Props = Partial<{
  header: ReactNode;
  navbar: ReactNode;
  aside: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}>;
