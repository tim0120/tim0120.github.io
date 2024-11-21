import { NextResponse } from 'next/server'

const EMOJI_API = process.env.EMOJI_SEARCH_API

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  try {
    const response = await fetch(`${EMOJI_API}?query=${encodeURIComponent(query || '')}`)
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Emoji API error:', error)
    return NextResponse.json({ error: 'Failed to fetch emojis' }, { status: 500 })
  }
}