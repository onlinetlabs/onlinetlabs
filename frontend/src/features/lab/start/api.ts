'use server';

import { api } from '@lib/api';
import type {
  LabStart,
  LabStartParams,
} from './types';

export async function start(params: LabStartParams) {
  const response = await api.post('/api/lab/start', params);

  const data = response.data as LabStart;

  return {
    labLink: data.lab_link,
    labProjectId: data.lab_project_id,
    labPort: data.lab_port,
  };
}
