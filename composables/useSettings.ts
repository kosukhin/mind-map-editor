import { Settings } from '~/entities'
import { reMaybe } from '~/utils'

export function useSettings() {
  const settings = reMaybe<Settings>()
  settings.value = {
    isEditable: true,
  }

  return {
    settings,
  }
}
