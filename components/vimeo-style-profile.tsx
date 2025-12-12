"use client"

import Image from "next/image"
import { Mail, MapPin, Film, Loader2, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useI18n } from "@/lib/i18n/context"
import { LanguageSelector } from "@/components/language-selector"
import { Footer } from "@/components/footer"
import { useFilms } from "@/lib/hooks/use-films"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export function VimeoStyleProfile() {
  const [showAll, setShowAll] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedFilmInfo, setSelectedFilmInfo] = useState<string | null>(null) // ID do filme para mostrar informações
  const [bannerUrl, setBannerUrl] = useState<string | null>(null) // Iniciar como null para evitar flash
  const [bannerPosition, setBannerPosition] = useState<string>('center')
  const [bannerOpacity, setBannerOpacity] = useState<number>(90) // Opacidade em percentual (0-100)
  const [bannerLoading, setBannerLoading] = useState<boolean>(true) // Estado de loading do banner
  const [profileImage, setProfileImage] = useState<string>('/images/alicestamato.jpeg')
  const [name, setName] = useState<string>('Alice Stamato')
  const [location, setLocation] = useState<string>('São Paulo, SP, Brasil')
  const [pronouns, setPronouns] = useState<string>('she/her')
  const [bioPt, setBioPt] = useState<string>('')
  const [bioEn, setBioEn] = useState<string>('')
  const [bioEs, setBioEs] = useState<string>('')
  const [email, setEmail] = useState<string>('alicestamato@gmail.com')
  const [instagramPersonal, setInstagramPersonal] = useState<string>('alicestamato')
  const [instagramLombada, setInstagramLombada] = useState<string>('lombadafilmes')
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [messageLoading, setMessageLoading] = useState(false)
  const [messageErrors, setMessageErrors] = useState<Record<string, string>>({})
  const { t, language } = useI18n()
  const { films, loading, error } = useFilms(true) // Buscar apenas filmes publicados
  const { toast } = useToast()
  
  // Funções helper para traduzir categorias e tipos
  const translateCategory = (category: string): string => {
    if (t.vimeoProfile.categories && category in t.vimeoProfile.categories) {
      return (t.vimeoProfile.categories as any)[category] || category
    }
    return category
  }
  
  const translateType = (type: string): string => {
    if (t.vimeoProfile.types && type in t.vimeoProfile.types) {
      return (t.vimeoProfile.types as any)[type] || type
    }
    return type
  }

  // Carregar banner configurável
  useEffect(() => {
    let isMounted = true // Flag para evitar atualizações se componente foi desmontado
    
    const fetchBanner = async () => {
      try {
        if (isMounted) {
          setBannerLoading(true)
        }
        // Adicionar timestamp para evitar cache
        const response = await fetch(`/api/settings/banner?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        })
        
        if (!isMounted) return // Não atualizar se componente foi desmontado
        
        if (response.ok) {
          const data = await response.json()
          if (data.bannerUrl) {
            // Preload da imagem antes de atualizar o estado (usar HTMLImageElement nativo)
            const img = document.createElement('img')
            img.onload = () => {
              if (isMounted) {
                setBannerUrl(data.bannerUrl)
                setBannerLoading(false)
              }
            }
            img.onerror = () => {
              if (isMounted) {
                setBannerUrl('/cinematic-film-production-background.jpeg')
                setBannerLoading(false)
              }
            }
            img.src = data.bannerUrl
            
            if (data.bannerPosition) {
              setBannerPosition(data.bannerPosition)
            }
            if (data.bannerOpacity !== undefined) {
              setBannerOpacity(data.bannerOpacity)
            }
          } else {
            // Fallback apenas se não houver URL configurada
            if (isMounted) {
              setBannerUrl('/cinematic-film-production-background.jpeg')
              setBannerLoading(false)
            }
          }
        } else {
          // Fallback em caso de erro
          if (isMounted) {
            setBannerUrl('/cinematic-film-production-background.jpeg')
            setBannerLoading(false)
          }
        }
      } catch (error) {
        // Fallback em caso de erro
        if (isMounted) {
          console.error('Erro ao carregar banner:', error)
          setBannerUrl('/cinematic-film-production-background.jpeg')
          setBannerLoading(false)
        }
      }
    }
    
    // Carregar imediatamente
    fetchBanner()
    
    // Recarregar a cada 5 segundos para pegar atualizações (sem mostrar loading)
    const interval = setInterval(() => {
      if (isMounted) {
        fetch(`/api/settings/banner?t=${Date.now()}`, {
          cache: 'no-store',
        })
          .then(res => res.json())
          .then(data => {
            if (isMounted && data.bannerUrl && data.bannerUrl !== bannerUrl) {
              // Só atualizar se a URL mudou (usar HTMLImageElement nativo)
              const img = document.createElement('img')
              img.onload = () => {
                if (isMounted) {
                  setBannerUrl(data.bannerUrl)
                }
              }
              img.src = data.bannerUrl
              
              if (data.bannerPosition) setBannerPosition(data.bannerPosition)
              if (data.bannerOpacity !== undefined) setBannerOpacity(data.bannerOpacity)
            }
          })
          .catch(() => {
            // Ignorar erros no intervalo
          })
      }
    }, 5000)
    
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Carregar dados da bio
  useEffect(() => {
    const fetchBio = async () => {
      try {
        // Adicionar timestamp para evitar cache
        const response = await fetch(`/api/settings/bio?t=${Date.now()}`, { cache: 'no-store' })
        if (response.ok) {
          const data = await response.json()
          if (data.profileImage) setProfileImage(data.profileImage)
          if (data.name) setName(data.name)
          if (data.location) setLocation(data.location)
          if (data.pronouns) setPronouns(data.pronouns)
          // Só atualizar se não for string vazia (strings vazias significam "usar tradução padrão")
          if (data.bioPt !== undefined && data.bioPt !== null) setBioPt(data.bioPt || '')
          if (data.bioEn !== undefined && data.bioEn !== null) setBioEn(data.bioEn || '')
          if (data.bioEs !== undefined && data.bioEs !== null) setBioEs(data.bioEs || '')
          if (data.email) setEmail(data.email)
          if (data.instagramPersonal) setInstagramPersonal(data.instagramPersonal)
          if (data.instagramLombada) setInstagramLombada(data.instagramLombada)
        }
      } catch (error) {
        console.error('Erro ao carregar bio:', error)
      }
    }
    fetchBio()
    
    // Recarregar a cada 5 segundos para pegar atualizações
    const interval = setInterval(fetchBio, 5000)
    return () => clearInterval(interval)
  }, [])
  
  // Debug: Log quando idioma ou bio mudar
  useEffect(() => {
    const customBio = language === 'pt' ? bioPt : language === 'en' ? bioEn : bioEs
    const hasCustomBio = customBio && typeof customBio === 'string' && customBio.trim() !== ''
    console.log('Bio debug:', {
      language,
      bioPt: bioPt ? bioPt.substring(0, 50) + '...' : 'vazia',
      bioEn: bioEn ? bioEn.substring(0, 50) + '...' : 'vazia',
      bioEs: bioEs ? bioEs.substring(0, 50) + '...' : 'vazia',
      customBio: customBio ? customBio.substring(0, 50) + '...' : 'vazia',
      hasCustomBio,
      usingDefault: !hasCustomBio
    })
  }, [language, bioPt, bioEn, bioEs])
  
  // Função para enviar mensagem
  const handleSendMessage = async () => {
    // Limpar erros anteriores
    setMessageErrors({})
    
    // Validação básica
    const errors: Record<string, string> = {}
    
    if (!messageForm.name.trim() || messageForm.name.trim().length < 2) {
      errors.name = 'Nome deve ter pelo menos 2 caracteres'
    }
    
    if (!messageForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(messageForm.email)) {
      errors.email = 'Email inválido'
    }
    
    if (!messageForm.subject.trim() || messageForm.subject.trim().length < 3) {
      errors.subject = 'Assunto deve ter pelo menos 3 caracteres'
    }
    
    if (!messageForm.message.trim() || messageForm.message.trim().length < 10) {
      errors.message = 'Mensagem deve ter pelo menos 10 caracteres'
    }
    
    if (Object.keys(errors).length > 0) {
      setMessageErrors(errors)
      return
    }
    
    setMessageLoading(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageForm),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        toast({
          title: 'Mensagem enviada!',
          description: data.message || 'Sua mensagem foi enviada com sucesso.',
        })
        
        // Limpar formulário e fechar modal
        setMessageForm({ name: '', email: '', subject: '', message: '' })
        setShowMessageModal(false)
        setMessageErrors({})
      } else {
        toast({
          title: 'Erro ao enviar',
          description: data.message || 'Ocorreu um erro ao enviar sua mensagem.',
          variant: 'destructive',
        })
        
        if (data.errors) {
          setMessageErrors(data.errors.reduce((acc: Record<string, string>, err: any) => {
            if (err.path && err.path.length > 0) {
              acc[err.path[0]] = err.message
            }
            return acc
          }, {}))
        }
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast({
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setMessageLoading(false)
    }
  }
  
  // Debug em desenvolvimento e produção
  useEffect(() => {
    console.log('Films state:', { 
      films, 
      loading, 
      error, 
      count: films?.length || 0,
      isArray: Array.isArray(films),
      firstFilm: films?.[0]
    })
  }, [films, loading, error])
  
  // Converter filmes do banco para o formato esperado
  const videosFromDb = Array.isArray(films) && films.length > 0 ? films.map((film) => ({
    id: film.id,
    title: film.title,
    thumbnail: film.thumbnail || "/placeholder.svg",
    duration: film.duration,
    views: film.views.toString(),
    link: film.videoUrl,
    vimeoId: film.id,
    year: film.year,
    category: film.category,
    type: film.type || undefined,
  })) : []
  
  // Usar apenas filmes do banco (sem fallback para mock)
  const allVideosToDisplay = videosFromDb
  const displayedVideos = showAll ? allVideosToDisplay : allVideosToDisplay.slice(0, 4)
  
  // Log adicional para debug
  useEffect(() => {
    console.log('Videos to display:', {
      allVideosToDisplay: allVideosToDisplay.length,
      displayedVideos: displayedVideos.length,
      showAll
    })
  }, [allVideosToDisplay.length, displayedVideos.length, showAll])

  return (
    <div className="min-h-screen bg-white text-zinc-900 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            {/* Gradientes terracotta */}
            <linearGradient id="terracottaGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="oklch(0.65 0.18 30)" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="terracottaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="oklch(0.52 0.12 45)" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="terracottaGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.65 0.18 30)" stopOpacity="0.7" />
              <stop offset="50%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.52 0.12 45)" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* ========== LINHAS ARTÍSTICAS ASSIMÉTRICAS ========== */}
          
          {/* Linha orgânica superior - trajetória livre e assimétrica */}
          <path
            d="M 3% 10% Q 12% 8%, 22% 12% Q 35% 15%, 48% 11% Q 62% 9%, 75% 13% Q 82% 16%, 88% 14%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Linha orgânica meio - curva assimétrica pronunciada */}
          <path
            d="M 5% 48% Q 18% 42%, 28% 50% Q 42% 58%, 55% 52% Q 68% 46%, 80% 51% Q 88% 55%, 92% 50%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Linha orgânica inferior - trajetória livre */}
          <path
            d="M 8% 90% Q 25% 82%, 38% 88% Q 52% 92%, 65% 86% Q 78% 80%, 85% 88%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Linha vertical orgânica direita - não reta */}
          <path
            d="M 90% 15% Q 92% 28%, 89% 38% Q 91% 48%, 88% 58% Q 90% 65%, 87% 70%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* ========== ESPIRAIS ORGÂNICAS ========== */}
          
          {/* Espiral orgânica esquerda - assimétrica */}
          <path
            d="M 11% 24% Q 9% 22%, 7% 24% Q 6% 27%, 9% 29% Q 12% 31%, 11% 34% Q 9% 37%, 7% 35% Q 6% 32%, 8% 30%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
            className="animate-spiral"
          />

          {/* Espiral orgânica direita - trajetória livre */}
          <path
            d="M 86% 44% Q 84% 42%, 82% 44% Q 81% 47%, 83% 49% Q 85% 51%, 87% 53% Q 86% 55%, 84% 53% Q 82% 51%, 83% 49%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
            className="animate-spiral"
          />

          {/* Espiral orgânica meio - não quadrada */}
          <path
            d="M 49% 34% Q 51% 32%, 53% 34% Q 54% 36%, 52% 38% Q 50% 40%, 48% 38% Q 47% 36%, 49% 34%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
            className="animate-spiral"
          />

          {/* ========== CURVAS ARTÍSTICAS ASSIMÉTRICAS ========== */}
          
          {/* Curva orgânica diagonal - trajetória livre */}
          <path
            d="M 10% 22% Q 25% 18%, 38% 25% Q 52% 32%, 65% 28% Q 75% 24%, 82% 30%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Curva em S assimétrica pronunciada */}
          <path
            d="M 15% 32% Q 28% 26%, 42% 33% Q 55% 40%, 48% 45% Q 35% 50%, 22% 43%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Curva orgânica longa - múltiplas variações */}
          <path
            d="M 8% 78% Q 22% 68%, 35% 72% Q 48% 78%, 58% 74% Q 68% 70%, 78% 76% Q 85% 80%, 90% 75%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />

          {/* Curva vertical orgânica esquerda */}
          <path
            d="M 12% 28% Q 10% 38%, 13% 48% Q 11% 58%, 14% 68% Q 12% 75%, 15% 82%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Curva em espiral orgânica */}
          <path
            d="M 70% 18% Q 75% 22%, 72% 28% Q 68% 32%, 74% 36% Q 78% 40%, 72% 44%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Curva assimétrica ascendente */}
          <path
            d="M 55% 38% Q 65% 32%, 75% 36% Q 82% 42%, 88% 38% Q 85% 32%, 80% 30%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Curva orgânica inferior esquerda */}
          <path
            d="M 4% 65% Q 15% 72%, 25% 68% Q 35% 64%, 42% 70%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Curva em arco assimétrico */}
          <path
            d="M 30% 6% Q 42% 3%, 55% 7% Q 65% 12%, 58% 18% Q 48% 15%, 38% 12%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* ========== LINHAS ORGÂNICAS ADICIONAIS ========== */}
          
          {/* Linha orgânica sinuosa - trajetória livre */}
          <path
            d="M 18% 15% Q 28% 12%, 38% 16% Q 48% 20%, 42% 25% Q 32% 22%, 22% 18%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Linha orgânica longa horizontal - múltiplas curvas */}
          <path
            d="M 2% 28% Q 12% 24%, 22% 28% Q 32% 32%, 28% 36% Q 18% 34%, 8% 30% Q 15% 26%, 25% 30% Q 38% 34%, 48% 30% Q 58% 26%, 68% 30%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Linha orgânica ascendente - curva pronunciada */}
          <path
            d="M 6% 42% Q 18% 36%, 28% 42% Q 38% 48%, 32% 52% Q 22% 50%, 12% 46%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Linha orgânica em arco assimétrico */}
          <path
            d="M 72% 8% Q 82% 4%, 92% 9% Q 88% 16%, 78% 14% Q 68% 12%, 75% 10%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.7"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />

          {/* Linha orgânica descendente - trajetória livre */}
          <path
            d="M 78% 26% Q 85% 32%, 88% 38% Q 82% 44%, 75% 48% Q 68% 44%, 72% 38%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Linha orgânica vertical - não reta */}
          <path
            d="M 14% 35% Q 12% 45%, 15% 55% Q 13% 65%, 16% 75% Q 14% 82%, 17% 88%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Linha orgânica em onda assimétrica */}
          <path
            d="M 22% 85% Q 32% 80%, 42% 85% Q 52% 90%, 48% 95% Q 38% 92%, 28% 88% Q 35% 83%, 45% 88% Q 58% 93%, 68% 88% Q 78% 83%, 85% 88%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Linha orgânica diagonal - trajetória livre */}
          <path
            d="M 42% 12% Q 52% 20%, 62% 25% Q 72% 32%, 68% 38% Q 58% 35%, 48% 28%"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />

          {/* Linha orgânica em loop assimétrico */}
          <path
            d="M 52% 58% Q 48% 64%, 52% 70% Q 58% 75%, 64% 70% Q 68% 64%, 62% 60% Q 56% 56%, 52% 58%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* ========== LINHAS QUEBRADAS ORGÂNICAS ========== */}
          
          {/* Linha quebrada orgânica superior - assimétrica */}
          <path
            d="M 28% 20% L 32% 18% L 35% 22% L 38% 19% L 41% 23% L 44% 20%"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Linha quebrada orgânica meio - trajetória livre */}
          <path
            d="M 68% 58% L 72% 56% L 75% 60% L 78% 57% L 81% 61% L 84% 58%"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />


          {/* ========== LINHAS VERTICAIS SUTIS ========== */}
          
          {/* Linha vertical 5% */}
          <line
            x1="5%"
            y1="0%"
            x2="5%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 10% */}
          <line
            x1="10%"
            y1="0%"
            x2="10%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 15% */}
          <line
            x1="15%"
            y1="0%"
            x2="15%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 20% */}
          <line
            x1="20%"
            y1="0%"
            x2="20%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 25% */}
          <line
            x1="25%"
            y1="0%"
            x2="25%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 30% */}
          <line
            x1="30%"
            y1="0%"
            x2="30%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 35% */}
          <line
            x1="35%"
            y1="0%"
            x2="35%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 40% */}
          <line
            x1="40%"
            y1="0%"
            x2="40%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 45% */}
          <line
            x1="45%"
            y1="0%"
            x2="45%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 50% */}
          <line
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 55% */}
          <line
            x1="55%"
            y1="0%"
            x2="55%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 60% */}
          <line
            x1="60%"
            y1="0%"
            x2="60%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 65% */}
          <line
            x1="65%"
            y1="0%"
            x2="65%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 70% */}
          <line
            x1="70%"
            y1="0%"
            x2="70%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 75% */}
          <line
            x1="75%"
            y1="0%"
            x2="75%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 80% */}
          <line
            x1="80%"
            y1="0%"
            x2="80%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 85% */}
          <line
            x1="85%"
            y1="0%"
            x2="85%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 90% */}
          <line
            x1="90%"
            y1="0%"
            x2="90%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />

          {/* Linha vertical 95% */}
          <line
            x1="95%"
            y1="0%"
            x2="95%"
            y2="100%"
            stroke="oklch(0.85 0 0)"
            strokeWidth="0.1"
            opacity="0.1"
          />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-zinc-200" style={{ backgroundColor: 'oklch(0.99 0.01 35)' }}>
          <div className="mx-auto flex h-14 sm:h-16 max-w-[1800px] items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl font-bold">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                <img
                  src="/peixeheader.png"
                  alt="Alice Stamato"
                  width={40}
                  height={40}
                  className="object-contain"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <span className="truncate">{name}</span>
            </div>
            <LanguageSelector />
          </div>
        </header>

        {/* Hero Banner */}
        <div className="relative h-[200px] sm:h-[240px] lg:h-[280px] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
            {bannerLoading ? (
              // Skeleton enquanto carrega (evita flash da imagem antiga)
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 animate-pulse" />
            ) : bannerUrl ? (
              <Image
                key={bannerUrl} // Key para forçar re-render quando URL mudar
                src={bannerUrl}
                alt="Banner"
                fill
                className="object-cover"
                style={{ 
                  objectPosition: bannerPosition,
                  opacity: bannerOpacity / 100, // Converter percentual para decimal (0-1)
                }}
                sizes="100vw"
                priority
                onError={(e) => {
                  e.currentTarget.src = '/cinematic-film-production-background.jpeg'
                }}
              />
            ) : (
              // Fallback se não houver URL
          <Image
                src="/cinematic-film-production-background.jpeg"
            alt="Banner"
            fill
                className="object-cover"
                style={{ 
                  objectPosition: bannerPosition,
                  opacity: bannerOpacity / 100,
                }}
                sizes="100vw"
                priority
              />
            )}
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 py-6 lg:py-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-[280px] lg:flex-shrink-0">
              <div className="lg:sticky lg:top-8 rounded-lg bg-zinc-50 p-4 sm:p-6 text-zinc-900 border border-zinc-200">
                {/* Profile Image */}
                <div className="mb-4 overflow-hidden rounded-full mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-full lg:h-auto">
                  <Image
                    src={profileImage}
                    alt={`${name} - Diretora de Cinema e Roteirista`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 200px"
                    onError={(e) => {
                      e.currentTarget.src = '/images/alicestamato.jpeg'
                    }}
                  />
                </div>

                {/* Name */}
                <h1 className="mb-1 text-xl sm:text-2xl font-bold text-center lg:text-left">{name}</h1>

                {/* Location */}
                <div className="mb-3 flex items-center justify-center lg:justify-start gap-2 text-sm text-zinc-600">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>

                {/* Pronouns */}
                {pronouns && (
                  <div className="mb-4 text-sm text-zinc-600 text-center lg:text-left">{pronouns}</div>
                )}

                {/* Bio */}
                <div key={`bio-${language}`} className="mb-4 text-xs sm:text-sm leading-relaxed text-zinc-700 text-center lg:text-left">
                  {(() => {
                    // Usar bio customizada se disponível, senão usar tradução padrão
                    // Verificar se há bio customizada para o idioma atual
                    const customBio = language === 'pt' ? bioPt : language === 'en' ? bioEn : bioEs
                    const hasCustomBio = customBio && typeof customBio === 'string' && customBio.trim() !== ''
                    
                    if (hasCustomBio) {
                      // Se tem bio customizada, usar ela
                      const bioLines = customBio.split('\n').filter((line: string) => line.trim() !== '')
                      return showFullBio ? (
                        <>
                          {bioLines.map((line: string, index: number) => (
                            <p key={index} className="mb-2">{line}</p>
                          ))}
                          <button 
                            onClick={() => setShowFullBio(false)}
                            className="font-medium text-zinc-900 hover:underline mt-2"
                          >
                            {language === 'pt' ? 'Ler menos' : language === 'en' ? 'Read less' : 'Leer menos'}
                          </button>
                        </>
                      ) : (
                        <>
                          <p>
                            {bioLines[0]}{" "}
                            {bioLines.length > 1 && (
                              <button 
                                onClick={() => setShowFullBio(true)}
                                className="font-medium text-zinc-900 hover:underline"
                              >
                                {t.vimeoProfile.readMore}
                              </button>
                            )}
                          </p>
                        </>
                      )
                    } else {
                      // Usar tradução padrão do arquivo de traduções
                      const defaultBio = `${t.about.bio1} ${t.about.bio2} ${t.about.bio3}`
                      const fullDefaultBio = `${defaultBio}\n${t.about.bio4}\n${t.about.bio5}`
                      const bioLines = fullDefaultBio.split('\n').filter((line: string) => line.trim() !== '')
                      
                      return showFullBio ? (
                        <>
                          <p className="mb-2">{t.about.bio1} <span className="font-medium text-zinc-900">{t.about.bio2}</span> {t.about.bio3}</p>
                          <p className="mb-2">{t.about.bio4}</p>
                          <p className="mb-2">{t.about.bio5}</p>
                          <button 
                            onClick={() => setShowFullBio(false)}
                            className="font-medium text-zinc-900 hover:underline mt-2"
                          >
                            {language === 'pt' ? 'Ler menos' : language === 'en' ? 'Read less' : 'Leer menos'}
                          </button>
                        </>
                      ) : (
                        <>
                          <p>
                            {t.about.bio1} <span className="font-medium text-zinc-900">{t.about.bio2}</span> {t.about.bio3}{" "}
                            <button 
                              onClick={() => setShowFullBio(true)}
                              className="font-medium text-zinc-900 hover:underline"
                            >
                              {t.vimeoProfile.readMore}
                            </button>
                          </p>
                        </>
                      )
                    }
                  })()}
                </div>

                {/* Email */}
                <div className="mb-3 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm">
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-600 flex-shrink-0" />
                  <a href={`mailto:${email}`} className="hover:underline break-all text-center lg:text-left">
                    {email}
                  </a>
                </div>

                {/* Social Links */}
                <div className="mb-4 space-y-2 text-xs sm:text-sm flex flex-col items-center lg:items-start">
                  {instagramPersonal && (
                  <div className="flex items-center gap-2">
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.259.014-3.668.072-4.948.2-4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <a
                        href={`https://instagram.com/${instagramPersonal}`}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        @{instagramPersonal}
                    </a>
                  </div>
                  )}
                  {instagramLombada && (
                  <div className="flex items-center gap-2">
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <a
                        href={`https://instagram.com/${instagramLombada}`}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        @{instagramLombada}
                    </a>
                  </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-zinc-300 text-zinc-900 hover:bg-zinc-100 bg-transparent hidden"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {t.vimeoProfile.follow}
                  </Button>
                  <Button 
                    onClick={() => setShowMessageModal(true)}
                    className="w-full justify-center lg:justify-start gap-2 bg-emerald-600 text-white hover:bg-emerald-700 text-sm sm:text-base py-2.5 sm:py-2"
                  >
                    <Mail className="h-4 w-4" />
                    {t.vimeoProfile.message}
                  </Button>
                </div>

                {/* Activity Stats */}
                <div className="mt-6 border-t border-zinc-200 pt-6 hidden">
                  <h3 className="mb-3 text-sm font-semibold">{t.vimeoProfile.activity}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">{t.vimeoProfile.showcases}</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">{t.vimeoProfile.followers}</span>
                      <span className="font-medium">10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">{t.vimeoProfile.following}</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">{t.vimeoProfile.collections}</span>
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Video Grid */}
            <main className="flex-1 w-full">
              <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-800">{t.vimeoProfile.portfolio}</h2>
                  <div className="h-0.5 mt-2 bg-accent" style={{ width: '100%', maxWidth: '200px' }}></div>
                </div>
                {!loading && allVideosToDisplay.length > 0 && (
                  <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-oklch(0.96 0.02 35) text-oklch(0.55 0.12 35) border border-oklch(0.90 0.04 35) self-start sm:self-auto">
                    {allVideosToDisplay.length} {allVideosToDisplay.length === 1 ? 'filme' : 'filmes'}
                  </span>
                )}
              </div>

              {/* Loading State */}
              {loading && (
              <div className="space-y-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-video w-full rounded-lg bg-zinc-200 mb-3" />
                      <div className="h-6 w-3/4 rounded bg-zinc-200 mb-2" />
                      <div className="flex gap-2">
                        <div className="h-6 w-16 rounded-full bg-zinc-200" />
                        <div className="h-6 w-20 rounded-full bg-zinc-200" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && allVideosToDisplay.length === 0 && (
                <div className="text-center py-12">
                  <Film className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                  <p className="text-zinc-500 text-lg">Nenhum filme publicado ainda.</p>
                </div>
              )}

              {/* Videos List */}
              {!loading && allVideosToDisplay.length > 0 && (
                <div className="space-y-6 sm:space-y-8">
                {displayedVideos.map((video) => (
                  <div key={video.id} className="group">
                    <div className="block w-full text-left">
                      {/* Video Thumbnail */}
                      <div 
                        onClick={() => setSelectedVideo(video.link)}
                        className="relative mb-2 sm:mb-3 aspect-video overflow-hidden rounded-lg sm:rounded bg-gradient-to-br from-zinc-200 to-zinc-300 border border-zinc-200 cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-label={`Assistir ${video.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setSelectedVideo(video.link)
                          }
                        }}
                      >
                        {video.thumbnail ? (
                        <Image
                            src={video.thumbnail}
                            alt={`Thumbnail do vídeo: ${video.title}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : video.link ? (
                          // Se não tem thumbnail mas tem vídeo, usar o vídeo como poster
                          <video
                            src={video.link}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                            onLoadedMetadata={(e) => {
                              // Tentar pegar um frame do vídeo
                              const video = e.currentTarget
                              video.currentTime = 1 // Pega frame no segundo 1
                            }}
                          />
                        ) : (
                          // Placeholder quando não tem nem thumbnail nem vídeo
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center p-8">
                              <Film className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                              <p className="text-zinc-500 text-sm font-medium">{video.title}</p>
                            </div>
                          </div>
                        )}
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                            <svg className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-900" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        {/* Duration Badge */}
                        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 rounded bg-black/80 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-white">
                          {video.duration}
                        </div>
                      </div>

                      {/* Video Info */}
                      <h3 
                        onClick={() => setSelectedVideo(video.link)}
                        className="text-base sm:text-lg font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors mb-2 cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-label={`Assistir ${video.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setSelectedVideo(video.link)
                          }
                        }}
                      >
                        {video.title}
                      </h3>
                      {/* Tags: Ano, Duração, Categoria */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 mb-3">
                        {(() => {
                          const film = films.find(f => f.id === video.id)
                          if (!film) return null
                          
                          // Cores sutis para cada categoria
                          const getCategoryColors = (category: string) => {
                            switch (category) {
                              case 'Ficção':
                                return 'bg-oklch(0.96 0.02 35) text-oklch(0.55 0.12 35) border-oklch(0.90 0.04 35)'
                              case 'Drama':
                                return 'bg-oklch(0.96 0.02 25) text-oklch(0.55 0.12 25) border-oklch(0.90 0.04 25)'
                              case 'Documentário':
                                return 'bg-oklch(0.96 0.02 45) text-oklch(0.55 0.12 45) border-oklch(0.90 0.04 45)'
                              case 'Comercial':
                                return 'bg-oklch(0.96 0.02 30) text-oklch(0.55 0.12 30) border-oklch(0.90 0.04 30)'
                              default:
                                return 'bg-zinc-100 text-zinc-700 border-zinc-200'
                            }
                          }
                          
                          return (
                            <>
                                       {film.year && (
                                         <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                                           {film.year}
                                         </span>
                                       )}
                                       {film.duration && (
                                         <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                                           {film.duration}
                                         </span>
                                       )}
                                       {film.category && (
                                         <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border ${getCategoryColors(film.category)}`}>
                                           {translateCategory(film.category)}
                                         </span>
                                       )}
                                       {film.type && (
                                         <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                                           {translateType(film.type)}
                                           {film.description && (
                                             <span
                                               onClick={(e) => {
                                                 e.stopPropagation()
                                                 setSelectedFilmInfo(film.id)
                                               }}
                                               className="ml-1 p-0.5 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
                                               role="button"
                                               tabIndex={0}
                                               aria-label="Ver informações do filme"
                                               title="Ver informações detalhadas"
                                               onKeyDown={(e) => {
                                                 if (e.key === 'Enter' || e.key === ' ') {
                                                   e.preventDefault()
                                                   e.stopPropagation()
                                                   setSelectedFilmInfo(film.id)
                                                 }
                                               }}
                                             >
                                               <Info className="h-3 w-3 text-zinc-600" />
                                             </span>
                                           )}
                                         </span>
                                       )}
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}

              {/* Video Modal */}
              <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
                <DialogContent 
                  className="!max-w-[100vw] !w-screen h-screen sm:h-[98vh] p-0 bg-black !border-0 !m-0 !translate-x-[-50%] !translate-y-[-50%] !top-[50%] !left-[50%] !rounded-none !grid-cols-1" 
                  showCloseButton={false}
                  style={{ width: '100vw', maxWidth: '100vw' }}
                >
                  {selectedVideo && (
                    <>
                      <DialogTitle className="sr-only">Player de Vídeo</DialogTitle>
                      {/* Botão de Fechar Customizado */}
                      <button
                        onClick={() => setSelectedVideo(null)}
                        className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
                        aria-label="Fechar vídeo"
                        title="Fechar (ESC)"
                      >
                        <X className="h-6 w-6 text-zinc-900" />
                      </button>
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <video
                          src={selectedVideo}
                          controls
                          autoPlay
                          className="w-full h-full max-w-full max-h-full object-contain"
                          controlsList="nodownload"
                        >
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>

              {/* Modal de Informações do Filme */}
              {(() => {
                const film = selectedFilmInfo ? films.find(f => f.id === selectedFilmInfo) : null
                if (!film || !film.description) return null
                
                // Selecionar descrição baseada no idioma
                const description = language === 'pt' 
                  ? film.description 
                  : language === 'en' 
                    ? (film.descriptionEn || film.description)
                    : (film.descriptionEs || film.description)
                
                return (
                  <Dialog open={!!selectedFilmInfo} onOpenChange={(open) => !open && setSelectedFilmInfo(null)}>
                    <DialogContent className="max-w-2xl max-h-[80vh] bg-white overflow-y-auto">
                      {/* Logo centralizado */}
                      <div className="flex justify-center mb-4">
                        <img
                          src="/peixeheader.png"
                          alt="Alice Stamato"
                          className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                        />
                      </div>
                      <DialogTitle className="text-xl font-bold mb-4 text-zinc-900 text-center">
                        {film.title}
                      </DialogTitle>
                      <div className="space-y-4">
                        <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                          {description}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )
              })()}

                     {!loading && !showAll && allVideosToDisplay.length > 4 && (
                       <div className="mt-6 sm:mt-8 flex justify-center">
                  <Button
                    onClick={() => setShowAll(true)}
                    variant="outline"
                    size="lg"
                           className="border-2 border-zinc-400 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white transition-colors px-6 sm:px-8 font-semibold text-sm sm:text-base w-full sm:w-auto"
                  >
                           {t.vimeoProfile.viewMore}
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      
      {/* Message Modal */}
      <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
        <DialogContent className="max-w-md bg-white">
          <DialogTitle className="text-xl font-bold mb-4 text-zinc-900">
            {t.vimeoProfile.message}
          </DialogTitle>
          
          <div className="space-y-4">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="message-name" className="text-zinc-900">Nome *</Label>
              <Input
                id="message-name"
                value={messageForm.name}
                onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                placeholder="Seu nome"
                className={`text-zinc-900 bg-white ${messageErrors.name ? 'border-red-500' : ''}`}
              />
              {messageErrors.name && (
                <p className="text-sm text-red-500">{messageErrors.name}</p>
              )}
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="message-email" className="text-zinc-900">Email *</Label>
              <Input
                id="message-email"
                type="email"
                value={messageForm.email}
                onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                placeholder="seu@email.com"
                className={`text-zinc-900 bg-white ${messageErrors.email ? 'border-red-500' : ''}`}
              />
              {messageErrors.email && (
                <p className="text-sm text-red-500">{messageErrors.email}</p>
              )}
            </div>
            
            {/* Assunto */}
            <div className="space-y-2">
              <Label htmlFor="message-subject" className="text-zinc-900">Assunto *</Label>
              <Input
                id="message-subject"
                value={messageForm.subject}
                onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                placeholder="Assunto da mensagem"
                className={`text-zinc-900 bg-white ${messageErrors.subject ? 'border-red-500' : ''}`}
              />
              {messageErrors.subject && (
                <p className="text-sm text-red-500">{messageErrors.subject}</p>
              )}
            </div>
            
            {/* Mensagem */}
            <div className="space-y-2">
              <Label htmlFor="message-text" className="text-zinc-900">Mensagem *</Label>
              <Textarea
                id="message-text"
                value={messageForm.message}
                onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                placeholder="Escreva sua mensagem aqui..."
                rows={6}
                className={`text-zinc-900 bg-white ${messageErrors.message ? 'border-red-500' : ''}`}
              />
              {messageErrors.message && (
                <p className="text-sm text-red-500">{messageErrors.message}</p>
              )}
            </div>
            
            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowMessageModal(false)
                  setMessageForm({ name: '', email: '', subject: '', message: '' })
                  setMessageErrors({})
                }}
                className="flex-1"
                disabled={messageLoading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSendMessage}
                className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
                disabled={messageLoading}
              >
                {messageLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  )
}
