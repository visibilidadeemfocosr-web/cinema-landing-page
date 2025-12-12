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

// GET - Buscar configuração da bio
export async function GET() {
  try {
    await ensureDataDir()
    
    if (!existsSync(SETTINGS_FILE)) {
      return NextResponse.json({
        profileImage: '/images/alicestamato.jpeg',
        name: 'Alice Stamato',
        location: 'São Paulo, SP, Brasil',
        pronouns: 'she/her',
        bioPt: '',
        bioEn: '',
        bioEs: '',
        email: 'alicestamato@gmail.com',
        instagramPersonal: 'alicestamato',
        instagramLombada: 'lombadafilmes',
      })
    }

    const fileContent = await readFile(SETTINGS_FILE, 'utf-8')
    const settings = JSON.parse(fileContent)

    return NextResponse.json({
      profileImage: settings.profileImage || '/images/alicestamato.jpeg',
      name: settings.name || 'Alice Stamato',
      location: settings.location || 'São Paulo, SP, Brasil',
      pronouns: settings.pronouns || 'she/her',
      bioPt: settings.bioPt || '',
      bioEn: settings.bioEn || '',
      bioEs: settings.bioEs || '',
      email: settings.email || 'alicestamato@gmail.com',
      instagramPersonal: settings.instagramPersonal || 'alicestamato',
      instagramLombada: settings.instagramLombada || 'lombadafilmes',
    })
  } catch (error) {
    console.error('Erro ao ler configuração da bio:', error)
    return NextResponse.json(
      { 
        profileImage: '/images/alicestamato.jpeg',
        name: 'Alice Stamato',
        location: 'São Paulo, SP, Brasil',
        pronouns: 'she/her',
        bioPt: '',
        bioEn: '',
        bioEs: '',
        email: 'alicestamato@gmail.com',
        instagramPersonal: 'alicestamato',
        instagramLombada: 'lombadafilmes',
      },
      { status: 200 }
    )
  }
}

// POST - Salvar configuração da bio
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir()

    const body = await request.json()
    const { 
      profileImage, 
      name, 
      location, 
      pronouns, 
      bioPt, 
      bioEn, 
      bioEs, 
      email, 
      instagramPersonal, 
      instagramLombada 
    } = body

    // Ler configurações existentes
    let existingSettings = {}
    if (existsSync(SETTINGS_FILE)) {
      const fileContent = await readFile(SETTINGS_FILE, 'utf-8')
      existingSettings = JSON.parse(fileContent)
    }

    // Atualizar apenas os campos fornecidos
    const settings = {
      ...existingSettings,
      profileImage: profileImage || existingSettings.profileImage || '/images/alicestamato.jpeg',
      name: name || existingSettings.name || 'Alice Stamato',
      location: location || existingSettings.location || 'São Paulo, SP, Brasil',
      pronouns: pronouns || existingSettings.pronouns || 'she/her',
      bioPt: bioPt !== undefined ? bioPt : (existingSettings.bioPt || ''),
      bioEn: bioEn !== undefined ? bioEn : (existingSettings.bioEn || ''),
      bioEs: bioEs !== undefined ? bioEs : (existingSettings.bioEs || ''),
      email: email || existingSettings.email || 'alicestamato@gmail.com',
      instagramPersonal: instagramPersonal || existingSettings.instagramPersonal || 'alicestamato',
      instagramLombada: instagramLombada || existingSettings.instagramLombada || 'lombadafilmes',
      updatedAt: new Date().toISOString(),
    }

    await writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8')

    return NextResponse.json({
      success: true,
      message: 'Bio salva com sucesso',
      data: settings,
    })
  } catch (error) {
    console.error('Erro ao salvar configuração da bio:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao salvar configuração da bio' },
      { status: 500 }
    )
  }
}

