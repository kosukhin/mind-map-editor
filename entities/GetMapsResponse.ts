export interface GetMapsResponse {
  ok: boolean
  progress: Record<string, number>
  files: { name: string; url: string }[]
}
