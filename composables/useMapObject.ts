import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { all, reMaybe, setValue } from '~/utils'
import { MapObject } from '~/entities'
import { useMap } from '~/composables'

export const useMapObject = createSharedComposable(() => {
  const { map } = useMap()
  const currentObjectId = reMaybe<number>()
  const currentObject = reMaybe<MapObject>()
  watch([currentObjectId, map], () => {
    all([currentObjectId, map] as const).map(([objId, vMap]) => {
      setValue(currentObject, vMap.objects[objId])
    })
  })
  return {
    currentObjectId,
    currentObject,
  }
})
