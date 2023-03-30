import { reactive } from '@vue/reactivity'
import { Maybe, Settings } from '~/entities'

export const useSettings = () => {
  const settings = reactive(Maybe<Settings>())
  settings.value = {
    isEditable: true,
  }

  return {
    settings,
  }
}
