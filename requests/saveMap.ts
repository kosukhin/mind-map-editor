import {http} from "~/utils";
import {MapStructure} from "~/entities";

export async function saveMap(map: MapStructure) {
  await http({
    method: 'post',
    url: '/api/save-map',
    params: {
      document: 'synergy',
    },
    data: {document: 'synergy', structure: map}
  })
}
