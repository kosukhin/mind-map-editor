<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
import merge from 'lodash/merge'
import Modal from '~/components/ui/Modal/Modal'
import Textarea from '~/components/ui/Textarea/Textarea'
import Button from '~/components/ui/Button/Button'
import { SHOW_JSON_TYPES } from '~/constants'
import { useFormDirtyCheck, useMap, useOverlay } from '~/composables'

const { close } = useOverlay()
const { map } = useMap()
const form = ref('')
const { stringify } = JSON
const isDirty = computed(
  () => form.value !== stringify(map.map((vObj) => vObj.types).value)
)
useFormDirtyCheck(isDirty, SHOW_JSON_TYPES)

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

const onSave = () => {
  map.map(async (vMap) => {
    vMap.types = merge(vMap.types, JSON.parse(form.value))
    await nextTick()
    location.reload()
  })
}
</script>

<template>
  <Modal :name="SHOW_JSON_TYPES">
    <template #header>
      <h2>Экспорт\Импорт Типов</h2>
    </template>
    <div class="JsonForm">
      <Textarea v-model="form" class="JsonForm-Text" />
    </div>
    <template #footer>
      <div class="JsonForm-Buttons">
        <Button class="JsonForm-Button" type="success" @click="onSave">
          Сохранить
        </Button>
        <Button class="JsonForm-Button" @click="close">Отмена</Button>
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
@import 'JsonForm';
</style>
