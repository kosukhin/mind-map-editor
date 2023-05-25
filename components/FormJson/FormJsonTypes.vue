<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
import merge from 'lodash/merge'
import { SHOW_JSON_TYPES } from '~/constants'
import { useFormDirtyCheck, useMap, useOverlay } from '~/composables'
import BaseModal from '~/components/BaseModal/BaseModal.vue'
import BaseTextarea from '~/components/BaseTextarea/BaseTextarea.vue'
import BaseButton from '~/components/BaseButton/BaseButton.vue'

const { stringify } = JSON

const { map } = useMap()
const form = ref('')
watch(
  map,
  () => {
    map.map((vMap) => {
      form.value = stringify(vMap.types)
    })
  },
  {
    immediate: true,
  }
)
const isDirty = computed(
  () => form.value !== stringify(map.map((vObj) => vObj.types).value)
)
useFormDirtyCheck(isDirty, SHOW_JSON_TYPES)

const onSave = () => {
  map.map(async (vMap) => {
    vMap.types = merge(vMap.types, JSON.parse(form.value))
    await nextTick()
    location.reload()
  })
}

const { close } = useOverlay()
</script>

<template>
  <BaseModal :name="SHOW_JSON_TYPES">
    <template #header>
      <h2>Экспорт\Импорт Типов</h2>
    </template>
    <div class="FormJson">
      <BaseTextarea v-model="form" class="FormJson-Text" />
    </div>
    <template #footer>
      <div class="FormJson-Buttons">
        <BaseButton class="FormJson-Button" type="success" @click="onSave">
          Сохранить
        </BaseButton>
        <BaseButton class="FormJson-Button" @click="close">Отмена</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
@import 'FormJson';
</style>
