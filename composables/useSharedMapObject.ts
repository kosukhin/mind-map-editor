import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { all, reMaybe, setValue } from '~/utils'
import { MapObject } from '~/entities'
import { useSharedMap } from '~/composables'

export const useSharedMapObject = createSharedComposable(() => {
  const { map } = useSharedMap()
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
