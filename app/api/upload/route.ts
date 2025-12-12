import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// Configuração do Cloudflare R2 (compatível com S3)
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const uploadType = formData.get('type') as string | null // 'banner', 'thumbnail', 'video' ou null

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    // Validar tamanho (máximo 15GB)
    const maxSize = 15 * 1024 * 1024 * 1024 // 15GB em bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'Arquivo muito grande. Máximo: 15GB' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo (vídeo ou imagem)
    const allowedVideoTypes = ['video/mp4', 'video/mov', 'video/quicktime', 'video/webm']
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const allowedTypes = [...allowedVideoTypes, ...allowedImageTypes]
    
    // Obter extensão do arquivo
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''
    
    // Também validar por extensão (alguns navegadores podem não retornar o MIME type correto)
    const allowedExtensions = {
      images: ['jpg', 'jpeg', 'png', 'webp'],
      videos: ['mp4', 'mov', 'webm']
    }
    
    const isValidMimeType = allowedTypes.includes(file.type)
    const isValidExtension = fileExtension && (
      allowedExtensions.images.includes(fileExtension) || 
      allowedExtensions.videos.includes(fileExtension)
    )
    
    if (!isValidMimeType && !isValidExtension) {
      return NextResponse.json(
        { success: false, message: 'Tipo de arquivo não permitido. Use vídeo (mp4, mov, webm) ou imagem (jpg, jpeg, png, webp)' },
        { status: 400 }
      )
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const finalExtension = fileExtension || 'jpg'
    
    // Determinar pasta baseado no tipo de upload ou tipo de arquivo
    let folder: string
    if (uploadType === 'banner') {
      folder = 'banners' // Pasta específica para banners
    } else if (uploadType === 'thumbnail') {
      folder = 'thumbnails'
    } else if (uploadType === 'video') {
      folder = 'films'
    } else {
      // Fallback: determinar pela extensão do arquivo
      folder = allowedImageTypes.includes(file.type) ? 'thumbnails' : 'films'
    }
    
    const fileName = `${folder}/${timestamp}-${randomString}.${finalExtension}`

    // Converter File para Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload para R2
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    })

    await s3Client.send(command)

    // URL pública do arquivo
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`

    return NextResponse.json(
      {
        success: true,
        data: {
          url: publicUrl,
          fileName,
          size: file.size,
          type: file.type,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao fazer upload do arquivo' },
      { status: 500 }
    )
  }
}

