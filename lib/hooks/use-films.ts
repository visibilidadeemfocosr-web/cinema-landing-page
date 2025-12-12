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
  thumbnail?: string
  videoUrl: string
  videoSize: number
  videoFormat: string
  views: number
  isPublished: boolean
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
        const params = new URLSearchParams()
        if (published !== undefined) {
          params.append('published', published.toString())
        }
        if (category) {
          params.append('category', category)
        }

        const response = await fetch(`/api/films?${params.toString()}`)
        const data = await response.json()

        if (data.success) {
          setFilms(data.data)
        } else {
          setError(data.message || 'Erro ao carregar filmes')
        }
      } catch (err) {
        setError('Erro ao carregar filmes')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFilms()
  }, [published, category])

  return { films, loading, error }
}

