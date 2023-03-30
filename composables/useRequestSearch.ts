import { useRequest } from '~/composables'

type SearchResponse = { response: Array<{ ref: string }> }

export const useRequestSearch = () => {
  const { http } = useRequest()

  const search = async (query: string): Promise<SearchResponse> => {
    return (await http({
      method: 'get',
      url: '/api/search',
      params: {
        query,
      },
    })) as SearchResponse
  }

  return {
    search,
  }
}
