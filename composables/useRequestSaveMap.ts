import { useRequest } from '~/composables'
import { MapStructure, Map } from '~/entities'
import { API_SAVE_MAP, POST } from '~/constants'

export const useRequestSaveMap = () => {
  const { http } = useRequest()

  const saveMap = async (map: MapStructure, mapName: string): Promise<void> => {
    await http<Map>({
      method: POST,
      url: API_SAVE_MAP,
      params: {
        document: mapName,
      },
      data: { document: map.document, structure: map },
    } as const)
  }

  return {
    saveMap,
  }
}
