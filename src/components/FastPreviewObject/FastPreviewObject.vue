<script lang="ts" setup>
import { useSharedMapObject } from '@/composables/useSharedMapObject';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { useSharedMap } from '@/composables/useSharedMap';
import { useSharedLayer } from '@/composables/useSharedLayer';
import Konva from 'konva';
import { updateObjectOnLayer } from '@/utils/konva';
import { nextTick } from '@vue/runtime-core';
import { watch } from 'vue';
import { useObjectActions } from '@/composables/useObjectActions';
import { useMagicKeys } from '@vueuse/core';

const { map } = useSharedMap();
const { fastPreviewObjectId, currentObjectId } = useSharedMapObject();
const { layerObjects, layer } = useSharedLayer();

const tr = new Konva.Transformer({
  rotateEnabled: false,
  keepRatio: false,
  ignoreStroke: false,
});

let isTransformerAddedToLayer = false;
let isInTransform = false;

const detachTransform = () => {
  isInTransform = false;
  tr.nodes([]);
  tr.detach();
};

watch(fastPreviewObjectId, detachTransform);

const transform = () => {
  if (isInTransform) {
    detachTransform();
    return;
  }
  if (!isTransformerAddedToLayer && layer.value) {
    layer.value.add(tr);
    isTransformerAddedToLayer = true;
  }
  const objects = layerObjects.get(String(fastPreviewObjectId.value));
  const maybeImage = objects?.[0];
  if (layer.value && map.value?.objects && maybeImage instanceof Konva.Image) {
    const object = map.value.objects[String(fastPreviewObjectId.value)];
    tr.nodes([maybeImage]);
    isInTransform = true;
    maybeImage.setAttr('strokeScaleEnabled', false);

    maybeImage.on('transformend', (e) => {
      e.cancelBubble = true;
      const newHeight = Math.round(e.target.height() * e.target.scaleY());
      const newWidth = Math.round(e.target.width() * e.target.scaleX());

      object.width = newWidth;
      object.height = newHeight;
      if (layer.value && map.value) {
        updateObjectOnLayer(
          layerObjects,
          layer.value,
          object,
          map.value,
        );
        detachTransform();
        maybeImage.remove();
        nextTick(() => {
          transform();
        });
      }
    });
  }
};
const cancel = () => {
  fastPreviewObjectId.value = undefined;
};

const { removeCurrentObject } = useObjectActions();
const objectDelete = () => {
  currentObjectId.value = fastPreviewObjectId.value;
  nextTick(() => {
    removeCurrentObject();
    fastPreviewObjectId.value = undefined;
  });
};

const { current } = useMagicKeys();
watch(current, () => {
  if (current.has('escape')) {
    fastPreviewObjectId.value = undefined;
  }
});
</script>

<template>
  <transition name="fade">
    <div
      v-if="fastPreviewObjectId"
      class="FastPreviewObject Common-Flex-Column Common-Gap"
    >
      <div class="Common-Mb-Md">
        Объект
        #{{fastPreviewObjectId}},
        Нажмите второй раз на объект для редактиования
      </div>
      <div class="Common-Flex Common-Gap">
        <BaseButton @click="transform" class="Common-MaxWidth-150">
          Трансформ
        </BaseButton>
        <BaseButton
          type="danger"
          @click="objectDelete"
          class="Common-MaxWidth-150"
        >
          Удалить
        </BaseButton>
        <BaseButton
          class="Common-MaxWidth-150 Common-Ml-auto" @click="cancel"
        >
          Отмена
        </BaseButton>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
@import "FastPreviewObject";
</style>
