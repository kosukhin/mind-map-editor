<script lang="ts" setup>
import { useShare } from '@vueuse/core'
import { computed, ref } from '@vue/reactivity'
import { useMap, useOverlayAutoClose } from '~/composables'
import { SHOW_TEXT } from '~/constants'
import Modal from '~/components/ui/Modal/Modal'
import Button from '~/components/ui/Button/Button.vue'
import { nl2br } from '~/utils'

const { share, isSupported } = useShare()
const { map } = useMap()
const textRef = ref()
useOverlayAutoClose(SHOW_TEXT)

const mapAsString = computed(() => {
  return (
    map.map((vMap) => {
      return Object.values(vMap.objects)
        .map((object) => {
          return `<div class="MapAsText-Item">
          <h3>
          ${nl2br(object.name)}
          </h3>
          <p>
          ${nl2br(object.description || '')}
          </p>
        </div>`
        })
        .join('')
    }).value ?? ''
  )
})

const onShare = () => {
  if (!isSupported.value) {
    alert('Шаринг не поддерживается')
  }

  share({
    title: 'Карта',
    text: mapAsString.value,
    url: location.href,
  })
}

const onSelectAll = () => {
  map.map((vMap) => {
    const range = new Range()
    range.setStart(textRef.value, 0)
    range.setEnd(textRef.value, Object.values(vMap.objects).length)
    document.getSelection()?.removeAllRanges()
    document.getSelection()?.addRange(range)
  })
}
</script>

<template>
  <Modal :name="SHOW_TEXT">
    <template #header>
      <h2 class="MapAsText-ModalTitle">
        Вся карта текстом
        <Button
          size="sm"
          type="success"
          class="MapAsText-Share"
          @click="onShare"
        >
          Шарить
        </Button>
        <Button
          size="sm"
          type="primary"
          class="MapAsText-Share"
          @click="onSelectAll"
        >
          Выделить всё
        </Button>
      </h2>
    </template>
    <article v-if="!map.isNothing" class="MapAsText">
      <div ref="textRef" v-html="mapAsString"></div>
    </article>
  </Modal>
</template>

<style lang="scss">
.MapAsText-Item {
  margin-bottom: var(--defaultPadding);
}
</style>

<style lang="scss" scoped>
@import 'MapAsText';
</style>
