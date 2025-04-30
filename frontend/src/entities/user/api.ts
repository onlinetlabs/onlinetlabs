'use server';
// import { auth } from "auth";

export async function getUser() {
  return {
    id: 3,
    name: "Name",
    surname: "Surname",
    email: "admin8782@mail.ru",
    role: "admin",
    lastSeen: "2025-04-27",
  }
  // const session = await auth();

  // const response = await fetch(`${process.env.API_URL}/api/user`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${session?.accessToken}`,
  //     "Content-Type": "application/json",
  //   },
  // });

  // const data = (await response.json()) as ApiMapping<User>;

  // return {
  //   id: data.id,
  //   name: data.name,
  //   surname: data.surname,
  //   email: data.email,
  //   role: data.role,
  //   lastSeen: data.last_seen,    
  // };
}

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
  lastSeen: string;
}