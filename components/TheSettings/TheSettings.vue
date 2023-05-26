<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import {
  SHOW_SETTINGS,
  SHOW_JSON,
  SHOW_PARENT_TYPES,
  SHOW_KEYBINDINGS,
} from '~/constants'
import {
  useKeybindings,
  useMap,
  useOverlay,
  useRequestRemoveMap,
  useFormDirtyCheck,
} from '~/composables'
import { MapSettings } from '~/entities'
import BaseButton from '~/components/BaseButton/BaseButton.vue'
import BaseCheckbox from '~/components/BaseCheckbox/BaseCheckbox.vue'
import BaseInput from '~/components/BaseInput/BaseInput.vue'

const { stringify } = JSON

const form = ref({})
const { map, mapName, firstMapLoad, parentTypes } = useMap()
watch(
  firstMapLoad,
  () => {
    map.map((vMap) => {
      form.value = { ...vMap.settings }
    })
  },
  {
    immediate: true,
  }
)

const { removeMap } = useRequestRemoveMap()
const onRemove = async () => {
  if (confirm('Это действие безвозвратно удалит карту, продолжить?')) {
    await removeMap(mapName)
    location.href = '/'
  }
}

const { close, overlayName, isOpened } = useOverlay()
const onSave = () => {
  close()
  map.map((vMap) => {
    vMap.settings = { ...form.value } as MapSettings
  })
}

const { ctrlSFired } = useKeybindings()
watch(ctrlSFired, () => {
  if (!isOpened(SHOW_SETTINGS)) {
    return
  }
  onSave()
})

const isDirty = computed(
  () =>
    stringify(form.value) !== stringify(map.map((vMap) => vMap.settings).value)
)
useFormDirtyCheck(isDirty, SHOW_SETTINGS)
</script>

<template>
  <div class="TheSettings">
    <div class="TheSettings-Content">
      <div class="TheSettings-Row">
        <div class="TheSettings-ButtonGroup">
          <BaseButton
            class="TheSettings-Button"
            type="primary"
            @click="overlayName.value = SHOW_JSON"
          >
            JSON экспорт\импорт
          </BaseButton>
          <BaseButton
            class="TheSettings-Button"
            type="primary"
            @click="overlayName.value = SHOW_KEYBINDINGS"
          >
            Сочетания клавиш
          </BaseButton>
          <BaseButton
            v-if="parentTypes.length"
            type="primary"
            class="TheSettings-Button"
            @click="overlayName.value = SHOW_PARENT_TYPES"
          >
            Родительские типы
          </BaseButton>
        </div>
      </div>
      <div class="TheSettings-Row">
        <BaseCheckbox
          v-model="form.colored"
          label="Использовать раскраску лейблов"
        />
      </div>
      <div class="TheSettings-Row">
        <label>
          <b>Название карты</b>
          <BaseInput v-model="form.title" />
        </label>
      </div>
      <div class="TheSettings-Row">
        <a href="https://github.com/kosukhin/mind-map-creator" target="_blank">
          Репозиторий на GitHub
        </a>
      </div>
    </div>
    <div class="TheSettings-ButtonGroup">
      <BaseButton class="TheSettings-Button" type="success" @click="onSave">
        Сохранить
      </BaseButton>
      <BaseButton class="TheSettings-Button" @click="close">
        Отменить
      </BaseButton>
      <BaseButton class="TheSettings-Button" type="danger" @click="onRemove">
        Удалить карту
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'TheSettings';
</style>
