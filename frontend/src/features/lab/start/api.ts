'use server';

import { auth } from "@auth";
import { LabStart, LabStartParams } from "./types";

export async function startLab(params: LabStartParams) {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/api/lab/start?lab_id=${params.lab_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  })

  const data = (await response.json()) as LabStart;

  return {
    labLink: data.lab_link,
    labProjectId: data.lab_project_id,
    labPort: data.lab_port,
  };
}