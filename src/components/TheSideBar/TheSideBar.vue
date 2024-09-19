<script setup lang="ts">
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseGroup from '@/components/BaseGroup/BaseGroup.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import TheGrouper from '@/components/TheGrouper/TheGrouper.vue';
import TheLinker from '@/components/TheLinker/TheLinker.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { useFactories } from '@/composables/useFactories';
import { computed } from 'vue';

const { mapObjectNew, mapCurrent } = useApplication();

const typesPatron = new VueRefPatron<MapTypeDocument[]>();
mapCurrent.types(typesPatron);
const types = typesPatron.ref();

const { svgMapTypeImage } = useFactories();
const typesExtended = computed(() => types.value?.map((type) => ({
  type,
  image: svgMapTypeImage.create(type).markup(),
})));
</script>

<template>
  <div class="flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden">
    <div class="flex flex-col gap-3 flex-grow w-full overflow-y-auto">
      <div
        v-for="(type, name) in typesExtended"
        :key="name"
        class="flex flex-col items-center justify-center gap-2"
      >
        <div class="TheSideBar-ItemName">{{ type.type.name }}</div>
        <div
          v-html="type.image"
          class="TheSideBar-ItemImage"
          draggable="true"
          :style="`width:${type.type.width}px;height:${type.type.height}px`"
          :title="$t('general.notifications.dragToCanvasToAdd')"
          @dragend="mapObjectNew.byTypeName(type.type.name, {x: 0, y: 0})"
        ></div>
        <div class="flex gap-1">
          <BaseButton class="text-white" size="sm" type="primary">
            {{ $t('general.change') }}
          </BaseButton>
          <BaseButton class="text-white" size="sm" type="danger">
            {{ $t('general.delete') }}
          </BaseButton>
        </div>
      </div>
    </div>
    <div class="mt-auto p-3 pt-0">
      <BaseGroup class="mb-1 grid gap-1 grid-cols-2">
        <BaseButton
          :title="$t('general.addType')"
          type="success"
        >
          <BaseIcon icon="fa-plus-square" />
        </BaseButton>
        <BaseButton
          class="e2e-show-settings"
          :title="$t('general.settings')"
          type="primary"
        >
          <BaseIcon icon="fa-cog" />
        </BaseButton>
      </BaseGroup>
      <TheLinker class="w-full mb-1" />
      <TheGrouper class="w-full" />
    </div>
  </div>
</template>
