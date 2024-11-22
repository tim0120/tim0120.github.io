'use client'
import { useState } from 'react'
import PageTitle from './EmojiTitle'
import InteractiveEmojiArray from './InteractiveEmojiArray'
import LoadingAnimation from './LoadingAnimation'

const EMOJI_SEARCH_API = process.env.NEXT_PUBLIC_EMOJI_SEARCH_API

export default function EmojiSearch({
  slug,
  title,
  description
}: {
  slug: string
  title: string
  description: string
}) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const trimmedQuery = query.trim()
    
    if (!trimmedQuery || !EMOJI_SEARCH_API) return
    
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(
        `${EMOJI_SEARCH_API}?query=${encodeURIComponent(trimmedQuery)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Response body is null')
      }

      let result = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        result += new TextDecoder().decode(value)
      }

      try {
        const data = JSON.parse(result)
        if (!Array.isArray(data)) {
          throw new Error(`Invalid response format. Expected array, got: ${typeof data}`)
        }
        setResults(data)
      } catch (parseError) {
        throw new Error(`JSON parse error: ${parseError instanceof Error ? parseError.message : 'Unknown parsing error'}`)
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError("😞⛔⁉️\nHmm, something went wrong. Please try again.")
      console.error('Search error:', {
        message: errorMessage,
        query: trimmedQuery,
        api: EMOJI_SEARCH_API,
        errorObject: err
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 flex flex-col items-center">
      <PageTitle />
      <h1 className="sr-only">{title}</h1>
      <p className="sr-only">{description}</p>
      <p className="sr-only">{slug}</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-xl">
        <div className="w-full flex justify-center">
          <input
            name="query"
            value={query}
            placeholder="Type to search..."
            onChange={e => setQuery(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg mr-2 bg-inherit
              ${isLoading ? 'cursor-wait' : ''}`}
            disabled={isLoading}
          />
          <button 
            type="submit"
            className={`px-2 bg-transparent hover:scale-125 transform transition-transform duration-150 text-2xl
              ${isLoading ? 'cursor-wait' : ''}`}
            disabled={isLoading}
          >
            🔍
          </button>
        </div>
        {error && results.length === 0 && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      <div className="mt-5">
        {isLoading && <LoadingAnimation />}
        {!isLoading && results.length > 0 && <InteractiveEmojiArray emojiList={results} />}
      </div>
    </div>
  )
}