'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Upload, Film, Edit, Trash2, Plus, X, XCircle, ArrowUpDown, LogOut, Image as ImageIcon, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Image from 'next/image'

interface FilmData {
  id?: string
  title: string
  titleEn: string
  titleEs: string
  description: string
  descriptionEn: string
  descriptionEs: string
  year: number
  duration: string
  category: 'Ficção' | 'Drama' | 'Documentário' | 'Comercial'
  type: 'Vídeo Clipe' | 'Curta Metragem' | 'Longa Metragem' | 'Propaganda' | 'Institucional' | ''
  thumbnail: string
  thumbnailFile: File | null
  videoFile: File | null
  videoUrl: string
  isPublished: boolean
  displayOrder: number
}

export default function AdminPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [films, setFilms] = useState<any[]>([])
  const [loadingFilms, setLoadingFilms] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'createdAt' | 'category' | 'displayOrder'>('displayOrder')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [activeTab, setActiveTab] = useState<'films' | 'banner' | 'bio'>('films')
  const [bannerUrl, setBannerUrl] = useState<string>('/cinematic-film-production-background.jpeg')
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [bannerLoading, setBannerLoading] = useState(false)
  const [bannerPosition, setBannerPosition] = useState<string>('center')
  const [bannerOpacity, setBannerOpacity] = useState<number>(90) // Opacidade em percentual (0-100)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 }) // Percentuais (50% = center)
  
  // Estados para Bio
  const [bioLoading, setBioLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string>('/images/alicestamato.jpeg')
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [name, setName] = useState<string>('Alice Stamato')
  const [location, setLocation] = useState<string>('São Paulo, SP, Brasil')
  const [pronouns, setPronouns] = useState<string>('she/her')
  const [bioPt, setBioPt] = useState<string>('')
  const [bioEn, setBioEn] = useState<string>('')
  const [bioEs, setBioEs] = useState<string>('')
  const [email, setEmail] = useState<string>('alicestamato@gmail.com')
  const [instagramPersonal, setInstagramPersonal] = useState<string>('alicestamato')
  const [instagramLombada, setInstagramLombada] = useState<string>('lombadafilmes')
  const [formData, setFormData] = useState<FilmData>({
    title: '',
    titleEn: '',
    titleEs: '',
    description: '',
    descriptionEn: '',
    descriptionEs: '',
    year: new Date().getFullYear(),
    duration: '00:00:00',
    category: 'Ficção',
    type: '',
    thumbnail: '',
    thumbnailFile: null,
    videoFile: null,
    videoUrl: '',
    isPublished: false,
    displayOrder: 0,
  })

  // Carregar filmes
  useEffect(() => {
    fetchFilms()
  }, [])

  const fetchFilms = async () => {
    try {
      setLoadingFilms(true)
      const response = await fetch('/api/films')
      const data = await response.json()
      if (data.success) {
        setFilms(data.data || [])
      } else {
        console.error('Erro ao carregar filmes:', data.message)
        toast({
          title: 'Erro',
          description: data.message || 'Erro ao carregar filmes',
          variant: 'destructive',
        })
        setFilms([])
      }
    } catch (error) {
      console.error('Erro ao carregar filmes:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar filmes. Tente recarregar a página.',
        variant: 'destructive',
      })
      setFilms([])
    } finally {
      setLoadingFilms(false)
    }
  }

  // Função para ordenar filmes
  const getSortedFilms = () => {
    if (!films || films.length === 0) {
      return []
    }
    
    try {
      const sorted = [...films].sort((a, b) => {
        let aValue: any
        let bValue: any

        switch (sortBy) {
          case 'displayOrder':
            // Ordenação decrescente por padrão (maior número primeiro)
            // null/undefined/0 vão para o final
            aValue = a.displayOrder ?? -1
            bValue = b.displayOrder ?? -1
            // Para displayOrder, sempre usar ordem decrescente (maior primeiro)
            if (aValue !== bValue) {
              return bValue - aValue // Decrescente
            }
            // Se displayOrder for igual, ordenar por data de criação (mais recente primeiro)
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          case 'title':
            aValue = a.title?.toLowerCase() || ''
            bValue = b.title?.toLowerCase() || ''
            break
          case 'year':
            aValue = a.year || 0
            bValue = b.year || 0
            break
          case 'createdAt':
            aValue = new Date(a.createdAt || 0).getTime()
            bValue = new Date(b.createdAt || 0).getTime()
            break
          case 'category':
            aValue = a.category?.toLowerCase() || ''
            bValue = b.category?.toLowerCase() || ''
            break
          default:
            return 0
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
        return 0
      })

      return sorted
    } catch (error) {
      console.error('Erro ao ordenar filmes:', error)
      return films // Retornar filmes sem ordenação em caso de erro
    }
  }

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, videoFile: file })
    }
  }

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, thumbnailFile: file })
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      titleEn: '',
      titleEs: '',
      description: '',
      descriptionEn: '',
      descriptionEs: '',
      year: new Date().getFullYear(),
      duration: '00:00:00',
      category: 'Ficção',
      type: '',
      thumbnail: '',
      thumbnailFile: null,
      videoFile: null,
      videoUrl: '',
      isPublished: false,
      displayOrder: 0,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (film: any) => {
    setFormData({
      id: film.id,
      title: film.title || '',
      titleEn: film.titleEn || '',
      titleEs: film.titleEs || '',
      description: film.description || '',
      descriptionEn: film.descriptionEn || '',
      descriptionEs: film.descriptionEs || '',
      year: film.year,
      duration: film.duration,
      category: film.category,
      type: film.type || '',
      thumbnail: film.thumbnail || '',
      thumbnailFile: null, // Adicionar thumbnailFile
      videoFile: null,
      videoUrl: film.videoUrl || '',
      isPublished: film.isPublished,
      displayOrder: film.displayOrder ?? 0, // Usar ?? para tratar null corretamente
    })
    setEditingId(film.id)
    setShowForm(true)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        toast({
          title: 'Logout realizado',
          description: 'Você foi desconectado com sucesso.',
        })
        router.push('/login')
        router.refresh()
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao fazer logout',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este filme?')) return

    try {
      const response = await fetch(`/api/films/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar filme')
      }

      toast({
        title: 'Sucesso!',
        description: 'Filme deletado com sucesso!',
      })

      fetchFilms()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao deletar filme',
        variant: 'destructive',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let videoUrl = formData.videoUrl
      let videoSize = 0
      let videoFormat = ''
      let thumbnailUrl = formData.thumbnail

      // Se tem thumbnail file, fazer upload primeiro
      if (formData.thumbnailFile) {
        const thumbnailFormData = new FormData()
        thumbnailFormData.append('file', formData.thumbnailFile)
        thumbnailFormData.append('type', 'thumbnail') // Identificar que é uma thumbnail

        const thumbnailUploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: thumbnailFormData,
        })

        if (!thumbnailUploadResponse.ok) {
          const error = await thumbnailUploadResponse.json()
          throw new Error(error.message || 'Erro ao fazer upload da thumbnail')
        }

        const thumbnailUploadData = await thumbnailUploadResponse.json()
        thumbnailUrl = thumbnailUploadData.data.url
      }

      // APENAS UPLOAD - URL desabilitada temporariamente
      if (!formData.videoFile && !editingId) {
        throw new Error('Você precisa fazer upload de um vídeo')
      }

      // Upload de vídeo (obrigatório para novos filmes)
      if (formData.videoFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', formData.videoFile)
        uploadFormData.append('type', 'video') // Identificar que é um vídeo

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        })

        if (!uploadResponse.ok) {
          const error = await uploadResponse.json()
          throw new Error(error.message || 'Erro ao fazer upload do vídeo')
        }

        const uploadData = await uploadResponse.json()
        videoUrl = uploadData.data.url
        videoSize = formData.videoFile.size
        videoFormat = formData.videoFile.type.split('/')[1] || 'mp4'
      } else if (editingId) {
        // Se está editando e não tem novo vídeo, manter o atual
        const existingFilm = films.find(f => f.id === editingId)
        if (existingFilm) {
          videoUrl = existingFilm.videoUrl
          videoSize = existingFilm.videoSize || undefined
          videoFormat = existingFilm.videoFormat || undefined
        }
      }

      // Validar category antes de enviar
      const validCategories = ['Ficção', 'Drama', 'Documentário', 'Comercial']
      if (!validCategories.includes(formData.category)) {
        throw new Error(`Categoria inválida: "${formData.category}". Selecione uma categoria válida.`)
      }

      // Criar ou atualizar filme
      const filmData: any = {
        title: formData.title,
        titleEn: formData.titleEn || undefined,
        titleEs: formData.titleEs || undefined,
        description: formData.description || undefined,
        descriptionEn: formData.descriptionEn || undefined,
        descriptionEs: formData.descriptionEs || undefined,
        year: formData.year,
        duration: formData.duration,
        category: formData.category, // Já validado acima
        type: formData.type && formData.type.trim() !== '' ? formData.type : undefined,
        isPublished: formData.isPublished,
        displayOrder: formData.displayOrder,
      }

      // Sempre enviar videoUrl (obrigatório)
      filmData.videoUrl = videoUrl

      // Thumbnail - só enviar se tiver valor
      if (thumbnailUrl && thumbnailUrl.trim() !== '') {
        filmData.thumbnail = thumbnailUrl
      }

      // Sempre enviar videoUrl (obrigatório)
      filmData.videoUrl = videoUrl

      // Sempre enviar videoSize e videoFormat quando disponíveis (do upload)
      if (videoSize && videoFormat) {
        filmData.videoSize = videoSize
        filmData.videoFormat = videoFormat
      }

      const url = editingId ? `/api/films/${editingId}` : '/api/films'
      const method = editingId ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filmData),
      })

      if (!response.ok) {
        let errorMessage = 'Erro ao salvar filme'
        let errorDetails: any = null
        try {
          const error = await response.json()
          console.error('Erro da API:', error)
          errorDetails = error
          errorMessage = error.message || error.errors?.[0]?.message || `Erro ${response.status}: ${response.statusText}`
        } catch (e) {
          errorMessage = `Erro ${response.status}: ${response.statusText}`
        }
        
        // Mostrar detalhes do erro em desenvolvimento
        if (process.env.NODE_ENV === 'development' && errorDetails) {
          console.error('Detalhes do erro:', JSON.stringify(errorDetails, null, 2))
        }
        
        throw new Error(errorMessage)
      }

      toast({
        title: 'Sucesso!',
        description: editingId ? 'Filme atualizado com sucesso!' : 'Filme adicionado com sucesso!',
      })

      resetForm()
      fetchFilms()
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao salvar filme',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  // Função para salvar banner
  const handleBannerSave = async () => {
    setBannerLoading(true)
    try {
      let bannerUrlToSave = bannerUrl

      // Se tem arquivo, fazer upload
      if (bannerFile) {
        const formData = new FormData()
        formData.append('file', bannerFile)
        formData.append('type', 'banner') // Identificar que é um banner

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error('Erro ao fazer upload do banner')
        }

        const uploadData = await uploadResponse.json()
        bannerUrlToSave = uploadData.data.url
      }

      // Salvar configuração do banner
      const response = await fetch('/api/settings/banner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          bannerUrl: bannerUrlToSave,
          bannerPosition: bannerPosition,
          bannerOpacity: bannerOpacity,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar banner')
      }

      const responseData = await response.json()
      if (responseData.success) {
        setBannerUrl(bannerUrlToSave)
        setBannerFile(null)
        if (responseData.data?.bannerPosition) {
          setBannerPosition(responseData.data.bannerPosition)
        }
        if (responseData.data?.bannerOpacity !== undefined) {
          setBannerOpacity(responseData.data.bannerOpacity)
        }
        toast({
          title: 'Sucesso!',
          description: 'Banner atualizado com sucesso! Recarregue a página principal para ver as mudanças.',
        })
        // Forçar recarregamento da página principal (opcional)
        // window.open('/', '_blank')
      } else {
        throw new Error(responseData.message || 'Erro ao salvar banner')
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao salvar banner',
        variant: 'destructive',
      })
    } finally {
      setBannerLoading(false)
    }
  }

  // Converter posição de object-position para coordenadas percentuais
  const parsePosition = (position: string) => {
    // Se for formato percentual (ex: "30% 40%")
    if (position.includes('%')) {
      const parts = position.split(' ')
      const x = parseFloat(parts[0]) || 50
      const y = parseFloat(parts[1]) || 50
      return { x, y }
    }
    // Se for nome de posição
    const positions: Record<string, { x: number, y: number }> = {
      'center': { x: 50, y: 50 },
      'top': { x: 50, y: 0 },
      'bottom': { x: 50, y: 100 },
      'left': { x: 0, y: 50 },
      'right': { x: 100, y: 50 },
      'top left': { x: 0, y: 0 },
      'top right': { x: 100, y: 0 },
      'bottom left': { x: 0, y: 100 },
      'bottom right': { x: 100, y: 100 },
    }
    return positions[position] || { x: 50, y: 50 }
  }

  // Converter coordenadas percentuais para object-position
  const positionToObjectPosition = (x: number, y: number): string => {
    // Se estiver muito próximo de valores padrão, usar nomes
    if (x >= 45 && x <= 55 && y >= 45 && y <= 55) return 'center'
    if (x >= 45 && x <= 55 && y <= 10) return 'top'
    if (x >= 45 && x <= 55 && y >= 90) return 'bottom'
    if (x <= 10 && y >= 45 && y <= 55) return 'left'
    if (x >= 90 && y >= 45 && y <= 55) return 'right'
    if (x <= 10 && y <= 10) return 'top left'
    if (x >= 90 && y <= 10) return 'top right'
    if (x <= 10 && y >= 90) return 'bottom left'
    if (x >= 90 && y >= 90) return 'bottom right'
    // Caso contrário, usar percentuais
    return `${x}% ${y}%`
  }

  // Handlers para drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
    setImagePosition({ x, y })
    const newPosition = positionToObjectPosition(x, y)
    setBannerPosition(newPosition)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
    setImagePosition({ x, y })
    const newPosition = positionToObjectPosition(x, y)
    setBannerPosition(newPosition)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Função para salvar bio
  const handleBioSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setBioLoading(true)

    try {
      let profileImageUrl = profileImage

      // Se tem arquivo de foto, fazer upload primeiro (prioridade sobre URL)
      if (profileImageFile) {
        const formData = new FormData()
        formData.append('file', profileImageFile)
        formData.append('type', 'thumbnail') // Usar pasta thumbnails para fotos de perfil

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json().catch(() => ({}))
          throw new Error(errorData.message || 'Erro ao fazer upload da foto')
        }

        const uploadData = await uploadResponse.json()
        if (uploadData.success && uploadData.data?.url) {
          profileImageUrl = uploadData.data.url
        } else {
          throw new Error('Erro ao fazer upload da foto: resposta inválida')
        }
      } else if (!profileImage || profileImage.trim() === '' || profileImage === '/images/alicestamato.jpeg') {
        // Se não tem arquivo e não tem URL válida, manter a atual
        profileImageUrl = profileImage || '/images/alicestamato.jpeg'
      }

      // Salvar configuração da bio
      const response = await fetch('/api/settings/bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileImage: profileImageUrl,
          name: name.trim(),
          location: location.trim(),
          pronouns: pronouns.trim(),
          bioPt: bioPt.trim(),
          bioEn: bioEn.trim(),
          bioEs: bioEs.trim(),
          email: email.trim(),
          instagramPersonal: instagramPersonal.trim(),
          instagramLombada: instagramLombada.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar bio')
      }

      const responseData = await response.json()
      if (responseData.success) {
        setProfileImage(profileImageUrl)
        setProfileImageFile(null)
        toast({
          title: 'Sucesso!',
          description: 'Bio atualizada com sucesso! Recarregue a página principal para ver as mudanças.',
        })
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao salvar bio',
        variant: 'destructive',
      })
    } finally {
      setBioLoading(false)
    }
  }

  // Carregar configuração do banner
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch('/api/settings/banner')
        if (response.ok) {
          const data = await response.json()
          if (data.bannerUrl) {
            setBannerUrl(data.bannerUrl)
          }
          if (data.bannerPosition) {
            setBannerPosition(data.bannerPosition)
            // Converter posição para coordenadas
            const pos = parsePosition(data.bannerPosition)
            setImagePosition(pos)
          }
        }
      } catch (error) {
        // Ignorar erro, usar padrão
      }
    }
    fetchBanner()
  }, [])

  // Carregar configuração da bio
  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await fetch('/api/settings/bio')
        if (response.ok) {
          const data = await response.json()
          if (data.profileImage) setProfileImage(data.profileImage)
          if (data.name) setName(data.name)
          if (data.location) setLocation(data.location)
          if (data.pronouns) setPronouns(data.pronouns)
          if (data.bioPt !== undefined) setBioPt(data.bioPt)
          if (data.bioEn !== undefined) setBioEn(data.bioEn)
          if (data.bioEs !== undefined) setBioEs(data.bioEs)
          if (data.email) setEmail(data.email)
          if (data.instagramPersonal) setInstagramPersonal(data.instagramPersonal)
          if (data.instagramLombada) setInstagramLombada(data.instagramLombada)
        }
      } catch (error) {
        console.error('Erro ao carregar bio:', error)
      }
    }
    fetchBio()
  }, [])

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
              <Film className="h-10 w-10" />
              Painel Administrativo
            </h1>
            <p className="text-zinc-600">Gerencie seu site</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'films' | 'banner' | 'bio')} className="w-full">
          <TabsList className="mb-6 grid grid-cols-3">
            <TabsTrigger value="films" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              Filmes
            </TabsTrigger>
            <TabsTrigger value="banner" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Banner
            </TabsTrigger>
            <TabsTrigger value="bio" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Bio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="films" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-zinc-900">Gerenciar Filmes</h2>
              <Button
                onClick={() => {
                  resetForm()
                  setShowForm(!showForm)
                }}
                className="flex items-center gap-2"
              >
                {showForm ? (
                  <>
                    <X className="h-4 w-4" />
                    Cancelar
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Adicionar Filme
                  </>
                )}
              </Button>
            </div>

        {/* Lista de Filmes */}
        {!showForm && (
          <div className="mb-8">
            {loadingFilms ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
              </div>
            ) : films.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                Nenhum filme cadastrado ainda.
              </div>
            ) : (
              <>
                {/* Controles de Ordenação */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-zinc-200">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-zinc-600" />
                    <Label htmlFor="sortBy" className="text-sm font-medium text-zinc-900">
                      Ordenar por:
                    </Label>
                  </div>
                  <Select
                    value={sortBy}
                    onValueChange={(value: 'title' | 'year' | 'createdAt' | 'category' | 'displayOrder') => setSortBy(value)}
                  >
                    <SelectTrigger id="sortBy" className="w-48 text-zinc-900 bg-white border-zinc-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="displayOrder" className="text-zinc-900">Ordem de Exibição</SelectItem>
                      <SelectItem value="createdAt" className="text-zinc-900">Data de Criação</SelectItem>
                      <SelectItem value="title" className="text-zinc-900">Título</SelectItem>
                      <SelectItem value="year" className="text-zinc-900">Ano</SelectItem>
                      <SelectItem value="category" className="text-zinc-900">Categoria</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={sortOrder}
                    onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}
                  >
                    <SelectTrigger className="w-32 text-zinc-900 bg-white border-zinc-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="desc" className="text-zinc-900">Descendente</SelectItem>
                      <SelectItem value="asc" className="text-zinc-900">Ascendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4">
                  {getSortedFilms().map((film) => (
                  <div
                    key={film.id}
                    className="border border-zinc-200 rounded-lg p-4 hover:border-zinc-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                          {film.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-zinc-600 mb-2">
                          <span>Ano: {film.year}</span>
                          <span>Duração: {film.duration}</span>
                          <span>Categoria: {film.category}</span>
                          <span className="font-medium text-zinc-800">
                            Ordem: {film.displayOrder ?? 0}
                          </span>
                          <span className={film.isPublished ? 'text-green-600' : 'text-orange-600'}>
                            {film.isPublished ? 'Publicado' : 'Rascunho'}
                          </span>
                        </div>
                        {film.description && (
                          <p className="text-sm text-zinc-500 line-clamp-2">
                            {film.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(film)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(film.id)}
                          className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Deletar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </>
            )}
          </div>
        )}

            {/* Formulário */}
            {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6 border border-zinc-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-zinc-900">
                {editingId ? 'Editar Filme' : 'Adicionar Filme'}
              </h2>
            </div>

            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-zinc-900">Título (Português) *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Nome do filme"
                className="text-zinc-900"
              />
            </div>

            {/* Títulos em outros idiomas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titleEn" className="text-zinc-900">Título (Inglês)</Label>
                <Input
                  id="titleEn"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  placeholder="Movie Title"
                  className="text-zinc-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titleEs" className="text-zinc-900">Título (Espanhol)</Label>
                <Input
                  id="titleEs"
                  value={formData.titleEs}
                  onChange={(e) => setFormData({ ...formData, titleEs: e.target.value })}
                  placeholder="Título de la Película"
                  className="text-zinc-900"
                />
              </div>
            </div>

            {/* Descrições */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-zinc-900">Descrição (Português)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição do filme..."
                rows={3}
                className="text-zinc-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="descriptionEn" className="text-zinc-900">Descrição (Inglês)</Label>
                <Textarea
                  id="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  placeholder="Movie description..."
                  rows={3}
                  className="text-zinc-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionEs" className="text-zinc-900">Descrição (Espanhol)</Label>
                <Textarea
                  id="descriptionEs"
                  value={formData.descriptionEs}
                  onChange={(e) => setFormData({ ...formData, descriptionEs: e.target.value })}
                  placeholder="Descripción de la película..."
                  rows={3}
                  className="text-zinc-900"
                />
              </div>
            </div>

            {/* Ano, Duração, Categoria */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-zinc-900">Ano *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="text-zinc-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-zinc-900">Duração (HH:MM:SS) *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                  pattern="^\d{2}:\d{2}:\d{2}$"
                  placeholder="01:45:30"
                  className="text-zinc-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-zinc-900">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: any) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="text-zinc-900 bg-white border-zinc-300">
                  <SelectValue className="text-zinc-900" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ficção" className="text-zinc-900">Ficção</SelectItem>
                  <SelectItem value="Drama" className="text-zinc-900">Drama</SelectItem>
                  <SelectItem value="Documentário" className="text-zinc-900">Documentário</SelectItem>
                  <SelectItem value="Comercial" className="text-zinc-900">Comercial</SelectItem>
                </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-zinc-900">Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="text-zinc-900 bg-white border-zinc-300">
                  <SelectValue placeholder="Selecione o tipo" className="text-zinc-900" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vídeo Clipe" className="text-zinc-900">Vídeo Clipe</SelectItem>
                  <SelectItem value="Curta Metragem" className="text-zinc-900">Curta Metragem</SelectItem>
                  <SelectItem value="Longa Metragem" className="text-zinc-900">Longa Metragem</SelectItem>
                  <SelectItem value="Propaganda" className="text-zinc-900">Propaganda</SelectItem>
                  <SelectItem value="Institucional" className="text-zinc-900">Institucional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <Label htmlFor="thumbnailFile" className="text-zinc-900">Upload de Thumbnail (imagem)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="thumbnailFile"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleThumbnailFileChange}
                  className="cursor-pointer text-zinc-900 file:text-zinc-900"
                />
                {formData.thumbnailFile && (
                  <span className="text-sm text-zinc-600">
                    {(formData.thumbnailFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                )}
              </div>
              
              {/* Preview da Thumbnail */}
              {(formData.thumbnailFile || formData.thumbnail) && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-zinc-600">Preview:</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFormData({ ...formData, thumbnailFile: null, thumbnail: '' })
                        // Limpar o input file
                        const fileInput = document.getElementById('thumbnailFile') as HTMLInputElement
                        if (fileInput) fileInput.value = ''
                      }}
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Remover
                    </Button>
                  </div>
                  <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100">
                    {formData.thumbnailFile ? (
                      <img
                        src={URL.createObjectURL(formData.thumbnailFile)}
                        alt="Preview da thumbnail"
                        className="w-full h-full object-cover"
                      />
                    ) : formData.thumbnail ? (
                      <img
                        src={formData.thumbnail}
                        alt="Preview da thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-zinc-500">
                Ou forneça uma URL da thumbnail abaixo
              </p>
              <Input
                id="thumbnail"
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://exemplo.com/thumbnail.jpg (opcional se fez upload)"
                className="text-zinc-900"
              />
            </div>

            {/* Upload de Vídeo */}
            <div className="space-y-2">
              <Label htmlFor="videoFile" className="text-zinc-900">Upload de Vídeo (máx. 15GB)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="videoFile"
                  type="file"
                  accept="video/mp4,video/mov,video/quicktime,video/webm"
                  onChange={handleVideoFileChange}
                  className="cursor-pointer text-zinc-900 file:text-zinc-900"
                />
                {formData.videoFile && (
                  <span className="text-sm text-zinc-600">
                    {(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500">
                {editingId ? 'Deixe vazio para manter o vídeo atual' : 'Obrigatório para novos filmes'}
              </p>
            </div>

            {/* Ordem de Exibição */}
            <div className="space-y-2">
              <Label htmlFor="displayOrder" className="text-zinc-900">
                Ordem de Exibição no Site
              </Label>
              <Input
                id="displayOrder"
                type="number"
                value={formData.displayOrder === 0 ? '' : formData.displayOrder}
                onChange={(e) => {
                  const value = e.target.value
                  setFormData({ 
                    ...formData, 
                    displayOrder: value === '' ? 0 : parseInt(value) || 0 
                  })
                }}
                min="0"
                placeholder="Deixe vazio para aparecer por último"
                className="text-zinc-900"
              />
              <p className="text-sm text-zinc-500">
                Filmes com números <strong>maiores</strong> aparecerão primeiro no site. Deixe vazio (0) para aparecer por último.
              </p>
            </div>

            {/* Publicado */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="h-4 w-4 rounded border-zinc-300"
              />
              <Label htmlFor="isPublished" className="cursor-pointer text-zinc-900">
                Publicar imediatamente
              </Label>
            </div>

            {/* Botões */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    {editingId ? 'Atualizar Filme' : 'Adicionar Filme'}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={loading}
                size="lg"
              >
                Cancelar
              </Button>
            </div>
          </form>
            )}
          </TabsContent>

          <TabsContent value="banner" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">Editar Banner</h2>
              <p className="text-zinc-600 mb-6">Altere a imagem do banner principal do site</p>

              <div className="space-y-6 border border-zinc-200 rounded-lg p-6">
                {/* Preview do Banner Atual */}
                <div className="space-y-2">
                  <Label className="text-zinc-900">Banner Atual - Arraste para reposicionar</Label>
                  <div 
                    className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-zinc-300 bg-zinc-100 cursor-move"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{ userSelect: 'none' }}
                  >
                    {bannerFile ? (
                      <img
                        src={URL.createObjectURL(bannerFile)}
                        alt="Preview do banner"
                        className="w-full h-full object-cover pointer-events-none"
                        style={{ 
                          objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                          opacity: bannerOpacity / 100,
                        }}
                        draggable={false}
                      />
                    ) : (
                      <img
                        src={bannerUrl}
                        alt="Banner atual"
                        className="w-full h-full object-cover pointer-events-none"
                        style={{ 
                          objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                          opacity: bannerOpacity / 100,
                        }}
                        draggable={false}
                        onError={(e) => {
                          e.currentTarget.src = '/cinematic-film-production-background.jpeg'
                        }}
                      />
                    )}
                    {/* Indicador de posição */}
                    <div 
                      className="absolute w-4 h-4 rounded-full border-2 border-white bg-oklch(0.58 0.15 35) shadow-lg pointer-events-none z-10"
                      style={{ 
                        left: `${imagePosition.x}%`, 
                        top: `${imagePosition.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500">
                    Clique e arraste a imagem para reposicioná-la. Posição: {imagePosition.x.toFixed(0)}% {imagePosition.y.toFixed(0)}%
                  </p>
                </div>

                {/* Upload de Nova Imagem */}
                <div className="space-y-2">
                  <Label htmlFor="bannerFile" className="text-zinc-900">Upload de Nova Imagem</Label>
                  <Input
                    id="bannerFile"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setBannerFile(file)
                      }
                    }}
                    className="cursor-pointer text-zinc-900 file:text-zinc-900"
                  />
                  {bannerFile && (
                    <p className="text-sm text-zinc-600">
                      Arquivo selecionado: {bannerFile.name} ({(bannerFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                {/* URL do Banner */}
                <div className="space-y-2">
                  <Label htmlFor="bannerUrl" className="text-zinc-900">Ou forneça uma URL</Label>
                  <Input
                    id="bannerUrl"
                    type="url"
                    value={bannerUrl}
                    onChange={(e) => {
                      setBannerUrl(e.target.value)
                      setBannerFile(null)
                    }}
                    placeholder="https://exemplo.com/banner.jpg"
                    className="text-zinc-900"
                  />
                  <p className="text-sm text-zinc-500">
                    Se fornecer uma URL, o upload será ignorado
                  </p>
                </div>

                {/* Posicionamento do Banner - Presets Rápidos */}
                <div className="space-y-2">
                  <Label className="text-zinc-900">Presets Rápidos (ou use o arraste acima)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={bannerPosition === 'top left' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBannerPosition('top left')
                        setImagePosition({ x: 0, y: 0 })
                      }}
                    >
                      Topo Esquerda
                    </Button>
                    <Button
                      type="button"
                      variant={bannerPosition === 'top' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBannerPosition('top')
                        setImagePosition({ x: 50, y: 0 })
                      }}
                    >
                      Topo
                    </Button>
                    <Button
                      type="button"
                      variant={bannerPosition === 'top right' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBannerPosition('top right')
                        setImagePosition({ x: 100, y: 0 })
                      }}
                    >
                      Topo Direita
                    </Button>
                    <Button
                      type="button"
                      variant={bannerPosition === 'left' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBannerPosition('left')
                        setImagePosition({ x: 0, y: 50 })
                      }}
                    >
                      Esquerda
                    </Button>
                    <Button
                      type="button"
                      variant={bannerPosition === 'center' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBannerPosition('center')
                        setImagePosition({ x: 50, y: 50 })
                      }}
                    >
                      Centro
                    </Button>
                    <Button
                      type="button"
                      variant={bannerPosition === 'right' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBannerPosition('right')
                        setImagePosition({ x: 100, y: 50 })
                      }}
                    >
                      Direita
                    </Button>
                    <Button
                      type="button"
                      variant={bannerPosition === 'bottom left' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBannerPosition('bottom left')
                        setImagePosition({ x: 0, y: 100 })
                      }}
                    >
                      Inferior Esquerda
                    </Button>
                    <Button
                      type="button"
                      variant={bannerPosition === 'bottom' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBannerPosition('bottom')
                        setImagePosition({ x: 50, y: 100 })
                      }}
                    >
                      Inferior
                    </Button>
                    <Button
                      type="button"
                      variant={bannerPosition === 'bottom right' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBannerPosition('bottom right')
                        setImagePosition({ x: 100, y: 100 })
                      }}
                    >
                      Inferior Direita
                    </Button>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2">
                    Posição atual: <strong>{bannerPosition}</strong> ({imagePosition.x.toFixed(0)}%, {imagePosition.y.toFixed(0)}%)
                  </p>
                </div>

                {/* Controle de Opacidade */}
                <div className="space-y-2">
                  <Label htmlFor="bannerOpacity" className="text-zinc-900">
                    Opacidade do Banner: {bannerOpacity}%
                  </Label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      id="bannerOpacity"
                      min="0"
                      max="100"
                      value={bannerOpacity}
                      onChange={(e) => setBannerOpacity(Number(e.target.value))}
                      className="flex-1 h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-oklch(0.58 0.15 35)"
                    />
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={bannerOpacity}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        if (value >= 0 && value <= 100) {
                          setBannerOpacity(value)
                        }
                      }}
                      className="w-20 text-zinc-900 text-center"
                    />
                  </div>
                  <p className="text-xs text-zinc-500">
                    Ajuste a opacidade do banner (0% = transparente, 100% = totalmente opaco)
                  </p>
                  {/* Preview da opacidade no banner */}
                  <div className="mt-2">
                    <div className="relative w-full h-32 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100">
                      {bannerFile ? (
                        <img
                          src={URL.createObjectURL(bannerFile)}
                          alt="Preview opacidade"
                          className="w-full h-full object-cover"
                          style={{ 
                            objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                            opacity: bannerOpacity / 100,
                          }}
                        />
                      ) : (
                        <img
                          src={bannerUrl}
                          alt="Preview opacidade"
                          className="w-full h-full object-cover"
                          style={{ 
                            objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                            opacity: bannerOpacity / 100,
                          }}
                          onError={(e) => {
                            e.currentTarget.src = '/cinematic-film-production-background.jpeg'
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleBannerSave}
                    disabled={bannerLoading}
                    className="flex-1"
                    size="lg"
                  >
                    {bannerLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Salvar Banner
                      </>
                    )}
                  </Button>
                  {bannerFile && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setBannerFile(null)
                        const fileInput = document.getElementById('bannerFile') as HTMLInputElement
                        if (fileInput) fileInput.value = ''
                      }}
                      size="lg"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bio" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">Ajustar Bio</h2>
              <p className="text-zinc-600 mb-6">Edite as informações do perfil que aparecem na página principal</p>

              <form onSubmit={handleBioSave} className="space-y-6 border border-zinc-200 rounded-lg p-6">
                {/* Foto do Perfil */}
                <div className="space-y-2">
                  <Label htmlFor="profileImageFile" className="text-zinc-900">Foto do Perfil</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="profileImageFile"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setProfileImageFile(file)
                        }
                      }}
                      className="cursor-pointer text-zinc-900 file:text-zinc-900"
                    />
                    {profileImageFile && (
                      <span className="text-sm text-zinc-600">
                        {(profileImageFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    )}
                  </div>
                  
                  {/* Preview da Foto */}
                  {(profileImageFile || profileImage) && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-zinc-600">Preview:</p>
                        {profileImageFile && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setProfileImageFile(null)
                              const fileInput = document.getElementById('profileImageFile') as HTMLInputElement
                              if (fileInput) fileInput.value = ''
                            }}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Remover
                          </Button>
                        )}
                      </div>
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border border-zinc-200 bg-zinc-100">
                        {profileImageFile ? (
                          <img
                            src={URL.createObjectURL(profileImageFile)}
                            alt="Preview da foto"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={profileImage}
                            alt="Preview da foto"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/alicestamato.jpeg'
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-sm text-zinc-500">
                    Ou forneça uma URL da foto abaixo {profileImageFile && '(o arquivo acima terá prioridade)'}
                  </p>
                  <Input
                    id="profileImage"
                    type="url"
                    value={profileImage}
                    onChange={(e) => {
                      setProfileImage(e.target.value)
                      // Limpar arquivo selecionado quando URL é fornecida
                      setProfileImageFile(null)
                      const fileInput = document.getElementById('profileImageFile') as HTMLInputElement
                      if (fileInput) fileInput.value = ''
                    }}
                    placeholder="https://exemplo.com/foto.jpg"
                    className={`text-zinc-900 ${profileImageFile ? 'opacity-50' : ''}`}
                    disabled={!!profileImageFile}
                  />
                  {profileImageFile && (
                    <p className="text-xs text-amber-600 mt-1">
                      ⚠️ O arquivo selecionado será usado. A URL será ignorada.
                    </p>
                  )}
                </div>

                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-900">Nome *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Nome completo"
                    className="text-zinc-900"
                  />
                </div>

                {/* Localização */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-zinc-900">Localização *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    placeholder="São Paulo, SP, Brasil"
                    className="text-zinc-900"
                  />
                </div>

                {/* Pronomes */}
                <div className="space-y-2">
                  <Label htmlFor="pronouns" className="text-zinc-900">Pronomes</Label>
                  <Input
                    id="pronouns"
                    value={pronouns}
                    onChange={(e) => setPronouns(e.target.value)}
                    placeholder="she/her"
                    className="text-zinc-900"
                  />
                </div>

                {/* Bio em Português */}
                <div className="space-y-2">
                  <Label htmlFor="bioPt" className="text-zinc-900">
                    Biografia (Português) <span className="text-zinc-500 font-normal">(Recomendado)</span>
                  </Label>
                  <Textarea
                    id="bioPt"
                    value={bioPt}
                    onChange={(e) => setBioPt(e.target.value)}
                    placeholder="Texto da biografia em português..."
                    rows={6}
                    className="text-zinc-900"
                  />
                  <p className="text-xs text-zinc-500">
                    ✅ Se preencher apenas este campo, os outros idiomas usarão as traduções padrão automaticamente
                  </p>
                </div>

                {/* Bio em Inglês */}
                <div className="space-y-2">
                  <Label htmlFor="bioEn" className="text-zinc-900">
                    Biografia (Inglês) <span className="text-zinc-500 font-normal">(Opcional)</span>
                  </Label>
                  <Textarea
                    id="bioEn"
                    value={bioEn}
                    onChange={(e) => setBioEn(e.target.value)}
                    placeholder="Biography text in English..."
                    rows={6}
                    className="text-zinc-900"
                  />
                  <p className="text-xs text-zinc-500">
                    Deixe vazio para usar a tradução padrão em inglês
                  </p>
                </div>

                {/* Bio em Espanhol */}
                <div className="space-y-2">
                  <Label htmlFor="bioEs" className="text-zinc-900">
                    Biografia (Espanhol) <span className="text-zinc-500 font-normal">(Opcional)</span>
                  </Label>
                  <Textarea
                    id="bioEs"
                    value={bioEs}
                    onChange={(e) => setBioEs(e.target.value)}
                    placeholder="Texto de la biografía en español..."
                    rows={6}
                    className="text-zinc-900"
                  />
                  <p className="text-xs text-zinc-500">
                    Deixe vazio para usar a tradução padrão em espanhol
                  </p>
                </div>

                {/* E-mail */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-900">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="alicestamato@gmail.com"
                    className="text-zinc-900"
                  />
                </div>

                {/* Instagram Pessoal */}
                <div className="space-y-2">
                  <Label htmlFor="instagramPersonal" className="text-zinc-900">Instagram Pessoal</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-600">@</span>
                    <Input
                      id="instagramPersonal"
                      value={instagramPersonal}
                      onChange={(e) => setInstagramPersonal(e.target.value.replace('@', ''))}
                      placeholder="alicestamato"
                      className="text-zinc-900"
                    />
                  </div>
                </div>

                {/* Instagram Lombada */}
                <div className="space-y-2">
                  <Label htmlFor="instagramLombada" className="text-zinc-900">Instagram Lombada Filmes</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-600">@</span>
                    <Input
                      id="instagramLombada"
                      value={instagramLombada}
                      onChange={(e) => setInstagramLombada(e.target.value.replace('@', ''))}
                      placeholder="lombadafilmes"
                      className="text-zinc-900"
                    />
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={bioLoading}
                    className="flex-1"
                    size="lg"
                  >
                    {bioLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Salvar Bio
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
