import { http } from '~/utils'

interface GetMapsResponse {
  ok: boolean
  files: { name: string; url: string }[]
}

export const getMaps = async (): Promise<GetMapsResponse> => {
  return (await http({
    method: 'get',
    url: '/api/get-maps',
  })) as GetMapsResponse
}
