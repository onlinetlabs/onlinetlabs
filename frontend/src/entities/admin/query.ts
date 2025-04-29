import { queryOptions, useQuery } from "@tanstack/react-query";
import * as API from "./api";

export const adminKeys = {
  all: ["admin"] as const,
  getAllUsers: () => [...adminKeys.all, "getAllUsers"] as const,
}

export const getAllUsersOptions = queryOptions({
  queryKey: adminKeys.getAllUsers(),
  queryFn: API.getAllUsers,
})