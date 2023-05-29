import { watch } from '@vue/runtime-core'
import { createSharedComposable } from '@vueuse/core'
import {
  useSharedMap,
  useSharedLayerEvents,
  useSharedMapObject,
  useSharedOverlay,
  useSharedSideBar,
  useSharedLocks,
} from '~/composables'
import { all, any, openUrlByObject, setValue } from '~/utils'
import { mapObjectClick } from '~/application'

export const useSharedLayerListenerClick = createSharedComposable(() => {
  const { click, tap, stageClick } = useSharedLayerEvents()
  const { map } = useSharedMap()
  const { isSidebarOpen } = useSharedSideBar()
  const { currentObjectId } = useSharedMapObject()
  const { overlayName } = useSharedOverlay()
  const { isClickLocked } = useSharedLocks()

  watch(stageClick, () => {
    isSidebarOpen.value = false
  })
  watch([tap, click], () => {
    all([any([click, tap] as const), map] as const)
      .map(mapObjectClick(isClickLocked.value))
      .map((result) => {
        all([result.currentObjectId, map] as const).map(([objectId, vMap]) => {
          if (vMap.objects[objectId]) {
            vMap.objects[objectId].lastClick = Date.now()
          }
        })
        result.currentObjectId.map(setValue(currentObjectId))
        result.overlayName.map(setValue(overlayName))
        result.openUrlByObject.map(openUrlByObject)
      })
  })
})
