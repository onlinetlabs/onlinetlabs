import type { PropsWithChildren, ReactNode } from 'react';
import { headerModal } from "@widgets/header";
import { AppShell } from '@mantine/core';
import { useUnit } from '@lib/state-engine';

export const Layout = ({ header, navbar, children, aside, footer }: PropsWithChildren<Props>) => {
  const {
    isBurgerOpened,
  } = useUnit({
    isBurgerOpened: headerModal.$isBurgerOpen,
  })

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !isBurgerOpened } }}
      padding="md"
    >
      {header}
      {navbar}
      <AppShell.Main>{children}</AppShell.Main>
      {aside}
      {footer}
    </AppShell>
  );
}

type Props = Partial<{
  header: ReactNode;
  navbar: ReactNode;
  aside: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}>

