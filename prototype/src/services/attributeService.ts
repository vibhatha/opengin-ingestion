export interface Attribute {
    key: string;
    value: string;
    startTime: string;
    endTime: string;
}

let mockAttributes: Attribute[] = [
    {
        key: "status",
        value: "Active",
        startTime: "2023-01-01T00:00",
        endTime: "",
    },
];

export const attributeService = {
    getAttributes: async (): Promise<Attribute[]> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return [...mockAttributes];
    },

    createAttribute: async (attribute: Attribute): Promise<Attribute> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        mockAttributes.push(attribute);
        return attribute;
    },
};
