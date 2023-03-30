import { useRequest } from '~/composables'
import { MapStructure, Map } from '~/entities'

export const useRequestSaveMap = () => {
  const { http } = useRequest()

  const saveMap = async (map: MapStructure, mapName: string): Promise<void> => {
    await http<Map>({
      method: 'post',
      url: '/api/save-map',
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
