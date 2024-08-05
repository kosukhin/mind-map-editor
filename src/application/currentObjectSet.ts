import { setValue } from '@/utils/common';
import { MapStructure } from '@/entities/MapStructures';
import { Valuable } from '@/entities/Valuable';
import curry from 'lodash/fp/curry';

export const currentObjectSet = curry((
  currentObject: Valuable,
  theObjectId: number,
  theMap: MapStructure,
) => {
  setValue(currentObject, theMap.objects[theObjectId]);
});
