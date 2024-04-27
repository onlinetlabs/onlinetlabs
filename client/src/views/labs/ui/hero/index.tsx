'use client';

import { useState } from 'react';
import { Button, rem, Select, Text, TextInput } from '@mantine/core';
import { IconBookmark, IconBookmarkFilled, IconSearch } from '@tabler/icons-react';
import { clsx } from 'clsx';

import styles from './styles.module.css';

export const Hero = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.background}>
            <picture>
              <img
                className={styles.cover}
                src="https://storage.yandexcloud.net/cloud-www-assets/blog-assets/cover_blog.png"
              />
            </picture>
          </div>
          <div className={styles.controls}>
            <Text component="h1" fw={500} className={styles.title}>
              Лабораторные работы
            </Text>
            <div className={styles.filters}>
              <TextInput
                size="md"
                placeholder="Поиск"
                leftSection={
                  <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                }
                className={styles.filter}
              />
              <Select
                size="md"
                defaultValue={'Все темы'}
                data={['Все темы', 'Тема 1', 'Тема 2', 'Тема 3']}
                className={styles.filter}
              />
              <Button
                variant={checked ? 'filled' : 'default'}
                size="md"
                onClick={() => setChecked(!checked)}
                leftSection={
                  checked ? <IconBookmarkFilled size={14} /> : <IconBookmark size={14} />
                }
                className={clsx(styles.filter, styles.bookmark)}
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
