import { reMaybe, Settings } from '~/entities'

export const useSettings = () => {
  const settings = reMaybe<Settings>()
  settings.value = {
    isEditable: true,
  }

  return {
    settings,
  }
}
