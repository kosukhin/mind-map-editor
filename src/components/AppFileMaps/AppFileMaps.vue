<script setup lang="ts">
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { MapFileDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import BaseDrawer from '@/components/BaseDrawer/BaseDrawer.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';

const {
  mapFile, mapCurrentID, drawer, mapRemoved,
} = useApplication();

const maps = mapFile.mapFile(new VueRefPatron<MapFileDocument>()).ref();
const currentMapName = mapCurrentID.id(new VueRefPatron()).ref();

const remove = (name: string) => {
  // eslint-disable-next-line no-restricted-globals
  if (confirm('Вы уверены?')) {
    mapRemoved.give(name);
  }
};
</script>

<template>
  <BaseDrawer direction="rtl" name="fileMaps">
    <template #header>
      <h2 class="text-lg font-bold">
        Карты в файле
      </h2>
    </template>
    <div>
      <div v-for="(map, mapName) in maps" :key="mapName" class="flex items-center gap-2">
        <a
          href="#"
          :class="{'font-bold': currentMapName === mapName}"
          @click.prevent="mapCurrentID.give(mapName);drawer.give('')"
        >
          {{ map.settings.title }}
        </a>
        <BaseIcon @click="remove(mapName)" class="text-danger-second cursor-pointer" title="Удалить карту" icon="fa-close" />
      </div>
    </div>
  </BaseDrawer>
</template>
