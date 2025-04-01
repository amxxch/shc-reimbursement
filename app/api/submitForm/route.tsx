import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';

interface ReceiptDto {
    description: string;
    paymentMethod: string;
    amount: number;
    copyOfReceipt: string;
    additionalDocs: Record<string, string>;
}

export async function POST(req: NextRequest) {

    try {
        const acceptHeader = req.headers.get('accept');

        if (acceptHeader?.includes('text/html')) {
            return new NextResponse('API access only', { status: 403 });
        }
        
        const formData = await req.formData();

        // Create a new reimbursement request

        const reimbursementRequest = {
            first_name: formData.get('firstName') as string,
            last_name: formData.get('lastName') as string,
            email: formData.get('email') as string,
            phone_number: formData.get('phoneNo') as string,
            uid: formData.get('uid') as string,
            event_name: formData.get('eventName') as string,
            event_date: new Date(formData.get('eventDate') as string),
            organizing_committee: formData.get('committee') as string || null,
            num_of_participants: parseInt(formData.get('numOfParticipants') as string),
            location: formData.get('location') as string,
            email_poster: formData.get('emailPoster') as string,
            participant_list: formData.get('participantList') as string,
            total_amount: parseFloat(formData.get('totalAmount') as string),
        }

        // Create receipts
        let index = 0;
        const receipts: ReceiptDto[] = [];
        while (formData.has(`receipts[${index}][description]`)) {
            const receipt = {
                description: formData.get(`receipts[${index}][description]`) as string,
                paymentMethod: formData.get(`receipts[${index}][paymentMethod]`) as string,
                amount: parseFloat(formData.get(`receipts[${index}][amount]`) as string),
                copyOfReceipt: formData.get(`receipts[${index}][copyOfReceipt]`) as string,
            }

            const additionalDocs: Record<string, string> = {};
            let additionalDocsIndex = 0;
            while (formData.has(`receipts[${index}][additionalDocs][${additionalDocsIndex}][file]`)) {
                const additionalDocUrl = formData.get(`receipts[${index}][additionalDocs][${additionalDocsIndex}][file]`) as string;
                const additionalDocType = formData.get(`receipts[${index}][additionalDocs][${additionalDocsIndex}][doc_type]`) as string;
                additionalDocs[additionalDocType] = additionalDocUrl;
                additionalDocsIndex++;
            }

            receipts.push({
                ...receipt,
                additionalDocs,
            });
            index++;
        }

        console.log(receipts);

        // Data Validation (To be implemented)

        // Create a prisma transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create a new reimbursement request to the database
            const newRequest = await tx.reimbursement_Request.create({
                data: reimbursementRequest
            });

            for (const receipt of receipts) {
                // Create a new receipt to the database
                const newReceipt = await tx.receipt.create({
                    data: {
                        request_id: newRequest.request_id,
                        payment_method: receipt.paymentMethod,
                        description: receipt.description,
                        amount: receipt.amount,
                        copyOfReceipt: receipt.copyOfReceipt,
                    }
                });

                // Create additional documents for the receipt
                for (const [docType, url] of Object.entries(receipt.additionalDocs)) {
                    await tx.additional_Documents.create({
                        data: {
                            receipt_id: newReceipt.receipt_id,
                            doc_type: docType,
                            file_path: url as string,
                        }
                    });
                }
            }
            return { requestId : newRequest.request_id };
        });

        return NextResponse.json(result, { status: 201 })

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json('Internal server error', { status: 500 })
    }
}
