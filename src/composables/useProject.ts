import { useIdbGetProject } from '@/composables/useIdbGetProject';
import { useIdbSaveProject } from '@/composables/useIdbSaveProject';
import { DEFAULT_PROJECT_NAME } from '@/constants/project';
import { getDirectoryHandler, setDeirectoryHandle, setFiles } from '@/libraries/browser-fs';
import { ref } from 'vue';

const { getByName } = useIdbGetProject();
const isProjectOpened = ref(false);

const loadProjectFiles = () => getByName(DEFAULT_PROJECT_NAME).then((v) => {
  if (v.length) {
    setDeirectoryHandle(v[0].directoryHandle);
    isProjectOpened.value = true;
    return Promise.all(
      v[0].blobs.map(async (blobHandle: any) => {
        const file = (await blobHandle.getFile()) as any;
        file.handle = blobHandle;
        return file;
      }),
    ).then((files) => {
      setFiles(files);
    });
  }
  return v;
});

const saveProjectFiles = async (blobs: any[]) => {
  const project = await getByName(DEFAULT_PROJECT_NAME);
  if (!project.length) {
    isProjectOpened.value = true;
    useIdbSaveProject(
      DEFAULT_PROJECT_NAME,
      blobs.map((blob) => blob.handle),
      getDirectoryHandler(),
    );
  }
};

export const useProject = () => ({
  isProjectOpened,
  loadProjectFiles,
  saveProjectFiles,
});
