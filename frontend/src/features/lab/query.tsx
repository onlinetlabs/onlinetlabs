import { useMutation } from "@tanstack/react-query";
import * as API from "./api";

export const useMutateStart = () => {
  return useMutation({
    mutationFn: API.start,
  });
};

export const useMutateCheck = () => {
  return useMutation({
    mutationFn: API.check,
  });
};