import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { entityService, Entity } from "@/services/entityService";

export const useEntities = () => {
    return useQuery({
        queryKey: ["entities"],
        queryFn: entityService.getEntities,
    });
};

export const useCreateEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: entityService.createEntity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["entities"] });
        },
    });
};
