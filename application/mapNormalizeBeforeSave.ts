import { MapStructure } from '~/entities'

export const mapNormalizeBeforeSave = (
  vMap: MapStructure,
  currentLocation: string
) => ({ ...vMap, url: currentLocation })
