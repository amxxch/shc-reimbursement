import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET (req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const reimbursementRequest = await prisma.reimbursement_Request.findUnique({
            where: { request_id: parseInt(id) },
            include: {
                receipts: {
                    include: {
                        additional_docs: true
                    }
                }
            }
        });

        if (!reimbursementRequest) return NextResponse.json({ error: 'Request not found' }, { status: 404 });

        return NextResponse.json(reimbursementRequest, { status: 200 });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json('Internal server error', { status: 500 });
    }
}