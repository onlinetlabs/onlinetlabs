'use client';

import { NAVIGATION } from '@entities/navigation';
import { Burger, Group, Text } from '@mantine/core';
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
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link href="/">
              <Group className={styles.logo} gap="xs" justify="center" wrap="nowrap">
                <Logo />
                <Text component="span" className={styles.onlinetlabs}>
                  onlinetlabs
                </Text>
              </Group>
            </Link>
          </div>
          <div className={styles.right}>
            <Group visibleFrom="xs">
              <UserMenu />
            </Group>
            <Burger
              opened={isBurgerOpened}
              onClick={() => toggleBurger(!isBurgerOpened)}
              size="sm"
              hiddenFrom="xs"
            />
          </div>
        </div>

        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.overflow}>
              <div className={styles.wrapper}>
                <nav>
                  <ul className={styles.navigation}>
                    {NAVIGATION.map((item, idx) => (
                      <Link key={idx} href={item.href} className={styles.link}>
                        <li
                          className={styles.item}
                          data-active={item.href === pathname || undefined}
                        >
                          {item.label}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
