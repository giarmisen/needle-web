export type RadarAlbum = {
  artist: string
  title: string
  year: number
  sources: string
  description: string
  aligned: boolean
  review_url: string
  spotify_url?: string
  cover_url?: string
}

export type Radar = {
  week_from: string
  week_to: string
  albums: RadarAlbum[]
  footer: string
}

