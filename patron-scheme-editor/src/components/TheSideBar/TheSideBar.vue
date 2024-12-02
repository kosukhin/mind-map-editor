<script setup lang="ts">
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseGroup from '@/components/BaseGroup/BaseGroup.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import TheLinker from '@/components/TheLinker/TheLinker.vue';
import { useApplication } from '@/composables/useApplication';
import { useFactories } from '@/composables/useFactories';
import { EditorSettings } from '@/modules/application/l1/l2/l3/l4/editor/EditorSettings';
import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { computed, onMounted, ref } from 'vue';

const {
  mapObjectNew,
  mapCurrent,
  mapTypeCurrent,
  mapTypeRemoved,
  mapTypeNew,
  modal,
  settings: appSettings,
  sidebarDraggable
} = useApplication();

const types = mapCurrent.types(new VueRefPatron<MapTypeDocument[]>()).ref();
const dragWrapperRef = ref();

onMounted(() => {
  sidebarDraggable.give(dragWrapperRef.value);
})

const { svgMapTypeImage } = useFactories();
const typesExtended = computed(() => types.value?.map((type) => ({
  type,
  image: svgMapTypeImage.create(type).markup(),
})).sort((a, b) => +(a.type.name >= b.type.name)));

const settings = new VueRefPatron<EditorSettings>();
appSettings.value(settings);
</script>

<template>
  <div class="flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden">
    <div ref="dragWrapperRef" class="flex flex-col gap-3 flex-grow w-full overflow-y-auto">
      <div
        v-for="(type, name) in typesExtended"
        :key="name"
        class="flex flex-col items-center justify-center gap-2"
      >
        <div class="TheSideBar-ItemName">{{ type.type.name }}</div>
        <div
          v-html="type.image"
          class="TheSideBar-ItemImage"
          :draggable="settings.value.readonly ? 'false' : 'true'"
          :style="`width:${type.type.width}px;height:${type.type.height}px`"
          :title="$t('general.notifications.dragToCanvasToAdd')"
          @dragend="mapObjectNew.byTypeName(type.type.id, $event)"
        ></div>
        <div class="flex gap-1" v-if="!settings.value.readonly">
          <BaseButton
            class="text-white"
            size="sm"
            type="primary"
            @click="mapTypeCurrent.give(type.type.id)"
          >
            {{ $t('general.change') }}
          </BaseButton>
          <BaseButton
            class="text-white"
            size="sm"
            type="danger"
            @click="mapTypeRemoved.give(type.type)"
          >
            {{ $t('general.delete') }}
          </BaseButton>
        </div>
      </div>
    </div>
    <div class="mt-auto w-full p-3 pt-0" v-if="!settings.value.readonly">
      <BaseGroup class="mb-1 grid gap-1 grid-cols-2">
        <BaseButton
          :title="$t('general.addType')"
          type="success"
          @click="mapTypeNew.byName()"
        >
          <BaseIcon icon="fa-plus-square" />
        </BaseButton>
        <BaseButton
          class="e2e-show-settings"
          :title="$t('general.settings')"
          type="primary"
          @click="modal.give('settings')"
        >
          <BaseIcon icon="fa-cog" />
        </BaseButton>
      </BaseGroup>
      <TheLinker class="w-[100%] block mb-1" />
    </div>
  </div>
</template>
