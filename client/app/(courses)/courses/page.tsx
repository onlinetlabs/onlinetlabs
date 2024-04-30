import { EffectorNext } from '@effector/next';
import { allSettled, fork, serialize } from 'effector';
import { CoursesPage } from '@views/courses';
import { coursesPageStarted } from '@widgets/courses';

export default async function Page() {
  const scope = fork();

  // eslint-disable-next-line effector/mandatory-scope-binding
  await allSettled(coursesPageStarted, { scope });

  const values = serialize(scope);

  return (
    <EffectorNext values={values}>
      <CoursesPage />
    </EffectorNext>
  );
}
