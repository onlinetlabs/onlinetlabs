'use client';

import { Button, rem, Select, Text, TextInput } from '@mantine/core';
import { IconBookmark, IconBookmarkFilled, IconSearch } from '@tabler/icons-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Dots } from '@ui/dots';

import styles from './styles.module.css';

export const Hero = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.background}>
            <Dots className={styles.dots} style={{ left: 140, top: 0 }} />
            <Dots className={styles.dots} style={{ left: 0, top: 140 }} />
            <Dots className={styles.dots} style={{ right: 0, top: 60 }} />
          </div>

          <div className={styles.controls}>
            <Text component="h1" fw={500} className={styles.title}>
              Курсы
            </Text>
            <div className={styles.filters}>
              <TextInput
                size="md"
                placeholder="Поиск"
                leftSection={
                  <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                }
                radius="md"
                className={styles.filter}
              />
              <Select
                size="md"
                defaultValue="Все темы"
                data={['Все темы', 'Тема 1', 'Тема 2', 'Тема 3']}
                className={styles.filter}
                radius="md"
              />
              <Button
                variant={checked ? 'filled' : 'default'}
                size="md"
                onClick={() => setChecked(!checked)}
                leftSection={
                  checked ? <IconBookmarkFilled size={14} /> : <IconBookmark size={14} />
                }
                className={clsx(styles.filter, styles.bookmark)}
                radius="md"
              >
                Сохранённые
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
