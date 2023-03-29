import {MapStructure, MapType} from "~/entities/Map";
import { http } from "~/utils/http";
import { createMap } from "~/utils";

interface MapResponse {
  ok: boolean,
  data: {
    document: string,
    structure: MapStructure,
  },
  parentTypes: MapType[],
}

export async function getMap(mapName: string): Promise<[MapStructure, MapType[]]> {
  const response = await http({
    method: 'get',
    url: '/api/get-map',
    params: {
      document: mapName,
    },
  }) as MapResponse;
  let result;

  if (!response.ok) {
    result = createMap(mapName);
  } else {
    result = response.data.structure;
  }

  result.document = response.data.document;

  result.settings = Object.assign({
    colored: false,
    title: 'Карта X',
  }, result.settings ?? {});

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

  return [result, response.parentTypes];
}
