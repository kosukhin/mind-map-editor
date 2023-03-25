import {http} from "~/utils";
import {MapStructure} from "~/entities";

export async function saveMap(map: MapStructure, mapName: string) {
  await http({
    method: 'post',
    url: '/api/save-map',
    params: {
      document: mapName,
    },
    data: {document: map.document, structure: map}
  })
}
