import { mapBuildParentMapNames } from '@/application/mapBuildParentMapNames';
import { requestNormalizeGetMap } from '@/application/requestNormalizeGetMap';
import { MapStructure, MapType } from '@/entities/Map';
import { readFileByName } from '@/libraries/browser-fs';
import { isNotNullish } from '@/utils/isNotNullish';
import { jsonParse } from '@/utils/jsonParse';
import { compose, property } from 'lodash/fp';

const isTypesNotNullish = compose(isNotNullish, property('types'));

// FIXME Подумать над именем
export function useRequestGetMap() {
  const getMap = async (
    mapName: string,
  ): Promise<readonly [MapStructure, MapType[]]> => {
    const data = JSON.parse(String(await readFileByName(mapName)));
    const parentNames = mapBuildParentMapNames(mapName);

    const parentsData = await Promise.all(
      parentNames.map(readFileByName),
    ) as string[];
    const parentTypes = parentsData
      .map(jsonParse)
      .filter(isTypesNotNullish)
      .map((parent) => Object.values(parent.types) as MapType[])
      .flat();

    const response = {
      document: mapName,
      ok: !!data,
      parentTypes,
      data: data && 'structure' in data ? data : ({ structure: data } as any),
    };

    return requestNormalizeGetMap(response, mapName);
  };

  return {
    getMap,
  };
}
