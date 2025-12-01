export interface Relationship {
    key: string;
    relatedEntityId: string;
    startTime: string;
    endTime: string;
}

let mockRelationships: Relationship[] = [
    {
        key: "REPORTS_TO",
        relatedEntityId: "e2",
        startTime: "2023-01-01T00:00",
        endTime: "",
    },
];

export const relationshipService = {
    getRelationships: async (): Promise<Relationship[]> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return [...mockRelationships];
    },

    createRelationship: async (relationship: Relationship): Promise<Relationship> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        mockRelationships.push(relationship);
        return relationship;
    },
};
