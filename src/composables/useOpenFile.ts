import { Ref, ref } from 'vue';
import { FileWithHandle } from '../types/fileWithHandle';

const openedFile = ref<FileSystemFileHandle | undefined>();
const forceFile = ref<FileWithHandle>();

export const useOpenFile = () => ({
  openedFile,
  forceFile,
});
