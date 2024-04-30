import { createQuery } from '@farfetched/core';
import { commonRequestFx } from '@shared/api/requests';
import type { Course } from './types';

export const coursesQuery = createQuery({
  effect: commonRequestFx<void, Course[]>({
    url: '/posts?_start=0&_limit=3',
  }),
});

export const courseQuery = createQuery({
  effect: commonRequestFx<string, Course>((id) => ({
    url: `/posts/${id}`,
  })),
});
