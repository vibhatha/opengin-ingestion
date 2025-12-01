export interface Entity {
    id: string;
    kind: {
        major: string;
        minor: string;
    };
    name: {
        value: string;
        startTime: string;
        endTime: string;
    };
}

let mockEntities: Entity[] = [
    {
        id: "e1",
        kind: { major: "Person", minor: "Employee" },
        name: { value: "John Doe", startTime: "2023-01-01T00:00", endTime: "" },
    },
    {
        id: "e2",
        kind: { major: "Person", minor: "Manager" },
        name: { value: "Jane Smith", startTime: "2023-02-01T00:00", endTime: "" },
    },
];

export const entityService = {
    getEntities: async (): Promise<Entity[]> => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return [...mockEntities];
    },

    createEntity: async (entity: Entity): Promise<Entity> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        mockEntities.push(entity);
        return entity;
    },

    getEntityById: async (id: string): Promise<Entity | undefined> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return mockEntities.find((e) => e.id === id);
    },

    updateEntity: async (entity: Entity): Promise<Entity> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const index = mockEntities.findIndex((e) => e.id === entity.id);
        if (index !== -1) {
            mockEntities[index] = entity;
            return entity;
        }
        throw new Error("Entity not found");
    },
};
