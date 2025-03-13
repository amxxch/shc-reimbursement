import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

export async function POST(req: NextRequest) {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) throw new Error('AWS_S3_BUCKET_NAME is not defined');

    try {
        const { fileName, fileType } = await req.json();
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `uploads/${fileName}`,
            ContentType: fileType,
            ACL: 'public-read' as ObjectCannedACL,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        const location = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${encodeURIComponent(fileName)}`;

        return NextResponse.json({ url, location }, { status: 200 });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json('Internal server error', { status: 500 });
    }
}
