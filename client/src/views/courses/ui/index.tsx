import { BaseLayout } from '@views/layouts';
import { Courses } from '@widgets/courses';
import { Header } from '@widgets/header';
import { Hero } from './hero';
import { CoursesPagination } from './pagination';

export const CoursesPage = () => {
  return (
    <BaseLayout header={<Header />}>
      <Hero />
      <Courses />
      <CoursesPagination />
    </BaseLayout>
  );
};
