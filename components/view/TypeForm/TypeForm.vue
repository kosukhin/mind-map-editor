<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import {
  useCurrentMap,
  useMapTypes,
  useOverlay,
  useFormDirtyCheck,
} from '~/composables'
import { SHOW_TYPE } from '~/constants'
import SvgEditor from '~/components/view/SvgEditor/SvgEditor'
import Button from '~/components/ui/Button/Button'
import { all } from '~/entities'
import Input from '~/components/ui/Input/Input'
import Modal from '~/components/ui/Modal/Modal'

const { close } = useOverlay()
const { map } = useCurrentMap()
const { currentTypeId, currentType } = useMapTypes()
const form = ref<any>({})
const { stringify } = JSON
const isDirty = computed(
  () => stringify(form.value) !== stringify(currentType.value)
)
useFormDirtyCheck(isDirty, SHOW_TYPE)

watch(
  currentType,
  () => {
    currentType.map((vType) => {
      form.value = {
        ...vType,
      }
    })
  },
  {
    flush: 'post',
    immediate: true,
  }
)

const save = () => {
  close()
  all([map, currentTypeId] as const).map(([vMap, vTypeId]) => {
    vMap.types[vTypeId] = {
      ...vMap.types[vTypeId],
      ...form.value,
    }
  })
}
</script>

<template>
  <Modal :name="SHOW_TYPE">
    <template #header>
      <h2>Тип карты</h2>
    </template>
    <div v-if="!currentType.isNothing" class="TypeForm">
      <Input v-model="form.name" class="TypeForm-Row" />
      <SvgEditor v-model="form" />
    </div>
    <template #footer>
      <div class="TypeForm-Controls">
        <Button type="success" @click="save"> Сохранить </Button>
        <Button @click="close"> Отменить </Button>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
@import 'TypeForm';
</style>
