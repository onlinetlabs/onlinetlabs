'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as API from "./api";
import { labKeys } from "@entities/lab";
import { useRouter } from "next/navigation";

export const useMutateStart = () => {
  return useMutation({
    mutationFn: API.start,
  });
};

export const useMutateDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: API.remove,
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: labKeys.projects() });
        router.push("/gns3")
      }
    }
  });
}


export const useMutateCheck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.check,
    onSuccess: (_, { project_id }) => {
      queryClient.invalidateQueries({ queryKey: [...labKeys.logs(), project_id] });
    }
  });
};