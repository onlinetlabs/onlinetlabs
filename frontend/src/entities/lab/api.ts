'use server';

import { auth } from "auth";
import { generateQueryParams } from "@lib/utils";
import { UserChecklog, UserChecklogsParams, UserProject } from "./types";

export async function getUserProjects() {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/api/lab/get_user_projects`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.token?.accessToken}`,
      "Content-Type": "application/json",
    },
  })

  const data = (await response.json()) as ApiMapping<UserProject>[] | null;

  if (!data) {
    return [];
  }

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
      Authorization: `Bearer ${session?.token?.accessToken}`,
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

