import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { all, MapType, reMaybe } from '~/entities'
import { useMap } from '~/composables'
import { setValue } from '~/utils'

type StrNum = string | number

export const useMapTypes = createSharedComposable(() => {
  const { map } = useMap()
  const currentTypeId = reMaybe<StrNum>()
  const currentType = reMaybe<MapType>()

  watch(currentTypeId, () => {
    all([map, currentTypeId] as const).map(([vMap, vType]) => {
      setValue(currentType, vMap.types[vType])
    })
  })

  return {
    currentTypeId,
    currentType,
  }
})
