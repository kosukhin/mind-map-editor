import { idbEdit } from '@/application/idbAction';
import { idbFindDb } from '@/application/idbGet';
import { useRequestCreateMap } from '@/composables/useRequestCreateMap';
import { MapStructure } from '@/entities/Map';
import { getFileBlobByName, updateBlobContent } from '@/libraries/browser-fs';

// FIXME убрать в функции
export function useRequestSaveMap() {
  const saveMap = async (map: MapStructure, mapName: string): Promise<void> => {
    const fileBlob = getFileBlobByName(mapName) as any;
    const content = JSON.stringify(map);

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
        v[0] && payload.unshift(v[0].id);
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
