import { ref } from 'vue';

const openedFile = ref<FileSystemFileHandle | undefined>();
const forceFile = ref<File>();

export const useOpenFile = () => ({
  openedFile,
  forceFile,
});
