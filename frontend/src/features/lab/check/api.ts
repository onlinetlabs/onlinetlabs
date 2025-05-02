'use server';

import { api } from '@lib/api';
import type {
  LabCheck,
  LabCheckParams,
} from './types';

export async function check(params: ApiMapping<LabCheckParams>) {
  const response = await api.post('/api/lab/check', params);

  return response.data as LabCheck;
}
