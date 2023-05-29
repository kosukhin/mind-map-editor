import { createSharedComposable } from '@vueuse/core'
import { reactive } from '@vue/reactivity'
import { ReactiveHead, useSeoMeta } from '@vueuse/head'
import { watch } from '@vue/runtime-core'
import { useSharedMap } from '~/composables'

export const useSharedMeta = createSharedComposable(() => {
  const head = reactive<ReactiveHead>({
    title: 'Идет загрузка...',
  })
  useSeoMeta(head)

  const { firstMapLoad, map } = useSharedMap()
  watch(firstMapLoad, () => {
    map.map((vMap) => {
      head.title = vMap.settings.title
    })
  })

  return {
    head,
  }
})
