import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attributeService, Attribute } from "@/services/attributeService";

export const useAttributes = () => {
    return useQuery({
        queryKey: ["attributes"],
        queryFn: attributeService.getAttributes,
    });
};

export const useCreateAttribute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: attributeService.createAttribute,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attributes"] });
        },
    });
};
