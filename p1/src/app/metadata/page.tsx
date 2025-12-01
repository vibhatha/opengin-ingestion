"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Table, Column } from "@/components/ui/Table";
import { useMetadata, useCreateMetadata } from "@/features/metadata/hooks/useMetadata";
import { Metadata } from "@/services/metadataService";



export default function MetadataPage() {
    const { data: metadataList = [], isLoading } = useMetadata();
    const createMetadataMutation = useCreateMetadata();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        key: "",
        value: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newMetadata: Metadata = {
            key: formData.key,
            value: formData.value,
        };
        createMetadataMutation.mutate(newMetadata, {
            onSuccess: () => {
                setIsModalOpen(false);
                setFormData({
                    key: "",
                    value: "",
                });
            },
        });
    };

    const columns: Column<Metadata>[] = [
        {
            header: "Key",
            accessorKey: "key",
            className: "font-medium text-gray-900 dark:text-white",
        },
        {
            header: "Value",
            accessorKey: "value",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Metadata</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage metadata key-value pairs.
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="h-4 w-4" />}>
                    New Metadata
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
                    placeholder="Search metadata..."
                />
            </div>

            {/* Table */}
            <Table
                data={metadataList}
                columns={columns}
                keyExtractor={(item) => item.key}
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
                title="Create New Metadata"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Key"
                        name="key"
                        id="key"
                        required
                        value={formData.key}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Value"
                        name="value"
                        id="value"
                        required
                        value={formData.value}
                        onChange={handleInputChange}
                    />
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
