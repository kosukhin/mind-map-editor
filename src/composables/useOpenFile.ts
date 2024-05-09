import { ref } from 'vue';
import { modelsPoolSet } from '@/modulesHigh/models/modelsPool';
import { FileWithHandle } from '@/types/fileWithHandle';

const openedFile = ref<FileSystemFileHandle>();
const forceFile = ref<FileWithHandle>();

modelsPoolSet('openedFile', openedFile);
modelsPoolSet('forceFile', forceFile);

export const useOpenFile = () => ({
  openedFile,
  forceFile,
});
