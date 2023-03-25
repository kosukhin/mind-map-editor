import { MapStructure } from "~/entities/Map";
import { http } from "~/utils/http";

interface MapResponse {
  data: {
    document: string,
    structure: MapStructure,
  }
}

export async function getMap(mapName: string): Promise<MapStructure> {
  const response = await http({
    method: 'get',
    url: '/api/get-map',
    params: {
      document: mapName,
    },
  }) as MapResponse;

  const result = response.data.structure;
  result.document = response.data.document;

  for (const typeId of Object.keys(result.types)) {
    result.types[typeId] = {
      ...result.types[typeId],
      name: result.types[typeId].name ? result.types[typeId].name : typeId
    }
  }

  for (const objectId of Object.keys(result.objects)) {
    result.objects[objectId] = {
      ...result.objects[objectId],
      id: objectId
    }
  }

  return result;
}
