'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Upload, Film, Edit, Trash2, Plus, X, XCircle, ArrowUpDown, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
              <Film className="h-10 w-10" />
              Gerenciar Filmes
            </h1>
            <p className="text-zinc-600">Gerencie seus filmes e vídeos</p>
          </div>
          <div className="flex items-center gap-2">
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
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
          </div>
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
      </div>
    </div>
  )
}
