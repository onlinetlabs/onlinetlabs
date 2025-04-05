import { queryOptions, useQuery } from "@tanstack/react-query";
import * as API from "./api";

export const labKeys = {
  all: ["lab"] as const,
  logs: () => [...labKeys.all, "logs"] as const,
  projects: () => [...labKeys.all, "projects"] as const,
}

export const useChecklogs = (projectId: string) => {
  const queryInfo = useQuery({
    queryKey: [...labKeys.logs(), projectId] as const,
    queryFn: async () => API.getUserChecklogs({ project_id: projectId }),
    initialData: []
  });

  return queryInfo;
};

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
