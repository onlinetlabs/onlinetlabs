import { useQuery } from '@tanstack/react-query';
import { getUser } from './api';

export const userKeys = {
  all: ['user'] as const,
  info: () => [...userKeys.all, 'info'] as const,
}

export function useUser() {
  const queryInfo = useQuery({
    queryKey: userKeys.info(),
    queryFn: async () => getUser(),
  })

  return queryInfo;
}