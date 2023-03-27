import {http} from "~/utils";

export const removeMap = async (mapName: string) => {
  await http({
    method: 'post',
    url: '/api/remove-map',
    params: {
      document: mapName,
    },
  })
}
