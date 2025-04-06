'use server';

import { auth } from "auth";
import { LabCheck, LabCheckParams, LabDeleteParams, LabStart, LabStartParams } from "./types";

export async function start(params: LabStartParams) {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/api/lab/start`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.token?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
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

  const response = await fetch(`${process.env.API_URL}/api/lab/check`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.token?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = (await response.json()) as LabCheck;

  return data;
}

export async function remove(params: ApiMapping<LabDeleteParams>) {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/api/lab/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.token?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = (await response.json()) as { success: boolean };

  return data;
}