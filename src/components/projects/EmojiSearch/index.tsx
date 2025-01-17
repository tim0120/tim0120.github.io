'use client'
import { useState, useEffect } from 'react'
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
  const [popupVisible, setPopupVisible] = useState(false)

  const handleEmojiClick = () => {
    setPopupVisible(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (popupVisible) {
      timeoutId = setTimeout(() => {
        setPopupVisible(false);
      }, 1500);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [popupVisible]);

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
      setError("Oh no! We've encountered an error!")
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
    <div className="p-8 flex flex-col items-center relative">
      <PageTitle onEmojiClick={handleEmojiClick} />
      <h1 className="sr-only">{title}</h1>
      <p className="sr-only">{description}</p>
      <p className="sr-only">{slug}</p>
      <div className="text-center text-sm mb-4">
        <p className="text-gray-500 inline-block mr-2">v2.1.1</p>
        <a 
          href={`/projects/${slug}/about`} 
          className="text-blue-500 hover:underline inline-block"
        >
          about
        </a>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-[80%] sm:w-[60%] max-w-xl">
        <div className="w-full flex justify-center">
          <input
            name="query"
            value={query}
            placeholder="What emoji are you looking for?"
            onChange={e => setQuery(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg mr-2 bg-inherit text-sm focus:outline-none`}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (!isLoading) {
                  handleSubmit(e);
                  (e.target as HTMLInputElement).select();
                }
              }
            }}
            autoComplete="off"
            autoFocus={true}
          />
          <button 
            type="submit"
            className={`px-2 bg-transparent hover:scale-125 transform transition-transform duration-150 text-2xl
              ${isLoading ? 'cursor-wait' : ''}`}
            disabled={isLoading}
            onClick={() => {
              const input = document.querySelector('input[name="query"]');
              if (input) {
                (input as HTMLInputElement).select();
              }
            }}
          >
            🔍
          </button>
        </div>
      </form>
      <div className="mt-8">
        {isLoading && <LoadingAnimation status='loading' onEmojiClick={handleEmojiClick}/>}
        {!isLoading && error && <LoadingAnimation status='failed' onEmojiClick={handleEmojiClick}/>}
        {!isLoading && !error && results.length > 0 && (
          <InteractiveEmojiArray emojiList={results} onEmojiClick={handleEmojiClick} />
        )}
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-center p-2 rounded-md transition-opacity duration-300 ${popupVisible ? 'opacity-90' : 'opacity-0'}`}>
          Emoji copied!
        </div>
      </div>
    </div>
  )
}