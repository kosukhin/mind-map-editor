import { useRequest } from '~/composables'
import { MapResponse, MapStructure, MapType } from '~/entities'
import { createMap } from '~/utils'
import { API_GET_MAP, GET, MAP_DEFAULT_TITLE } from '~/constants'

export const useRequestGetMap = () => {
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
    let result

    if (!response.ok) {
      result = createMap(mapName)
    } else {
      result = response.data.structure
    }

    result.document = response.data.document

    result.settings = Object.assign(
      {
        colored: false,
        title: MAP_DEFAULT_TITLE,
      },
      result.settings ?? {}
    )

    for (const typeId of Object.keys(result.types)) {
      result.types[typeId] = {
        ...result.types[typeId],
        name: result.types[typeId].name ? result.types[typeId].name : typeId,
      }
    }

    for (const objectId of Object.keys(result.objects)) {
      result.objects[objectId] = {
        ...result.objects[objectId],
        id: objectId,
      }
    }

    return [result as MapStructure, response.parentTypes as MapType[]]
  }

  return {
    getMap,
  }
}
