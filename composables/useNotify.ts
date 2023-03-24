import {Maybe} from "~/entities";
import {reactive} from "@vue/reactivity";
import {createSharedComposable} from "@vueuse/core";
import {watch} from "@vue/runtime-core";
import {NOTIFY_DELAY} from "~/constants";

export const useNotify = createSharedComposable(() => {
  const message = reactive(Maybe<string>());

  watch(message, () => {
    message.map(() => {
      setTimeout(() => {
        message.value = null;
      }, NOTIFY_DELAY)
    })
  })

  return {
    message,
  }
});
