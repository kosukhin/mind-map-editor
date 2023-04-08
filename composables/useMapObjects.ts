import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { all, MapObject, reMaybe } from '~/entities'
import { useMap } from '~/composables'
import { setValue } from '~/utils'

export const useMapObjects = createSharedComposable(() => {
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
