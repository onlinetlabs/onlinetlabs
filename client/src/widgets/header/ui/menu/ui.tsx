'use client';
import { Burger, Text } from '@mantine/core';
import { clsx } from 'clsx';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { $isBurgerOpen, toggleBurger } from '@widgets/header';

import { NAV_ITEMS } from './config';
import styles from './styles.module.css';

export const Menu = () => {
  const { isBurgerOpened } = useUnit({
    isBurgerOpened: $isBurgerOpen,
  });

  const toggleMenu = useUnit(toggleBurger);

  useEffect(() => {
    if (isBurgerOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }
  }, [isBurgerOpened]);

  return (
    <>
      <Burger
        opened={isBurgerOpened}
        onClick={() => toggleMenu(!isBurgerOpened)}
        size="md"
        hiddenFrom="sm"
      />
      <div
        className={clsx(styles.nav, {
          [styles.opened]: isBurgerOpened,
        })}
      >
        {NAV_ITEMS.map((item, idx) => (
          <Text key={idx} className={styles.item}>
            {item.label}
          </Text>
        ))}
      </div>
    </>
  );
};
