import { MapResponse, MapStructure, MapTypeStructure } from '@/objects/entities/MapStructures';
import { createMap } from '@/utils/map';

export const requestNormalizeGetMap = (
  response: MapResponse,
  mapName: string,
) => {
  let result: MapStructure;
  if (!response.ok) {
    result = createMap(mapName);
  } else {
    result = response.data.structure;
  }
  result.document = response.data.document;
  result.settings = {
    ...result.settings ?? {},
  };

  Object.keys(result.types).forEach((typeId) => {
    result.types[typeId] = {
      ...result.types[typeId],
      name: result.types[typeId].name ? result.types[typeId].name : typeId,
    };
  });

  Object.keys(result.objects).forEach((objectId) => {
    result.objects[objectId] = {
      ...result.objects[objectId],
      id: objectId,
    };
  });

  return [result as MapStructure, response.parentTypes as MapTypeStructure[]] as const;
};
