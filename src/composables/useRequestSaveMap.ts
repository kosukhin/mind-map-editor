import { idbEdit } from '@/application/idbAction';
import { idbFindDb } from '@/application/idbGet';
import { useOpenFile } from '@/composables/useOpenFile';
import { useRequestCreateMap } from '@/composables/useRequestCreateMap';
import { getFileBlobByName, readFile, updateBlobContent } from '@/libraries/browser-fs';
import { jsonParse } from '@/utils/jsonParse';
import { jsonStringify } from '@/utils/jsonStringify';
import { omit } from 'lodash';
import { MapStructure } from '@/entities/Map';
'lodash';

const { forceFile } = useOpenFile();

// FIXME убрать в функции
export function useRequestSaveMap() {
  const saveMap = async (map: MapStructure, mapName: string): Promise<void> => {
    let fileBlob = getFileBlobByName(mapName) as any;
    if (forceFile.value) {
      fileBlob = forceFile.value;
    }

    const previousContent = await readFile(fileBlob);
    let savedMap = {};
    try {
      savedMap = jsonParse(previousContent);
    } catch {
      console.log('save parse error');
    }
    // console.log('saved map', savedMap);

    const mapToSave = omit(Object.assign(savedMap, { [mapName]: map }), Object.keys(map));
    const content = jsonStringify(mapToSave);

    if (fileBlob && fileBlob.handle) {
      const writable = await fileBlob.handle.createWritable();
      await writable.write(content);
      await writable.close();
      updateBlobContent(fileBlob, content);
    } else if (fileBlob) {
      idbFindDb('maps', 'name', 'equals', fileBlob.name).then((v: any) => {
        const payload = [
          {
            name: fileBlob.name,
            content,
          },
        ];
        if (v[0]) {
          payload.unshift(v[0].id);
        }
        idbEdit('maps', payload);
      });
    } else {
      const { createMap } = useRequestCreateMap();
      createMap(mapName, false);
    }
  };

  return {
    saveMap,
  };
}
