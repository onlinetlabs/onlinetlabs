'use server';

import { auth } from "auth";

export async function getAllUsers() {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/api/database/get_all_users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json()) as ApiMapping<User>[] | null;

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
  role: string;
  lastSeen: string;
}