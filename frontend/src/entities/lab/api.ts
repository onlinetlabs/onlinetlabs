'use server';

import { auth } from "@auth";
import { UserChecklog, UserChecklogsParams, UserProject } from "./types";

export async function getUserProjects() {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/api/lab/get_user_projects`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  })

  const data = (await response.json()) as CustomResponse<UserProject>[];

  const result: UserProject[] = data.map((item) => ({
    labId: item.lab_id,
    projectId: item.project_id,
    createdAt: item.created_at,
  }));

  return result;
}

export async function getUserChecklogs(params: UserChecklogsParams) {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/api/lab/get_user_checklogs?lab_id=${params.lab_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  })

  const data = (await response.json()) as CustomResponse<UserChecklog>[];

  // const result: UserChecklog[] = data.map((item) => ({
  //   labId: item.lab_id,
  //   projectId: item.project_id,
  //   createdAt: item.created_at,
  // }));

  return data;
}

