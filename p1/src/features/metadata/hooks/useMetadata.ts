import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { metadataService, Metadata } from "@/services/metadataService";

export const useMetadata = () => {
    return useQuery({
        queryKey: ["metadata"],
        queryFn: metadataService.getMetadata,
    });
};

export const useCreateMetadata = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: metadataService.createMetadata,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["metadata"] });
        },
    });
};
