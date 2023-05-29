import { useRequest } from '~/composables'
import { MapResponse, MapStructure, MapType } from '~/entities'
import { API_GET_MAP, GET } from '~/constants'
import { requestNormalizeGetMap } from '~/application'

export function useRequestGetMap() {
  const { http } = useRequest()
  const getMap = async (
    mapName: string
  ): Promise<[MapStructure, MapType[]]> => {
    const response = (await http({
      method: GET,
      url: API_GET_MAP,
      params: {
        document: mapName,
      },
    })) as MapResponse
    return requestNormalizeGetMap(response, mapName)
  }

  return {
    getMap,
  }
}
