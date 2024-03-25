import { Ref, ref } from 'vue';

const openedFile = ref<FileSystemFileHandle | undefined>();
const forceFile = ref<File>() as Ref<File>;

export const useOpenFile = () => ({
  openedFile,
  forceFile,
});
