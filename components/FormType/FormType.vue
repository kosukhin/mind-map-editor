<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import {
  useSharedMap,
  useSharedMapType,
  useSharedOverlay,
  useFormDirtyCheck,
  useSharedKeybindings,
} from '~/composables'
import { SHOW_TYPE } from '~/constants'
import { all } from '~/utils'
import AppSvgEditor from '~/components/AppSvgEditor/AppSvgEditor.vue'
import BaseButton from '~/components/BaseButton/BaseButton.vue'
import BaseInput from '~/components/BaseInput/BaseInput.vue'
import BaseModal from '~/components/BaseModal/BaseModal.vue'

const { stringify } = JSON

const form = ref<any>({})
const { currentTypeId, currentType } = useSharedMapType()
const { map } = useSharedMap()
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
const isDirty = computed(
  () => stringify(form.value) !== stringify(currentType.value)
)
useFormDirtyCheck(isDirty, SHOW_TYPE)

const save = () => {
  close()
  all([map, currentTypeId] as const).map(([vMap, vTypeId]) => {
    vMap.types[vTypeId] = {
      ...vMap.types[vTypeId],
      ...form.value,
    }
  })
}

const { close, isOpened } = useSharedOverlay()
const { ctrlSFired } = useSharedKeybindings()
watch(ctrlSFired, () => {
  if (!isOpened(SHOW_TYPE)) {
    return
  }
  save()
})
</script>

<template>
  <BaseModal :name="SHOW_TYPE">
    <template #header>
      <h2>{{ $t('formType.mapType') }}</h2>
    </template>
    <div v-if="!currentType.isNothing" class="FormType">
      <BaseInput v-model="form.name" class="FormType-Row" />
      <AppSvgEditor v-model="form" />
    </div>
    <template #footer>
      <div class="FormType-Controls">
        <BaseButton type="success" @click="save">
          {{ $t('formType.save') }}
        </BaseButton>
        <BaseButton @click="close">
          {{ $t('formType.cancel') }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
@import 'FormType';
</style>
