<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { updateObjectOnLayer } from '@/utils/konva';
import { AnyFn } from '@vueuse/core';
import { useSharedLayer } from '@/composables/useSharedLayer';
import { useSharedMap } from '@/composables/useSharedMap';
import { useSharedMapObject } from '@/composables/useSharedMapObject';
import { useSharedLocks } from '@/composables/useSharedLocks';

const { layer, layerObjects } = useSharedLayer();
const { map } = useSharedMap();
const { currentObjectId, fastPreviewIsLocked } = useSharedMapObject();
const { isClickLocked } = useSharedLocks();
const i18n = useI18n();
const title = ref(i18n.t('general.makeRelation'));
const type = ref('default');
let stopNextObjectWatcher: AnyFn | null = null;
const startRelation = () => {
  if (type.value === 'danger') {
    if (stopNextObjectWatcher) {
      stopNextObjectWatcher();
    }
    title.value = i18n.t('general.makeRelation');
    isClickLocked.value = false;
    type.value = 'default';
    return;
  }
  fastPreviewIsLocked.value = true;
  currentObjectId.value = undefined;
  title.value = i18n.t('general.chooseSource');
  isClickLocked.value = true;
  type.value = 'danger';
  stopNextObjectWatcher = watch(currentObjectId, () => {
    if (!stopNextObjectWatcher) return;
    stopNextObjectWatcher();
    title.value = i18n.t('general.chooseTarget');
    type.value = 'success';
    const fromObjectId = currentObjectId.value ?? '';

    const stopSecond = watch(currentObjectId, () => {
      fastPreviewIsLocked.value = false;
      stopSecond();
      const toObjectId = String(currentObjectId.value ?? '');
      title.value = i18n.t('general.makeRelation');
      isClickLocked.value = false;
      type.value = 'default';

      if (map.value && layer.value) {
        map.value.objects[fromObjectId].arrows.push({ id: toObjectId });
        updateObjectOnLayer(
          layerObjects,
          layer.value,
          map.value.objects[fromObjectId],
          map.value,
        );
      }
    });
  });
};
</script>

<template>
  <BaseButton class="TheLinker" :type="type" @click="startRelation">
    {{ title }}
  </BaseButton>
</template>
