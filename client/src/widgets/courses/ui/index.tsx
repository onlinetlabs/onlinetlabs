'use client';
import { list } from '@effector/reflect';
import { CourseCard } from '@entities/course';
import { $courses } from '../model';
import styles from './styles.module.css';

export const Courses = () => {
  return (
    <div className={styles.cards}>
      <CoursesList />
    </div>
  );
};

const CoursesList = list({
  source: $courses,
  view: CourseCard,
});
