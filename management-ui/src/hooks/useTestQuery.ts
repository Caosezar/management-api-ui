import { useQuery } from "@tanstack/react-query";

export const useTestQuery = () => {
  return useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { message: "TanStack Query funcionando!" };
    },
  });
};
