import { useRequest } from '~/composables'
import { API_SEARCH, GET } from '~/constants'

type SearchResponse = { response: Array<{ ref: string }> }

export function useRequestSearch() {
  const { http } = useRequest()
  const search = async (query: string): Promise<SearchResponse> => {
    return (await http({
      method: GET,
      url: API_SEARCH,
      params: {
        query,
      },
    })) as SearchResponse
  }

  return {
    search,
  }
}
