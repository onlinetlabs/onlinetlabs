import { Layout } from '@features/layout';
import { Header } from '@widgets/header';
import { CourseCard } from './ui/card';
import { Hero } from './ui/hero';
import { CoursesPagination } from './ui/pagination';

import styles from './styles.module.css';

export const CoursesPage = () => {
  return (
    <Layout header={<Header />}>
      <Hero />
      <div className={styles.cards}>
        {[...Array(12)].map((_, idx) => (
          <div key={idx} className={styles.wrapper}>
            <CourseCard />
          </div>
        ))}
      </div>
      <CoursesPagination />
    </Layout>
  );
};
