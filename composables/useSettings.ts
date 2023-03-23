import {Maybe, Settings} from "~/entities";
import {reactive} from "@vue/reactivity";

export const useSettings = () => {
  const settings = reactive(Maybe<Settings>());
  settings.value = {
    isEditable: true,
  }

  return {
    settings,
  }
}
