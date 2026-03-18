import { NextRequest, NextResponse } from 'next/server'
import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

// Lazy initialization - chỉ khởi tạo khi cần
function getAwsConfig() {
  const awsConfig = {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
  }

  if (!awsConfig.region || !awsConfig.accessKeyId || !awsConfig.secretAccessKey || !awsConfig.bucketName) {
    throw new Error('AWS configuration is missing')
  }

  return awsConfig
}

function getS3Client() {
  const awsConfig = getAwsConfig()
  return new S3Client({
    region: awsConfig.region,
    credentials: {
      accessKeyId: awsConfig.accessKeyId as string,
      secretAccessKey: awsConfig.secretAccessKey as string,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    // ✅ FIX: Validate AWS config trước khi xử lý file
    // Để tránh xử lý file không cần thiết nếu config sai
    getAwsConfig() // Validate config sớm

    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      throw new Error('No file provided')
    }

    const timestamp = new Date().getTime()
    const originalName = file.name.replace(/\s+/g, '-')
    const fileName = `${timestamp}-${originalName}`

    // Tạo presigned post với điều kiện metadata
    const awsConfig = getAwsConfig()
    const { url, fields } = await createPresignedPost(getS3Client(), {
      Bucket: awsConfig.bucketName as string,
      Key: fileName,
      Conditions: [
        ['starts-with', '$Content-Type', ''],
        ['content-length-range', 0, 2684354560], // optional: giới hạn 2.5GB
        { 'Content-Disposition': 'inline' },
      ],
      Fields: {
        key: fileName,
        'Content-Type': file.type,
        'Content-Disposition': 'inline',
      },
      Expires: 600, // URL hợp lệ trong 60 giây
    })

    const formDataS3 = new FormData()
    Object.entries(fields).forEach(([key, value]) => {
      formDataS3.append(key, value)
    })
    formDataS3.append('file', file)

    const res = await fetch(url, {
      method: 'POST',
      body: formDataS3,
      // mode: 'no-cors',
    })

    if (!res.ok) {
      throw new Error('Upload failed: ' + (await res.text()))
    }

    const filePath = `https://${awsConfig.bucketName}.s3.${awsConfig.region}.amazonaws.com/${fileName}`
    return NextResponse.json({ success: true, filePath })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
