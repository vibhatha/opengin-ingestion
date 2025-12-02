import { NextRequest, NextResponse } from "next/server";

const OPENGIN_API_URL = process.env.OPENGIN_INGESTION_API_URL || "http://0.0.0.0:8080";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        // Use v1/entities/search endpoint for getting entity by ID
        const response = await fetch(`${OPENGIN_API_URL}/v1/entities/search/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Backend API error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching entity:", error);
        return NextResponse.json(
            { error: "Failed to fetch entity" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const response = await fetch(`${OPENGIN_API_URL}/entities/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend API error:", response.status, errorText);
            return NextResponse.json(
                { error: `Backend API error: ${response.statusText}`, details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error updating entity:", error);
        return NextResponse.json(
            { error: "Failed to update entity" },
            { status: 500 }
        );
    }
}
