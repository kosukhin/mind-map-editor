import { useOpenFile } from '@/composables/useOpenFile';
import { useRouter } from '@/composables/useRouter';
import { isNotNullish } from '@/utils/isNotNullish';

const { forceFile, openedFile } = useOpenFile();
const { push } = useRouter();

const removeMap = () => {
  [forceFile.value].filter(isNotNullish).forEach((file) => {
    file?.handle.remove();
    setTimeout(() => {
      forceFile.value = undefined;
      openedFile.value = undefined;
      push('/');
    }, 1000);
  });
};

// FIXME убрать в функции
export function useRequestRemoveMap() {
  return {
    removeMap,
  };
}
