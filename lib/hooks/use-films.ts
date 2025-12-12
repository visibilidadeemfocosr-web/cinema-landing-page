'use client'

import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true)
        setError(null)
        const params = new URLSearchParams()
        if (published !== undefined) {
          params.append('published', published.toString())
        }
        if (category) {
          params.append('category', category)
        }
        // Adicionar timestamp para evitar cache
        params.append('t', Date.now().toString())

        const response = await fetch(`/api/films?${params.toString()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.success && Array.isArray(data.data)) {
          setFilms(data.data)
        } else {
          setError(data.message || 'Erro ao carregar filmes')
          setFilms([]) // Garantir que films seja um array vazio em caso de erro
        }
      } catch (err) {
        console.error('Erro ao carregar filmes:', err)
        setError('Erro ao carregar filmes')
        setFilms([]) // Garantir que films seja um array vazio em caso de erro
      } finally {
        setLoading(false)
      }
    }

    fetchFilms()
  }, [published, category])

  return { films, loading, error }
}

