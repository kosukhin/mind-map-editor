export interface GetMapsResponse {
  ok: boolean
  progress: Record<string, number>
  favorites: Record<string, Record<string, string>>
  files: { name: string; url: string }[]
}
