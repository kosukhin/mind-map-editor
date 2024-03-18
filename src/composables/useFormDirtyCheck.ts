import { useSharedOverlay } from '@/composables/useSharedOverlay';
import { OVERLAY_CLOSE_ALERT } from '@/constants/messages';
import { OVERLAY_CLOSE } from '@/constants/overlays';
import { setValue } from '@/utils/common';
import { Ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import partial from 'lodash/partial';

const { tryToClose, close } = useSharedOverlay();

type Subscriber = {
  isDirty: Ref<boolean>
  formName: string
}
const subscribers: Subscriber[] = [];

const closeOverlay = partial(setValue, tryToClose, OVERLAY_CLOSE);
// eslint-disable-next-line no-restricted-globals
const overlayConfirmation = partial(confirm, OVERLAY_CLOSE_ALERT);
const closeWhenConfirmed = () => overlayConfirmation() && close();

const actions = {
  close,
  closeOverlay,
  closeWhenConfirmed,
};
type Actions = (keyof typeof actions)[]

const resolveTryToClose = (
  whatToClose: string,
  isDirty: boolean,
  formName: string,
): Actions => {
  if (whatToClose !== formName) {
    return [];
  }

  if (!isDirty) {
    return ['close', 'closeOverlay'];
  }

  return ['closeWhenConfirmed'];
};

watch(tryToClose, (whatToClose) => {
  subscribers.forEach(({ isDirty, formName }) => {
    resolveTryToClose(whatToClose as string, isDirty.value, formName).forEach(
      (action) => actions[action](),
    );
  });
});

export const useFormDirtyCheck = (isDirty: Ref<boolean>, formName: string) => {
  subscribers.push({
    isDirty,
    formName,
  });
};
