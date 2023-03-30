import { watch } from '@vue/runtime-core'
import { createSharedComposable } from '@vueuse/core'
import { ref } from '@vue/reactivity'
import { useCurrentMap, useLayerEvents, useMapObjects } from '~/composables'
import { useOverlay } from '~/composables/useOverlay'
import { SHOW_OBJECT } from '~/constants'
import { allSet, anySet } from '~/entities'
import { openUrlByObject } from '~/utils'

export const useLayerListenerClick = createSharedComposable(() => {
  const { click, tap } = useLayerEvents()
  const { map } = useCurrentMap()
  const { currentObjectId } = useMapObjects()

  const { overlayName } = useOverlay()
  const isLocked = ref(false)

  watch([tap, click], () => {
    allSet([anySet([click, tap]), map] as const).map(([e, vMap]) => {
      const objectId = e?.target.attrs.objectId

      if (e?.target.attrs.text && objectId) {
        const currentObject = vMap.objects[objectId]

        if (openUrlByObject(currentObject)) {
          return
        }
      }

      currentObjectId.value = objectId

      if (isLocked.value) {
        return
      }

      overlayName.value = SHOW_OBJECT
    })
  })

  return {
    isLocked,
  }
})
