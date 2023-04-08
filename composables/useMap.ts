import { useRoute } from 'vue-router'
import { createSharedComposable } from '@vueuse/core'
import { reactive, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { MapStructure, MapType } from '~/entities'
import { useNotify, useRequestGetMap, useRequestSaveMap } from '~/composables'
import { MAP_UPDATED, NOTIFY_ERROR, NOTIFY_SUCCESS } from '~/constants'
import { setError, setValue, setValues, MaybeError } from '~/utils'
import { mapNormalizeBeforeSave } from '~/application'

export const useMap = createSharedComposable(() => {
  const { message } = useNotify()
  const firstMapLoad = ref(false)
  const parentTypes = ref<MapType[]>([])
  const map = reactive(MaybeError<MapStructure>())
  const route = useRoute()
  const mapName = route.path.replace('/', '')
  const { getMap } = useRequestGetMap()
  const { saveMap } = useRequestSaveMap()

  getMap(mapName)
    .then(([vMap, vParentTypes]) => {
      setValues([
        [map, vMap],
        [parentTypes, vParentTypes],
        [firstMapLoad, true],
      ])
    })
    .catch(setError(map))

  watch(
    map,
    () => {
      map.map((vMap) => {
        const normalMap = mapNormalizeBeforeSave(vMap, location.pathname)
        saveMap(normalMap, mapName)
          .then(() => {
            setValue(message, [MAP_UPDATED, NOTIFY_SUCCESS])
          })
          .catch((e) => {
            setError(map, String(e))
            setValue(message, [map.error, NOTIFY_ERROR])
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
