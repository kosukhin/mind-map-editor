import { useRequest } from '~/composables'
import { GetMapsResponse } from '~/entities'
import { API_GET_MAPS, GET } from '~/constants'

export function useRequestGetMaps() {
  const { http } = useRequest()
  const getMaps = async (): Promise<GetMapsResponse> => {
    return (await http({
      method: GET,
      url: API_GET_MAPS,
    })) as GetMapsResponse
  }

  return {
    getMaps,
  }
}
