import { EffectorNext } from '@effector/next';
import { allSettled, fork, serialize } from 'effector';
import { notFound } from 'next/navigation';
import { $courses, $currentCourse, coursePageStarted, coursesPageStarted } from '@widgets/courses';

export async function generateStaticParams() {
  const scope = fork();

  // eslint-disable-next-line effector/mandatory-scope-binding
  await allSettled(coursesPageStarted, { scope });

  const courses = scope.getState($courses);

  return courses.map((course) => ({ id: course.id.toString() })).slice(0, 3);
}

export default async function Page({ params }: { params: { id: string } }) {
  const scope = fork();

  // eslint-disable-next-line effector/mandatory-scope-binding
  await allSettled(coursePageStarted, { scope, params });

  const values = serialize(scope);

  if (!scope.getState($currentCourse)) {
    notFound();
  }

  return (
    <EffectorNext values={values}>
      <section style={{ display: 'flex', flexFlow: 'column' }}>
        <h1>{scope.getState($currentCourse)!.title}</h1>
        {/* <CurrentBrewery /> */}
      </section>
    </EffectorNext>
  );
}
