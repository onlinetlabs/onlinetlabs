import type { PropsWithChildren, ReactNode } from 'react';

import styles from './styles.module.css';

export const Layout = ({ header, children, footer }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.layout}>
      {header}
      <div className={styles.container}>
        <div className={styles.content}>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
      {footer}
    </div>
  );
};

type Props = Partial<{
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}>;
