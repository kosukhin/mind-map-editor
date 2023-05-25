<script lang="ts" setup>
import { useShare } from '@vueuse/core'
import { computed, ref } from '@vue/reactivity'
import { useMap, useOverlayAutoClose } from '~/composables'
import { SHOW_TEXT } from '~/constants'
import { nl2br, stripHtml } from '~/utils'
import BaseModal from '~/components/BaseModal/BaseModal.vue'
import BaseButton from '~/components/BaseButton/BaseButton.vue'

useOverlayAutoClose(SHOW_TEXT)

const { map } = useMap()
const mapAsString = computed(() => {
  return (
    map.map((vMap) => {
      return Object.values(vMap.objects)
        .map((object) => {
          return `<div class="TheMapAsText-Item">
          <h3>
          ${nl2br(object.name)}
          </h3>
          <p>
          ${nl2br(object.additionalName || '')}
          </p>
          <p>
          ${nl2br(object.description || '')}
          </p>
        </div>`
        })
        .join('')
    }).value ?? ''
  )
})

const { share, isSupported } = useShare()
const onShare = () => {
  if (!isSupported.value) {
    alert('Шаринг не поддерживается')
  }

  share({
    text: stripHtml(mapAsString.value),
  })
}

const textRef = ref()
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
  <BaseModal :name="SHOW_TEXT">
    <template #header>
      <h2 class="TheMapAsText-ModalTitle">
        Вся карта текстом
        <BaseButton
          size="sm"
          type="success"
          class="TheMapAsText-Share"
          @click="onShare"
        >
          Шарить
        </BaseButton>
        <BaseButton
          size="sm"
          type="primary"
          class="TheMapAsText-Share"
          @click="onSelectAll"
        >
          Выделить всё
        </BaseButton>
      </h2>
    </template>
    <article v-if="!map.isNothing" class="TheMapAsText">
      <div ref="textRef" v-html="mapAsString"></div>
    </article>
  </BaseModal>
</template>

<style lang="scss">
.TheMapAsText-Item {
  margin-bottom: var(--defaultPadding);

  * {
    user-select: all;
  }
}
</style>

<style lang="scss" scoped>
@import 'TheMapAsText';
</style>
