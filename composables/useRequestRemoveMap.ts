import { useRequest } from '~/composables'
import { API_REMOVE_MAP, POST } from '~/constants'

export const useRequestRemoveMap = () => {
  const { http } = useRequest()

  const removeMap = async (mapName: string) => {
    await http({
      method: POST,
      url: API_REMOVE_MAP,
      params: {
        document: mapName,
      },
    })
  }

  return {
    removeMap,
  }
}
