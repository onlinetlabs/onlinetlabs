'use server';

import { auth } from "@auth";
import { UserChecklog, UserChecklogsParams, UserProject } from "./types";
import { generateQueryParams } from "@lib/utils";

export async function getUserProjects() {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/api/lab/get_user_projects`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  })

  const data = (await response.json()) as ApiMapping<UserProject>[];

  const result: UserProject[] = data.map((item) => ({
    labId: item.lab_id,
    projectId: item.project_id,
    createdAt: item.created_at,
  }));

  return result;
}

export async function getUserChecklogs(params: UserChecklogsParams) {
  const session = await auth();

  const queryParams = generateQueryParams(params);
  const response = await fetch(`${process.env.API_URL}/api/lab/get_user_checklogs?${queryParams}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json()) as ApiMapping<UserChecklog>[];

  const result: UserChecklog[] = data.map((item) => ({
    labId: item.lab_id,
    passed: item.passed,
    checklog: item.checklog,
    stored: item.stored,
    createdAt: item.created_at,
  }));

  return result;
}

