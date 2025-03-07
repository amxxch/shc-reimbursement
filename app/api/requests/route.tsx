import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET () {
    try {
        const reimbursementRequests = await prisma.reimbursement_Request.findMany({
            include: {
                receipts: {
                    include: {
                        additional_docs: true
                    }
                }
            }
        });

        return NextResponse.json(reimbursementRequests, { status: 200 });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json('Internal server error', { status: 500 });
    }
}