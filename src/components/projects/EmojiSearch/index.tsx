'use client'
import { useState, useEffect } from 'react'
import { ProjectType } from '@/lib/projects'
import PageTitle from './EmojiTitle'
import InteractiveEmojiArray from './InteractiveEmojiArray'
import LoadingAnimation from './LoadingAnimation'

const SearchForm = ({ 
  query, 
  setQuery, 
  onSubmit,
  searchState,
}: { 
  query: string
  setQuery: (query: string) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
  searchState: 'init' | 'search' | 'success' | 'failure'
}) => (
  <form onSubmit={onSubmit} className="flex flex-col items-center">
    <div className={`w-full flex justify-center ${searchState === 'search' ? 'cursor-wait' : ''}`}>
      <input
        name="query"
        value={query}
        placeholder={query === '' ? 'Type to search...' : ''}
        onChange={e => setQuery(e.target.value)}
        className="px-4 py-2 border rounded-lg mr-2 bg-inherit"
        disabled={searchState === 'search'}
        // TOFIX: autoFocus does not work with 'success'
        autoFocus={['success', 'failure', 'init'].includes(searchState)}
      />
      <button 
        type="submit"
        className={`px-2 bg-transparent hover:scale-125 transform transition-transform duration-150 text-2xl ${searchState === 'search' ? 'cursor-wait' : ''}`}
      >
        🔍   
      </button>
    </div>
  </form>
)

function SearchStatusDisplay({
  results,
  searchState
}: {
  results: string[]
  searchState: 'init' | 'search' | 'success' | 'failure'
}) {
  const content = (() => {
    switch (searchState) {
      case 'init':
        return null;
      case 'search':
        return <LoadingAnimation />;
      case 'success':
        return <InteractiveEmojiArray emojiList={results} />;
      case 'failure':
        return "Failed to search";
      default:
        return null;
    }
  })();

  return (<div className="mt-5">{content}</div>);
}
export default function EmojiSearch(props: ProjectType) {
  const [query, setQuery] = useState('');
  const [searchState, setSearchState] = useState<'init' | 'search' | 'success' | 'failure'>('init');
  const [results, setResults] = useState<string[]>([]);
  const emoji_search_api = "/api/search";
  const num_retries = 100;
  const retry_delay = 100;

  useEffect(() => {
    // Warm up the API on page load (with a random number to prevent cache activation)
    const warmUpApi = async () => {
      try {
        const randomNum = Math.floor(Math.random() * 100000)
        await fetch(`${emoji_search_api}?query=warmup${randomNum}`)
      } catch (error) {
        console.error('Error warming up emoji search API:', error)
      }
    }
    warmUpApi()
  }, [])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!query.trim()) {
      return
    } else {
      setSearchState('search')
    }
    const url = `${emoji_search_api}?query=${encodeURIComponent(query)}`
    
    const fetchWithRetry = async (url: string, retries: number = num_retries, delay: number = retry_delay) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url)
          if (response.ok) {
            return await response.json()
          }
        } catch (error) {
          if (i === retries - 1) throw error
        }
        await new Promise(resolve => setTimeout(resolve, delay))
      }
      throw new Error('Failed to fetch after multiple attempts')
    }

    try {
      const data = await fetchWithRetry(url)
      setSearchState('success')
      setResults(data)
    } catch (error) {
      setSearchState('failure')
      console.error('Error fetching emoji search:', error)
    }
  }

  return (
    <div className="p-8 flex flex-col items-center">
      <PageTitle />
      <SearchForm
        query={query}
        setQuery={setQuery}
        onSubmit={handleSubmit}
        searchState={searchState}
      />
      <SearchStatusDisplay
        results={results}
        searchState={searchState}
      />
    </div>
  )
}