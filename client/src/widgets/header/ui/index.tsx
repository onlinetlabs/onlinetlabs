'use client';
import { useWindowScroll } from '@mantine/hooks';
import { clsx } from 'clsx';
import { useUnit } from 'effector-react';
import { $isBurgerOpen } from '../model';
import { LogoText } from './logo-text';
import { Menu } from './menu';
import { Nav } from './nav';
import { Profile } from './profile';

import styles from './styles.module.css';

export const Header = () => {
  const [scroll] = useWindowScroll();
  const { isBurgerOpened } = useUnit({
    isBurgerOpened: $isBurgerOpen,
  });

  return (
    <div className={styles.root}>
      <header
        className={clsx(styles.header, {
          [styles.shadow]: scroll.y > 0,
          [styles.square]: isBurgerOpened,
        })}
      >
        <div className={styles.container}>
          <div className={styles.left}>
            <Menu />
            <LogoText />
          </div>
          <div className={styles.right}>
            <Profile />
          </div>
        </div>
        <Nav />
      </header>
    </div>
  );
};
