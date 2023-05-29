import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { MapType } from '~/entities'
import { useSharedMap } from '~/composables'
import { setValue, all, reMaybe } from '~/utils'

type StrNum = string | number

export const useSharedMapType = createSharedComposable(() => {
  const { map } = useSharedMap()
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
