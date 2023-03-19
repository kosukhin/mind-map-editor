import { MapStructure } from "~/entities/Map";
import { http } from "~/utils/http";

export async function getMap(mapName: string): Promise<MapStructure> {
  const response = await http({
    method: 'get',
    url: '/api/get-map',
    params: {
      document: mapName,
    },
  })

  const result = (response as any).data.structure as MapStructure;

  for (const objectId of Object.keys(result.objects)) {
    result.objects[objectId] = {
      ...result.objects[objectId],
      id: objectId
    }
  }

  return result;
}
