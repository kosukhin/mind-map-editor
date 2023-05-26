import { createSharedComposable } from '@vueuse/core'
import { reactive } from '@vue/reactivity'
import { ReactiveHead, useSeoMeta } from '@vueuse/head'
import { watch } from '@vue/runtime-core'
import { useMap } from '~/composables/useMap'

export const useMeta = createSharedComposable(() => {
  const head = reactive<ReactiveHead>({
    title: 'Идет загрузка...',
  })
  useSeoMeta(head)

  const { firstMapLoad, map } = useMap()
  watch(firstMapLoad, () => {
    map.map((vMap) => {
      head.title = vMap.settings.title
    })
  })

  return {
    head,
  }
})
