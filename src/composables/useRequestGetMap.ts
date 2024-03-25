import { requestNormalizeGetMap } from '@/application/requestNormalizeGetMap';
import { useOpenFile } from '@/composables/useOpenFile';
import { MapStructure, MapType } from '@/entities/Map';
import { readFile, readFileByName } from '@/libraries/browser-fs';
import { isNotNullish } from '@/utils/isNotNullish';
import { jsonParse } from '@/utils/jsonParse';
import { createMap } from '@/utils/map';
import { compose, property } from 'lodash/fp';

const isTypesNotNullish = compose(isNotNullish, property('types'));
const { forceFile } = useOpenFile();

// FIXME Подумать над именем
export function useRequestGetMap() {
  const getMap = async (
    mapName: string,
  ): Promise<readonly [MapStructure, MapType[]]> => {
    let data: any = null;
    try {
      if (forceFile.value) {
        data = jsonParse(String(await readFile(forceFile.value))) as MapStructure;
        data = data[mapName] ?? createMap('', mapName);
      } else {
        data = jsonParse(String(await readFileByName(mapName))) as MapStructure;
      }
    } catch (e) {
      data = createMap('', mapName);
    }

    // TODO переделать логику эту
    // const parentNames = mapBuildParentMapNames(mapName);
    // const parentsData = await Promise.all(
    //   parentNames.map(readFileByName),
    // ) as string[];
    // const parsedParentsData = parentsData.map(jsonParse);
    // const parentTypes = parsedParentsData
    //   .filter(isTypesNotNullish)
    //   .map((parent) => Object.values(parent.types) as MapType[])
    //   .flat();
    // const parentNamesDictionary = parsedParentsData
    // .reduce(iterateeHash('url', 'settings.title'), {});
    // [data].filter(isNotNullish).forEach(() => {
    //   data.parentNames = parentNamesDictionary;
    // });

    const response = {
      document: mapName,
      ok: !!data,
      parentTypes: [],
      data: data && 'structure' in data ? data : ({ structure: data } as any),
    };

    return requestNormalizeGetMap(response, mapName);
  };

  return {
    getMap,
  };
}
