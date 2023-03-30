import { http } from '~/utils'

export const search = async (
  query: string
): Promise<{ response: Array<{ ref: string }> }> => {
  return (await http({
    method: 'get',
    url: '/api/search',
    params: {
      query,
    },
  })) as any
}
