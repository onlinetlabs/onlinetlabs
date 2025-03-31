import { useMutation } from "@tanstack/react-query";
import { startLab } from "./api";
import { setLabDataInLocalStorage } from "@entities/lab/context";

export const useMutateStart = () => {
  return useMutation({
    mutationFn: startLab,
    onSuccess: setLabDataInLocalStorage,
  });
};