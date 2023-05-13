<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import {
  SHOW_SETTINGS,
  SHOW_JSON,
  SHOW_PARENT_TYPES,
  SHOW_KEYBINDINGS,
} from '~/constants'
import Button from '~/components/ui/Button/Button'
import {
  useKeybindings,
  useMap,
  useOverlay,
  useRequestRemoveMap,
} from '~/composables'
import Checkbox from '~/components/ui/Checkbox/Checkbox'
import Input from '~/components/ui/Input/Input'
import { MapSettings } from '~/entities'
import { useFormDirtyCheck } from '~/composables/useFormDirtyCheck'

const { removeMap } = useRequestRemoveMap()
const { map, mapName, firstMapLoad, parentTypes } = useMap()
const { close, overlayName, isOpened } = useOverlay()
const form = ref({})
const { stringify } = JSON
const isDirty = computed(
  () =>
    stringify(form.value) !== stringify(map.map((vMap) => vMap.settings).value)
)
useFormDirtyCheck(isDirty, SHOW_SETTINGS)

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

const onRemove = async () => {
  if (confirm('Это действие безвозвратно удалит карту, продолжить?')) {
    await removeMap(mapName)
    location.href = '/'
  }
}

const onSave = () => {
  close()
  map.map((vMap) => {
    vMap.settings = { ...form.value } as MapSettings
  })
}

const { shiftSFired } = useKeybindings()
watch(shiftSFired, () => {
  if (!isOpened(SHOW_SETTINGS)) {
    return
  }
  onSave()
})
</script>

<template>
  <div class="Settings">
    <div class="Settings-Content">
      <div class="Settings-Row">
        <div class="Settings-ButtonGroup">
          <Button
            class="Settings-Button"
            type="primary"
            @click="overlayName.value = SHOW_JSON"
          >
            JSON экспорт\импорт
          </Button>
          <Button
            class="Settings-Button"
            type="primary"
            @click="overlayName.value = SHOW_KEYBINDINGS"
          >
            Сочетания клавиш
          </Button>
          <Button
            v-if="parentTypes.length"
            type="primary"
            class="Settings-Button"
            @click="overlayName.value = SHOW_PARENT_TYPES"
          >
            Родительские типы
          </Button>
        </div>
      </div>
      <div class="Settings-Row">
        <Checkbox
          v-model="form.colored"
          label="Использовать раскраску лейблов"
        />
      </div>
      <div class="Settings-Row">
        <label>
          <b>Название карты</b>
          <Input v-model="form.title" />
        </label>
      </div>
      <div class="Settings-Row">
        <a href="https://github.com/kosukhin/mind-map-creator" target="_blank">
          Репозиторий на GitHub
        </a>
      </div>
    </div>
    <div class="Settings-ButtonGroup">
      <Button class="Settings-Button" type="success" @click="onSave"
        >Сохранить</Button
      >
      <Button class="Settings-Button" @click="close">Отменить</Button>
      <Button class="Settings-Button" type="danger" @click="onRemove"
        >Удалить карту</Button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'Settings';
</style>
