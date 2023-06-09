import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import { createPurchase } from "../../services/purchases/createPurchases";

export const useCreatePurchase = () => {
  const token = useSelector((store) => store.auth.token);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createPurchase(token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart"] });
      await queryClient.invalidateQueries({ queryKey: ["purchases"]})
    },
  });

  return mutation;
};
