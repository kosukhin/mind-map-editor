<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import { useMapType } from '@/composables/useMapType';
import { useMap } from '@/composables/useMap';
import { SHOW_TYPE } from '@/constants/overlays';
import { useFormDirtyCheck } from '@/composables/useFormDirtyCheck';
import { useOverlay } from '@/composables/useOverlay';
import { useKeybindings } from '@/composables/useKeybindings';
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue';

const { stringify } = JSON;

const form = ref<any>({});
const { currentTypeId, currentType } = useMapType();
const { map } = useMap();
watch(
  currentType,
  () => {
    if (currentType.value) {
      form.value = {
        ...currentType.value,
      };
    }
  },
  {
    flush: 'post',
    immediate: true,
  },
);
const isDirty = computed(
  () => stringify(form.value) !== stringify(currentType.value),
);
useFormDirtyCheck(isDirty, SHOW_TYPE);

const { close, isOpened } = useOverlay();

const save = () => {
  close();
  if (map.value && currentTypeId.value) {
    map.value.types[currentTypeId.value] = {
      ...map.value.types[currentTypeId.value],
      ...form.value,
    };
  }
};
const { ctrlSFired } = useKeybindings();
watch(ctrlSFired, () => {
  if (!isOpened(SHOW_TYPE)) {
    return;
  }
  save();
});
</script>

<template>
  <BaseModal :name="SHOW_TYPE">
    <template #header>
      <h2>{{ $t('general.mapType') }}</h2>
    </template>
    <div v-if="currentType" class="FormType">
      <b>Название типа</b>
      <BaseInput v-model="form.name" class="FormType-Row" />
      <b>SVG</b>
      <BaseTextarea v-model="form.svg" class="FormJson-Text" />
      <b>Ширина</b>
      <BaseInput v-model="form.width" class="FormType-Row" />
      <b>Высота</b>
      <BaseInput v-model="form.height" class="FormType-Row" />
    </div>
    <template #footer>
      <div class="FormType-Controls">
        <BaseButton type="success" @click="save">
          {{ $t('general.save') }}
        </BaseButton>
        <BaseButton @click="close">
          {{ $t('general.cancel') }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
