import type { StoreValue } from 'effector';
import { createEvent, createStore, sample, split } from 'effector';
import { type Course, courseQuery, coursesQuery } from '@entities/course';

export const coursesPageStarted = createEvent();
export const coursePageStarted = createEvent<{ id: string }>();

export const moreRequested = createEvent();
const nextPageRequested = createEvent();

export const singleRequested = createEvent<string>();

const courseLoaded = createEvent<Course>();
const courseNotFound = createEvent<null>();

const $currentPage = createStore<number>(1);
export const $courses = createStore<Course[]>([]);

const $currentCourseId = createStore<string | null>(null);
export const $currentCourse = createStore<Course | null>(null);

$courses.on(coursesQuery.finished.success, (list, { result }) => [...list, ...result]);
$currentCourseId.on(singleRequested, (_, id) => id);

export const $coursesLoading = coursesQuery.$pending;
export const $courseLoading = courseQuery.$pending;

sample({
  clock: moreRequested,
  source: $currentPage,
  fn: (page) => page + 1,
  target: [$currentPage, nextPageRequested],
});

sample({
  clock: [coursesPageStarted, nextPageRequested],
  source: $currentPage,
  fn: (page) => ({ page }),
  target: coursesQuery.refresh,
});

split({
  source: sample({
    clock: singleRequested,
    source: $courses,
    fn: (courses, id) => courses.find((item) => item.id.toString() === id) ?? null,
  }),
  match: {
    found: (brewery) => brewery !== null,
  },
  cases: {
    found: courseLoaded,
    __: courseNotFound,
  },
});

sample({
  clock: courseNotFound,
  source: $currentCourseId,
  /**
   * There is a edge-case with TypeScript type inference here,
   * which requires to explicitly set the `filter` argument type to _make type narrowing work_
   * - even though TypeScript _knowns_ the type and _will not_ allow to set it to the wrong value.
   *
   * You can read about it in detail here:
   * https://effector.dev/docs/typescript/typing-effector#sample
   */
  filter: (id: StoreValue<typeof $currentCourseId>): id is string => id !== null,
  fn: (id) => id,
  target: courseQuery.refresh,
});

sample({
  clock: [courseLoaded, courseQuery.$data],
  target: $currentCourse,
});

sample({
  clock: coursePageStarted,
  fn: ({ id }) => id,
  target: singleRequested,
});
