'use client';
import { ActionIcon, Card, Group, rem, Text, useMantineTheme } from '@mantine/core';
import { IconBookmark, IconClockHour4 } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '../api';
import styles from './styles.module.css';

export const CourseCard = (item: Course) => {
  const theme = useMantineTheme();

  return (
    <Link href={`/courses/${item.id}`} className={styles.wrapper}>
      <Card withBorder radius={24} p={0} className={styles.card}>
        <div className={styles.cover}>
          <Image
            src="https://images.unsplash.com/photo-1548679847-1d4ff48016c7?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Course cover"
            fill
          />
        </div>

        <div className={styles.inner}>
          <Text component="span" c="dimmed" className={styles.subtitle} fw={500}>
            Тема
          </Text>
          <Text component="h2" className={styles.title} fw={500}>
            {item.title}
          </Text>

          <Text component="p" lineClamp={6} className={styles.description}>
            {item.body}
          </Text>

          <Group justify="space-between" className={styles.footer}>
            <Group gap={6}>
              <IconClockHour4
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.gray[6]}
              />
              <Text c="dimmed">15 минут чтения</Text>
            </Group>

            <ActionIcon variant="transparent">
              <IconBookmark
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </ActionIcon>
          </Group>
        </div>
      </Card>
    </Link>
  );
};
