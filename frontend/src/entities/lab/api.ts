'use server';

import { api } from '@lib/api';
import { generateQueryParams } from '@lib/utils';
import type {
  ProjectInfo,
  ProjectInfoParams,
  UserChecklog,
  UserChecklogsParams,
  UserProject,
} from './types';

export async function getUserProjects() {
  const response = await api.get('/api/lab/get_user_projects');

  const data = response.data as ApiMapping<UserProject>[] | null;

  if (!data) return [];

  return data.map((item) => ({
    labId: item.lab_id,
    projectId: item.project_id,
    createdAt: item.created_at,
  }));
}

export async function getUserChecklogs(params: UserChecklogsParams) {
  const queryParams = generateQueryParams(params);
  const response = await api.get(`/api/lab/get_user_checklogs?${queryParams}`);

  const data = response.data as ApiMapping<UserChecklog>[] | ApiError;

  if ('detail' in data) {
    return [];
    // throw new Error(data.detail);
  }

  return data.map((item) => ({
    labId: item.lab_id,
    passed: item.passed,
    checklog: item.checklog,
    stored: item.stored,
    createdAt: item.created_at,
  }));
}

export async function getProjectInfo(params: ApiMapping<ProjectInfoParams>) {
  const response = await api.get(`/api/lab/project_info/${params.project_id}`);

  const data = response.data as ApiMapping<ProjectInfo> | ApiError;

  if ('detail' in data) return null;

  return {
    labId: data.lab_id,
    labUser: data.lab_user,
    labPasswd: data.lab_passwd,
  };
}
