import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { relationshipService, Relationship } from "@/services/relationshipService";

export const useRelationships = () => {
    return useQuery({
        queryKey: ["relationships"],
        queryFn: relationshipService.getRelationships,
    });
};

export const useCreateRelationship = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: relationshipService.createRelationship,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["relationships"] });
        },
    });
};
