'use server';

import { api } from '@lib/api';

export async function getAllUsers() {
  const response = await api.get<ApiMapping<User>[]>('/api/database/get_all_users');

  const data = response.data;

  if (!data) {
    return [];
  }

  const result: User[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    surname: item.surname,
    email: item.email,
    role: item.role,
    lastSeen: item.last_seen,
  }));

  return result;
}

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: Role;
  lastSeen: string;
};
