"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Table, Column } from "@/components/ui/Table";
import { useEntities, useCreateEntity } from "@/features/entity/hooks/useEntities";
import { Entity } from "@/services/entityService";



export default function EntityPage() {
    const { data: entities = [], isLoading } = useEntities();
    const createEntityMutation = useCreateEntity();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        majorKind: "",
        minorKind: "",
        name: "",
        startTime: "",
        endTime: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEntity: Entity = {
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
        createEntityMutation.mutate(newEntity, {
            onSuccess: () => {
                setIsModalOpen(false);
                setFormData({
                    id: "",
                    majorKind: "",
                    minorKind: "",
                    name: "",
                    startTime: "",
                    endTime: "",
                });
            },
        });
    };

    const columns: Column<Entity>[] = [
        {
            header: "ID",
            accessorKey: "id",
            className: "font-medium text-gray-900 dark:text-white",
        },
        {
            header: "Name",
            cell: (entity) => entity.name.value,
        },
        {
            header: "Kind",
            cell: (entity) => `${entity.kind.major} / ${entity.kind.minor}`,
        },
        {
            header: "Start Time",
            cell: (entity) => entity.name.startTime,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Entities</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Create and manage entities in the system.
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="h-4 w-4" />}>
                    New Entity
                </Button>
            </div>

            {/* Search Bar (Mock) */}
            <div className="relative rounded-md shadow-sm max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Search entities..."
                />
            </div>

            {/* Table */}
            <Table
                data={entities}
                columns={columns}
                keyExtractor={(item) => item.id}
                isLoading={isLoading}
                pagination={{
                    currentPage: 1,
                    totalPages: 1,
                    onPageChange: () => { },
                }}
            />

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Entity"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="ID"
                        name="id"
                        id="id"
                        required
                        value={formData.id}
                        onChange={handleInputChange}
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
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <Button type="submit" className="w-full sm:col-start-2">
                            Create
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full sm:mt-0 sm:col-start-1"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
