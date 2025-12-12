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
        bannerOpacity: 90,
      })
    }

    const fileContent = await readFile(SETTINGS_FILE, 'utf-8')
    const settings = JSON.parse(fileContent)

    return NextResponse.json({
      bannerUrl: settings.bannerUrl || '/cinematic-film-production-background.jpeg',
      bannerPosition: settings.bannerPosition || 'center',
      bannerOpacity: settings.bannerOpacity !== undefined ? settings.bannerOpacity : 90,
    })
  } catch (error) {
    console.error('Erro ao ler configuração:', error)
    return NextResponse.json(
      { 
        bannerUrl: '/cinematic-film-production-background.jpeg',
        bannerPosition: 'center',
        bannerOpacity: 90,
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
    const { bannerUrl, bannerPosition, bannerOpacity } = body

    if (!bannerUrl) {
      return NextResponse.json(
        { success: false, message: 'URL do banner é obrigatória' },
        { status: 400 }
      )
    }

    // Validar opacidade (0-100)
    const opacity = bannerOpacity !== undefined 
      ? Math.max(0, Math.min(100, Number(bannerOpacity))) 
      : 90

    const settings = {
      bannerUrl,
      bannerPosition: bannerPosition || 'center',
      bannerOpacity: opacity,
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

