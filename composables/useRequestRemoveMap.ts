import { useRequest } from '~/composables'

export const useRequestRemoveMap = () => {
  const { http } = useRequest()

  const removeMap = async (mapName: string) => {
    await http({
      method: 'post',
      url: '/api/remove-map',
      params: {
        document: mapName,
      },
    })
  }

  return {
    removeMap,
  }
}
