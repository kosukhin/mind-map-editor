import { reactive } from '@vue/reactivity'
import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { allSet, MapType, Maybe } from '~/entities'
import { useCurrentMap } from '~/composables'

type StrNum = string | number

export const useMapTypes = createSharedComposable(() => {
  const { map } = useCurrentMap()
  const currentTypeId = reactive(Maybe<StrNum>())
  const currentType = reactive(Maybe<MapType>())

  watch(currentTypeId, () => {
    allSet([map, currentTypeId] as const).map(([vMap, vType]) => {
      currentType.value = vMap.types[vType]
    })
  })

  return {
    currentTypeId,
    currentType,
  }
})
