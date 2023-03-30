import { useRequest } from '~/composables'
import { MapResponse, MapStructure, MapType } from '~/entities'
import { createMap } from '~/utils'

export const useRequestGetMap = () => {
  const { http } = useRequest()

  const getMap = async (
    mapName: string
  ): Promise<[MapStructure, MapType[]]> => {
    const response = (await http({
      method: 'get',
      url: '/api/get-map',
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
        title: 'Карта X',
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
