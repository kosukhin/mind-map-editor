<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
import { useMap, useOverlay, useFormDirtyCheck } from '~/composables'
import { SHOW_JSON, SHOW_JSON_TYPES } from '~/constants'
import BaseTextarea from '~/components/BaseTextarea/BaseTextarea.vue'
import BaseButton from '~/components/BaseButton/BaseButton.vue'
import BaseModal from '~/components/BaseModal/BaseModal.vue'
import FormJsonTypes from '~/components/FormJson/FormJsonTypes.vue'

const { stringify } = JSON

const form = ref('')
const { map } = useMap()
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
const isDirty = computed(
  () => form.value !== stringify(map.map((vObj) => vObj).value)
)
useFormDirtyCheck(isDirty, SHOW_JSON)

const { close, overlayName } = useOverlay()
const openTypes = () => {
  overlayName.value = SHOW_JSON_TYPES
}
</script>

<template>
  <FormJsonTypes />
  <BaseModal :name="SHOW_JSON">
    <template #header>
      <h2>Экспорт\Импорт</h2>
    </template>
    <div class="FormJson">
      <BaseTextarea v-model="form" class="FormJson-Text" />
    </div>
    <template #footer>
      <div class="FormJson-Buttons">
        <BaseButton class="FormJson-Button" type="success" @click="onSave">
          Сохранить
        </BaseButton>
        <BaseButton class="FormJson-Button" type="primary" @click="openTypes">
          Типы
        </BaseButton>
        <BaseButton class="FormJson-Button" @click="close"> Отмена </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
@import 'FormJson';
</style>
