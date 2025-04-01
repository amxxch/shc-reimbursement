import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET (
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> } 
) {
    try {
        const acceptHeader = req.headers.get('accept');

        if (acceptHeader?.includes('text/html')) {
            return new NextResponse('API access only', { status: 403 });
        }
        
        const { id } = await params;
        const requestId = parseInt(id);

        const reimbursementRequest = await prisma.reimbursement_Request.findUnique({
            where: { request_id: requestId },
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

export async function PUT(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const acceptHeader = req.headers.get('accept');

        if (acceptHeader?.includes('text/html')) {
            return new NextResponse('API access only', { status: 403 });
        }

        const { id } = await params;
        const requestId = parseInt(id);

        const existingRequest = await prisma.reimbursement_Request.findUnique({
            where: { request_id: requestId }
        });

        if (!existingRequest) {
            return NextResponse.json(
                { error: 'Reimbursement request not found' },
                { status: 404 }
            );
        }

        const body = await req.json();

        const updatedRequest = await prisma.reimbursement_Request.update({
            where: { request_id: requestId },
            data: body
        });

        return NextResponse.json(updatedRequest, { status: 200 });

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json('Internal server error', { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const requestId = parseInt(id);

        const existingRequest = await prisma.reimbursement_Request.findUnique({
            where: { request_id: requestId }
        });

        if (!existingRequest) {
            return NextResponse.json(
                { error: 'Reimbursement request not found' },
                { status: 404 }
            );
        }

        await prisma.$transaction([

            prisma.additional_Documents.deleteMany({
              where: { receipt: { request_id: requestId } }
            }),
            
            prisma.receipt.deleteMany({
              where: { request_id: requestId }
            }),
            
            prisma.reimbursement_Request.delete({
              where: { request_id: requestId }
            })
          ]);
        return NextResponse.json(existingRequest, { status: 200 });

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json('Internal server error', { status: 500 });
    }
}