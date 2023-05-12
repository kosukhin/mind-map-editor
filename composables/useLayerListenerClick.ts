import { watch } from '@vue/runtime-core'
import { createSharedComposable } from '@vueuse/core'
import {
  useMap,
  useLayerEvents,
  useMapObject,
  useOverlay,
  useSideBar,
  useLocks,
} from '~/composables'
import { all, any, openUrlByObject, setValue } from '~/utils'
import { mapObjectClick } from '~/application'

export const useLayerListenerClick = createSharedComposable(() => {
  const { click, tap, stageClick } = useLayerEvents()
  const { map } = useMap()
  const { isSidebarOpen } = useSideBar()
  const { currentObjectId } = useMapObject()
  const { overlayName } = useOverlay()
  const { isClickLocked } = useLocks()

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
