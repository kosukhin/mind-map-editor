import { watch } from '@vue/runtime-core'
import { createSharedComposable } from '@vueuse/core'
import {
  useMap,
  useLayerEvents,
  useMapObjects,
  useOverlay,
  useSideBar,
  useLocks,
} from '~/composables'
import { all, any } from '~/entities'
import { openUrlByObject, setValue } from '~/utils'
import { mapObjectClick } from '~/application'

export const useLayerListenerClick = createSharedComposable(() => {
  const { click, tap, stageClick } = useLayerEvents()
  const { map } = useMap()
  const { isSidebarOpen } = useSideBar()
  const { currentObjectId } = useMapObjects()
  const { overlayName } = useOverlay()
  const { isClickLocked } = useLocks()

  watch(stageClick, () => {
    isSidebarOpen.value = false
  })

  watch([tap, click], () => {
    all([any([click, tap] as const), map] as const)
      .map(mapObjectClick(isClickLocked.value))
      .map((result) => {
        result.currentObjectId.map(setValue(currentObjectId))
        result.overlayName.map(setValue(overlayName))
        result.openUrlByObject.map((object) => openUrlByObject(object))
      })
  })
})
