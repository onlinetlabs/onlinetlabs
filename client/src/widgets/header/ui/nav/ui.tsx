'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from './config';
import styles from './styles.module.css';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <div className={styles.inner}>
      <div className={styles.content}>
        <div className={styles.overflow}>
          <div className={styles.wrapper}>
            <nav>
              <ul className={styles.navigation}>
                {NAV_ITEMS.map((item, idx) => (
                  <Link key={idx} href={item.href} className={styles.link}>
                    <li className={styles.item} data-active={item.href === pathname || undefined}>
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
  );
};
