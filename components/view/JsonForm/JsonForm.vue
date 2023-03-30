<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
import { useCurrentMap, useOverlay } from '~/composables'
import Textarea from '~/components/ui/Textarea/Textarea.vue'
import Button from '~/components/ui/Button/Button.vue'
import { useFormDirtyCheck } from '~/composables/useFormDirtyCheck'
import { SHOW_JSON } from '~/constants'
import Modal from '~/components/ui/Modal/Modal.vue'

const { map } = useCurrentMap()
const { close } = useOverlay()
const form = ref('')
const { stringify } = JSON
const isDirty = computed(
  () => form.value !== stringify(map.map((vObj) => vObj))
)
useFormDirtyCheck(isDirty, SHOW_JSON)

watch(
  map,
  () => {
    map.map((vMap) => {
      form.value = JSON.stringify(vMap)
    })
  },
  {
    immediate: true,
  }
)

const onSave = async () => {
  map.value = JSON.parse(form.value)
  await nextTick()
  location.reload()
}
</script>

<template>
  <Modal :name="SHOW_JSON">
    <template #header>
      <h2>Экспорт\Импорт</h2>
    </template>
    <div class="JsonForm">
      <Textarea v-model="form" class="JsonForm-Text" />
    </div>
    <template #footer>
      <div class="JsonForm-Buttons">
        <Button class="JsonForm-Button" type="success" @click="onSave"
          >Сохранить</Button
        >
        <Button class="JsonForm-Button" @click="close">Отмена</Button>
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
@import 'JsonForm';
</style>
