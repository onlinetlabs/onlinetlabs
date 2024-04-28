'use client';

import { Pagination } from '@mantine/core';

import styles from './styles.module.css';

export const CoursesPagination = () => {
  return (
    <div className={styles.pagination}>
      <Pagination value={1} onChange={() => {}} total={10} />
    </div>
  );
};
