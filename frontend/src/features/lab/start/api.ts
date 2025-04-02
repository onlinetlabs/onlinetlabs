'use server';

import { auth } from "@auth";
import { LabCheck, LabCheckParams, LabStart, LabStartParams } from "./types";
import { generateQueryParams } from "@lib/utils";

export async function start(params: LabStartParams) {
  const session = await auth();

  const queryParams = generateQueryParams(params);
  const response = await fetch(`${process.env.API_URL}/api/lab/start?${queryParams}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json()) as LabStart;

  return {
    labLink: data.lab_link,
    labProjectId: data.lab_project_id,
    labPort: data.lab_port,
  };
}

export async function check(params: ApiMapping<LabCheckParams>) {
  const session = await auth();

  const queryParams = generateQueryParams(params);
  const response = await fetch(`${process.env.API_URL}/api/lab/check?${queryParams}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = (await response.json()) as LabCheck;

  return data;
}