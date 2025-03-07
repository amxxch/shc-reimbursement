import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

interface ReceiptDto {
    description: string;
    paymentMethod: string;
    amount: number;
    copyOfReceipt: string;
    additionalDocs: Record<string, string>;
}

export async function POST(req: NextRequest) {

    try {
        const formData = await req.formData();

        // Create a new reimbursement request
        const emailPosterFile = formData.get('emailPoster') as File;
        const emailPosterUrl = await uploadFile(emailPosterFile);

        const participantListFile = formData.get('participantList') as File;
        const participantList_url = participantListFile.size > 0
            ? await uploadFile(formData.get('participantList') as File)
            : null;

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
            email_poster: emailPosterUrl,
            participant_list: participantList_url,
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
            }

            const copyOfReceiptFile = formData.get(`receipts[${index}][copyOfReceipt]`) as File;
            const copyOfReceiptUrl = await uploadFile(copyOfReceiptFile);

            const additionalDocs: Record<string, string> = {};
            let additionalDocsIndex = 0;
            while (formData.has(`receipts[${index}][additionalDocs][${additionalDocsIndex}][file]`)) {
                console.log('has additional docs at index', additionalDocsIndex);
                const additionalDocFile = formData.get(`receipts[${index}][additionalDocs][${additionalDocsIndex}][file]`) as File;
                const additionalDocType = formData.get(`receipts[${index}][additionalDocs][${additionalDocsIndex}][doc_type]`) as string;
                const additionalDocUrl = await uploadFile(additionalDocFile);
                additionalDocs[additionalDocType] = additionalDocUrl;
                additionalDocsIndex++;
            }

            receipts.push({
                ...receipt,
                copyOfReceipt: copyOfReceiptUrl,
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

// Upload a file to AWS S3 Cloud Storage
const uploadFile = async (file: File): Promise<string> => {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) throw new Error('AWS_S3_BUCKET_NAME is not defined');

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    
    const params = {
        Bucket: bucketName,
        Key: `uploads/${file.name}`,
        Body: buffer,
        ContentType: file.type,
        ACL: 'public-read' as 'public-read',
    };
    try {
        const upload = new Upload({
          client: s3Client,
          params,
        });
    
        const result = await upload.done();
        if (!result.Location) throw new Error('Upload did not return a location');
        return result.Location;
    
    } catch (error) {
        console.error('Failed to upload file:', error);
        throw new Error('Failed to upload file');
    }
};