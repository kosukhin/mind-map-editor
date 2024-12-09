<script lang="ts" setup>
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { computed } from '@vue/runtime-core';
import { useFactories } from '@/composables/useFactories';

const { parentTypes, mapType } = useApplication();
const { svgMapTypeImage } = useFactories();
const theTypes = parentTypes.types(new VueRefPatron<MapTypeDocument[]>()).ref();

const typesExtended = computed(() => theTypes.value?.map((type: MapTypeDocument) => ({
  type,
  image: svgMapTypeImage.create(type).markup(),
})).sort((a: { type: MapTypeDocument }, b: { type: MapTypeDocument }) => +(a.type.name >= b.type.name)));
</script>

<template>
  <BaseModal name="parentTypes">
    <div class="AppTypes">
      <div class="text-md font-bold mb-2">Родительские типы</div>
      <div class="flex gap-2 items-end">
        <div
          v-for="item in typesExtended"
          :key="item.type.name"
          class="flex flex-col gap-2"
        >
          <div class="AppTypesParent-ItemTitle">{{ item.type.name }}</div>
          <div
            class="AppTypesParent-ItemImage"
            v-html="item.image"
            :style="`width:${item.type.width}px;height:${item.type.height}px`"
          ></div>
          <BaseButton
            class="AppTypesParent-ItemButton e2e-add-preset-type"
            type="success"
            size="sm"
            @click="mapType.give({name: item.type.name, type: item.type})"
          >
            {{ $t('general.addToMap') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
