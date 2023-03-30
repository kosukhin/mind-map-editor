import { useRequest } from '~/composables'
import { GetMapsResponse } from '~/entities'

export const useRequestGetMaps = () => {
  const { http } = useRequest()

  const getMaps = async (): Promise<GetMapsResponse> => {
    return (await http({
      method: 'get',
      url: '/api/get-maps',
    })) as GetMapsResponse
  }

  return {
    getMaps,
  }
}
