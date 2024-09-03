import { NextRequest, NextResponse } from 'next/server';
//import { S3 } from '@aws-sdk/client-s3';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION,
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY as string,
  },
});

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("File not found in the request");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const putObjectCommand = new PutObjectCommand({
      Bucket: "data",
      Key: file.name, // use the actual file name
      Body: buffer,
    });

    const response = await r2Client.send(putObjectCommand);
    console.log("File uploaded successfully:", file.name);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
