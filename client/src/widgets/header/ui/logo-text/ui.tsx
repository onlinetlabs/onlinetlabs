import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { Logo } from '@ui/logo';
import styles from './styles.module.css';

export const LogoText = () => {
  return (
    <Link href="/">
      <Group className={styles.logo} gap="xs" justify="center" wrap="nowrap">
        <Logo />
        <Text component="span" className={styles.onlinetlabs}>
          onlinetlabs
        </Text>
      </Group>
    </Link>
  );
};
