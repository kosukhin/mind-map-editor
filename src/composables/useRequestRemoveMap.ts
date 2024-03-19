import { getDirectoryHandler, getFileBlobByName, removeFileBlobByName } from '@/libraries/browser-fs';
import { useRouter } from 'vue-router';
import { useIdbGetProject } from '@/composables/useIdbGetProject';
import { useIdbSaveProject } from '@/composables/useIdbSaveProject';
import { DEFAULT_PROJECT_NAME } from '@/constants/project';

// FIXME убрать в функции
export function useRequestRemoveMap() {
  const router = useRouter();

  const removeMap = (mapName: string) => {
    const fileBlob = getFileBlobByName(mapName) as any;
    const { name } = fileBlob.handle;

    const { getByName } = useIdbGetProject();
    return getByName(DEFAULT_PROJECT_NAME).then((v) => {
      if (v.length) {
        const newBlobs = v[0].blobs.filter((blob: any) => blob.name !== name);

        useIdbSaveProject(
          DEFAULT_PROJECT_NAME,
          newBlobs,
          getDirectoryHandler(),
          v[0].id,
        );
        router.back();
      }

      fileBlob.handle.remove();
      removeFileBlobByName(mapName);
    });
  };

  return {
    removeMap,
  };
}
