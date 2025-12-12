'use client'

import { useState, useEffect, useRef } from 'react'

export interface Film {
  id: string
  title: string
  titleEn?: string
  titleEs?: string
  description?: string
  descriptionEn?: string
  descriptionEs?: string
  year: number
  duration: string
  category: string
  type?: string
  thumbnail?: string
  videoUrl: string
  videoSize?: number
  videoFormat?: string
  views: number
  isPublished: boolean
  displayOrder?: number
  createdAt: string
  updatedAt: string
}

export function useFilms(published?: boolean, category?: string) {
  const [films, setFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const retryCountRef = useRef(0)
  const maxRetries = 3
  const hasDataRef = useRef(false)

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout | null = null
    retryCountRef.current = 0
    hasDataRef.current = false

    const fetchFilms = async (retryAttempt = 0): Promise<void> => {
      try {
        if (isMounted && retryAttempt === 0) {
          setLoading(true)
          setError(null)
        }
        
        const params = new URLSearchParams()
        if (published !== undefined) {
          params.append('published', published.toString())
        }
        if (category) {
          params.append('category', category)
        }
        // Adicionar timestamp para evitar cache
        params.append('t', Date.now().toString())

        const controller = new AbortController()
        const abortTimeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

        const response = await fetch(`/api/films?${params.toString()}`, {
          cache: 'no-store',
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        })

        clearTimeout(abortTimeoutId)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Log para debug
        console.log('useFilms - API Response:', {
          success: data.success,
          hasData: !!data.data,
          dataIsArray: Array.isArray(data.data),
          dataLength: Array.isArray(data.data) ? data.data.length : 0,
          message: data.message,
          error: data.error,
          retryAttempt
        })

        if (!isMounted) return

        // Se tiver dados, usar mesmo que tenha mensagem de erro
        if (data.data && Array.isArray(data.data)) {
          if (data.data.length > 0) {
            hasDataRef.current = true
            setFilms(data.data)
            setError(null) // Limpar erro se tiver dados
            retryCountRef.current = 0 // Reset retry count on success
            if (isMounted) {
              setLoading(false)
            }
          } else {
            // Array vazio - pode ser que realmente não há filmes ou houve erro
            // Se a API retornou sucesso mas sem dados, pode ser um problema temporário
            if (data.message && data.message.includes('Erro')) {
              setError(data.message)
            }
            
            // Se não há dados mas a API retornou sucesso, tentar novamente
            if (retryAttempt < maxRetries && data.success && !hasDataRef.current) {
              console.log(`Tentando novamente (array vazio)... (tentativa ${retryAttempt + 1}/${maxRetries})`)
              timeoutId = setTimeout(() => {
                if (isMounted) {
                  fetchFilms(retryAttempt + 1)
                }
              }, 500 * (retryAttempt + 1)) // Backoff mais rápido
              return
            }
            
            setFilms([])
            if (isMounted) {
              setLoading(false)
            }
          }
        } else if (data.success === false) {
          // Se falhou, tentar novamente se ainda houver tentativas
          if (retryAttempt < maxRetries && !hasDataRef.current) {
            console.log(`Tentando novamente após erro... (tentativa ${retryAttempt + 1}/${maxRetries})`)
            timeoutId = setTimeout(() => {
              if (isMounted) {
                fetchFilms(retryAttempt + 1)
              }
            }, 500 * (retryAttempt + 1))
            return
          }
          
          setError(data.message || 'Erro ao carregar filmes')
          setFilms([])
          if (isMounted) {
            setLoading(false)
          }
        } else {
          // Caso inesperado
          console.warn('Resposta da API em formato inesperado:', data)
          if (retryAttempt < maxRetries && !hasDataRef.current) {
            timeoutId = setTimeout(() => {
              if (isMounted) {
                fetchFilms(retryAttempt + 1)
              }
            }, 500 * (retryAttempt + 1))
            return
          }
          setFilms([])
          setError('Formato de resposta inesperado')
          if (isMounted) {
            setLoading(false)
          }
        }
      } catch (err: any) {
        console.error('Erro ao carregar filmes:', err)
        
        if (!isMounted) return
        
        // Não tentar novamente se foi abortado (timeout ou unmount)
        if (err.name === 'AbortError') {
          if (isMounted) {
            setLoading(false)
          }
          return
        }
        
        // Tentar novamente em caso de erro de rede
        if (retryAttempt < maxRetries && !hasDataRef.current) {
          console.log(`Tentando novamente após exceção... (tentativa ${retryAttempt + 1}/${maxRetries})`)
          timeoutId = setTimeout(() => {
            if (isMounted) {
              fetchFilms(retryAttempt + 1)
            }
          }, 500 * (retryAttempt + 1))
          return
        }
        
        setError('Erro ao carregar filmes')
        setFilms([]) // Garantir que films seja um array vazio em caso de erro
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchFilms()

    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [published, category])

  return { films, loading, error }
}

