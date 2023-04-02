import { watch } from '@vue/runtime-core'
import { createSharedComposable } from '@vueuse/core'
import { ref } from '@vue/reactivity'
import {
  useCurrentMap,
  useLayerEvents,
  useMapObjects,
  useOverlay,
} from '~/composables'
import { allSet, anySet } from '~/entities'
import { openUrlByObject, setValue, unwrapTuple } from '~/utils'
import { mapObjectClick } from '~/application'

export const useLayerListenerClick = createSharedComposable(() => {
  const { click, tap } = useLayerEvents()
  const { map } = useCurrentMap()
  const { currentObjectId } = useMapObjects()
  const { overlayName } = useOverlay()
  const isLocked = ref(false)

  watch([tap, click], () => {
    allSet([anySet([click, tap] as const), map] as const)
      .chain(unwrapTuple(mapObjectClick(isLocked.value)))
      .map((result) => {
        result.currentObjectId.map(setValue(currentObjectId))
        result.overlayName.map(setValue(overlayName))
        result.openUrlByObject.map((object) => openUrlByObject(object))
      })
  })

  return {
    isLocked,
  }
})
