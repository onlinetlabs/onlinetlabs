import clsx from 'clsx';

import styles from './styles.module.css';

const Label = ({
  children,
  color = 'default',
}: {
  children: React.ReactNode;
  animateRerendering?: boolean;
  color?: 'default' | 'pink' | 'blue' | 'violet' | 'cyan' | 'orange';
}) => {
  return <div className={clsx(styles.label, styles[color])}>{children}</div>;
};

export const Boundary = ({
  children,
  labels = ['children'],
  color = 'default',
}: {
  children: React.ReactNode;
  labels?: string[];
  color?: 'default' | 'pink' | 'blue' | 'violet' | 'cyan' | 'orange';
}) => {
  return (
    <div className={clsx(styles.boundary, styles[color])}>
      <div className={styles.blabel}>
        {labels.map((label) => {
          return (
            <Label key={label} color={color}>
              {label}
            </Label>
          );
        })}
      </div>

      {children}
    </div>
  );
};
