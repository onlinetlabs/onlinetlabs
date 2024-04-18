'use client';
import { AppShell, Burger, Group, UnstyledButton } from "@mantine/core"
import { useUnit } from '@lib/state-engine';
import { headerModal } from "@widgets/header";
import styles from "./styles.module.css";
import { NAVIGATION } from "@entities/navigation";
import { Logo } from "@ui/logo";
import { UserMenu } from "@widgets/user-menu";

export const Header = () => {
  const {
    isBurgerOpened,
  } = useUnit({
    isBurgerOpened: headerModal.$isBurgerOpen,
  })

  return (
    <AppShell.Header className={styles.header}>
      <Group h="100%" px="md">
        <Burger opened={isBurgerOpened} onClick={() => headerModal.toggleBurger(!isBurgerOpened)} hiddenFrom="sm" size="sm" />
        <Group justify="space-between" style={{ flex: 1 }}>
          <Logo />
          <Group gap={0} visibleFrom="sm" mx='auto'>
            {NAVIGATION.map((item) => (
              <UnstyledButton key={item.id} className={styles.control}>
                {item.label}
              </UnstyledButton>
            ))}
          </Group>
          <UserMenu />
        </Group>
      </Group>
    </AppShell.Header>
  )
}