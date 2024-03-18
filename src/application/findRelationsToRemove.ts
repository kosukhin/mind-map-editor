import { MapObject, MapStructure } from '@/entities/Map';

type RelativeObject = { objectId: string; indexes: string[] }

export const findRelationsToRemove = (
  vObject: MapObject,
  vMap: MapStructure,
): any => {
  let relations: any[] | null = null;
  Object.values(vMap.objects).forEach((currentObject) => {
    const result: RelativeObject = { objectId: currentObject.id, indexes: [] };
    if (currentObject.arrows?.length) {
      Object.keys(currentObject.arrows).forEach((relationIndex) => {
        if (currentObject.arrows[Number(relationIndex)].id === vObject.id) {
          result.indexes.push(relationIndex);
        }
      });
    }
    if (result.indexes.length) {
      if (!relations) {
        relations = [];
      }
      relations.push(result);
    }
  });
  return relations;
};
