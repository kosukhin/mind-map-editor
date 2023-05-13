import { useRequest } from '~/composables'
import { API_CREATE_MAP, POST } from '~/constants'

type Response = { ok: boolean; document: string }

export const useRequestCreateMap = () => {
  const { http } = useRequest()
  const createMap = async (mapName: string): Promise<Response> => {
    return (await http<{ name: string }>({
      method: POST,
      url: API_CREATE_MAP,
      data: {
        name: mapName,
      },
    } as const)) as Response
  }
  return {
    createMap,
  }
}
