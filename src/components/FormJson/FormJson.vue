<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { nextTick, watch } from '@vue/runtime-core';
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import FormJsonTypes from '@/components/FormJson/FormJsonTypes.vue';
import { useSharedMap } from '@/composables/useSharedMap';
import { getLocation } from '@/utils/globals';
import { useFormDirtyCheck } from '@/composables/useFormDirtyCheck';
import { SHOW_JSON, SHOW_JSON_TYPES } from '@/constants/overlays';
import { useSharedOverlay } from '@/composables/useSharedOverlay';

const { stringify } = JSON;

const form = ref('');
const { map } = useSharedMap();
watch(
  map,
  () => {
    if (map.value) {
      form.value = JSON.stringify(map.value);
    }
  },
  {
    immediate: true,
  },
);
const onSave = async () => {
  map.value = JSON.parse(form.value);
  await nextTick();
  getLocation().reload();
};
const isDirty = computed(() => form.value !== stringify(map.value));
useFormDirtyCheck(isDirty, SHOW_JSON);

const { close, overlayName } = useSharedOverlay();
const openTypes = () => {
  overlayName.value = SHOW_JSON_TYPES;
};
</script>

<template>
  <FormJsonTypes />
  <BaseModal :name="SHOW_JSON">
    <template #header>
      <h2>{{ $t('formJson.exportOrImport') }}</h2>
    </template>
    <div class="FormJson">
      <BaseTextarea v-model="form" class="FormJson-Text" />
    </div>
    <template #footer>
      <div class="FormJson-Buttons">
        <BaseButton class="FormJson-Button" type="success" @click="onSave">
          {{ $t('formJson.save') }}
        </BaseButton>
        <BaseButton class="FormJson-Button" type="primary" @click="openTypes">
          {{ $t('formJson.types') }}
        </BaseButton>
        <BaseButton class="FormJson-Button" @click="close">
          {{ $t('formJson.cancel') }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
@import 'FormJson';
</style>
