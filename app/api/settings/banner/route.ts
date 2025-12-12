import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'settings.json')

// Garantir que o diretório existe
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }
}

// GET - Buscar configuração do banner
export async function GET() {
  try {
    await ensureDataDir()
    
    if (!existsSync(SETTINGS_FILE)) {
      return NextResponse.json({
        bannerUrl: '/cinematic-film-production-background.jpeg',
        bannerPosition: 'center',
      })
    }

    const fileContent = await readFile(SETTINGS_FILE, 'utf-8')
    const settings = JSON.parse(fileContent)

    return NextResponse.json({
      bannerUrl: settings.bannerUrl || '/cinematic-film-production-background.jpeg',
      bannerPosition: settings.bannerPosition || 'center',
    })
  } catch (error) {
    console.error('Erro ao ler configuração:', error)
    return NextResponse.json(
      { 
        bannerUrl: '/cinematic-film-production-background.jpeg',
        bannerPosition: 'center',
      },
      { status: 200 }
    )
  }
}

// POST - Salvar configuração do banner
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir()

    const body = await request.json()
    const { bannerUrl, bannerPosition } = body

    if (!bannerUrl) {
      return NextResponse.json(
        { success: false, message: 'URL do banner é obrigatória' },
        { status: 400 }
      )
    }

    const settings = {
      bannerUrl,
      bannerPosition: bannerPosition || 'center',
      updatedAt: new Date().toISOString(),
    }

    await writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8')

    return NextResponse.json({
      success: true,
      message: 'Banner salvo com sucesso',
      data: settings,
    })
  } catch (error) {
    console.error('Erro ao salvar configuração:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao salvar configuração do banner' },
      { status: 500 }
    )
  }
}

