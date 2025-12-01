import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Entity } from "@/services/entityService";

interface EntityFormProps {
    initialData?: Partial<Entity>;
    onSubmit: (data: Entity) => void;
    isLoading?: boolean;
    onCancel: () => void;
    submitLabel?: string;
}

export function EntityForm({ initialData, onSubmit, isLoading, onCancel, submitLabel = "Save" }: EntityFormProps) {
    const [formData, setFormData] = useState({
        id: "",
        majorKind: "",
        minorKind: "",
        name: "",
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id || "",
                majorKind: initialData.kind?.major || "",
                minorKind: initialData.kind?.minor || "",
                name: initialData.name?.value || "",
                startTime: initialData.name?.startTime || "",
                endTime: initialData.name?.endTime || "",
            });
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const entity: Entity = {
            id: formData.id,
            kind: {
                major: formData.majorKind,
                minor: formData.minorKind,
            },
            name: {
                value: formData.name,
                startTime: formData.startTime,
                endTime: formData.endTime,
            },
        };
        onSubmit(entity);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="ID"
                name="id"
                id="id"
                required
                value={formData.id}
                onChange={handleInputChange}
                disabled={!!initialData?.id} // Disable ID editing for updates if desired
            />
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Major Kind"
                    name="majorKind"
                    id="majorKind"
                    required
                    value={formData.majorKind}
                    onChange={handleInputChange}
                />
                <Input
                    label="Minor Kind"
                    name="minorKind"
                    id="minorKind"
                    required
                    value={formData.minorKind}
                    onChange={handleInputChange}
                />
            </div>
            <Input
                label="Name"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
            />
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Start Time"
                    type="datetime-local"
                    name="startTime"
                    id="startTime"
                    required
                    value={formData.startTime}
                    onChange={handleInputChange}
                />
                <Input
                    label="End Time"
                    type="datetime-local"
                    name="endTime"
                    id="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : submitLabel}
                </Button>
            </div>
        </form>
    );
}
