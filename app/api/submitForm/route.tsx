// import prisma from "@/prisma/client";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";
// import { json } from "stream/consumers";

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//     const body = req.body;
    // const body = await req.formData();

    // const validation = schema.safeParse(body);
    // if (!validation.success)
    //     return NextResponse.json(validation.error.errors, { status: 400 })
    // console.log('received', body)

    // const newRequest = await prisma.user.create({
    //     data: {
    //         name: body.name,
    //         email: body.email,
    //     }
    // })
    
//     return NextResponse.json(body, { status: 201 })
// }

import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  });

export async function POST(req: NextRequest, res: NextApiResponse) {

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

    try {
        const formData = await req.formData();

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

        // data validation

        const newRequest = await prisma.reimbursement_Request.create({
            data: reimbursementRequest
        })

        return NextResponse.json({ message: newRequest }, { status: 201 })

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json('Internal server error', { status: 500 })
    }
}

