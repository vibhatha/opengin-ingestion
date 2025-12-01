export interface Metadata {
    key: string;
    value: string;
}

let mockMetadata: Metadata[] = [
    { key: "source", value: "HR System" },
    { key: "version", value: "1.0" },
];

export const metadataService = {
    getMetadata: async (): Promise<Metadata[]> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return [...mockMetadata];
    },

    createMetadata: async (metadata: Metadata): Promise<Metadata> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        mockMetadata.push(metadata);
        return metadata;
    },
};
