import { useRoute } from 'vue-router'
import { createSharedComposable } from '@vueuse/core'
import { reactive, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { getMap, saveMap } from '~/requests'
import { MapStructure, MapType, MaybeError } from '~/entities'
import { useNotify } from '~/composables'
import { MAP_UPDATED } from '~/constants'

export const useCurrentMap = createSharedComposable(() => {
  const { message } = useNotify()
  const firstMapLoad = ref(false)
  const parentTypes = ref<MapType[]>([])
  const map = reactive(MaybeError<MapStructure>())
  const route = useRoute()
  const mapName = route.path.replace('/', '')

  getMap(mapName)
    .then(([vMap, vParentTypes]) => {
      map.value = vMap
      parentTypes.value = vParentTypes
      firstMapLoad.value = true
    })
    .catch((e) => {
      map.error = e
    })

  watch(
    map,
    () => {
      map.map((vMap) => {
        saveMap({ ...vMap, url: location.pathname }, mapName)
          .then(() => {
            message.value = MAP_UPDATED
          })
          .catch((e) => {
            map.error = String(e)
            message.value = map.error
          })
      })
    },
    {
      deep: true,
    }
  )

  return {
    map,
    firstMapLoad,
    parentTypes,
    mapName,
  }
})
