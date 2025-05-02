'use server';

import { api } from '@lib/api';

export async function getUser() {
  const response = await api.get<ApiMapping<User>>('/api/user');
  const data = response.data;

  return {
    id: data.id,
    name: data.name,
    surname: data.surname,
    email: data.email,
    role: data.role,
    lastSeen: data.last_seen,
  };
}

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: Role;
  lastSeen: string;
};
