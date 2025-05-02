'use server';

import { api } from '@lib/api';
import type {
  LabDeleteParams,
} from './types';

export async function remove(params: ApiMapping<LabDeleteParams>) {
  const response = await api.delete('/api/lab/delete', { data: params });

  return response.data as { success: boolean };
}
