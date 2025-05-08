import { queryOptions } from "@tanstack/react-query";
import * as API from "./api";

export const labKeys = {
  all: ["lab"] as const,
  logs: () => [...labKeys.all, "logs"] as const,
  projects: () => [...labKeys.all, "projects"] as const,
  info: () => [...labKeys.all, "info"] as const,
}

export function checksOptions(projectId: string) {
  return queryOptions({
    queryKey: [...labKeys.logs(), projectId] as const,
    queryFn: async () => API.getUserChecklogs({ project_id: projectId }),
  })
}

export const projectsOptions = queryOptions({
  queryKey: labKeys.projects(),
  queryFn: async () => API.getUserProjects(),
})

export const projectInfoOptions = (projectId: string) => queryOptions({
  queryKey: [...labKeys.info(), projectId] as const,
  queryFn: async () => API.getProjectInfo({ project_id: projectId }),
})