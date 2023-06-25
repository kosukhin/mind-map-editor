import { useRequest } from '~/composables/useRequest'
import { Map } from '~/entities'
import { API_TRANSFER, POST } from '~/constants'

export function useRequestTransfer() {
  const { http } = useRequest()
  const transferMap = (mapName: string, payload: any) => {
    http<Map>({
      method: POST,
      url: API_TRANSFER,
      params: {
        document: mapName,
      },
      data: payload,
    } as const)
  }

  return {
    transferMap,
  }
}
