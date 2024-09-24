<script lang="ts" setup>
import uniqueId from 'lodash/uniqueId';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

const parentNames: unknown[] = [];

const {
  mapFile,
} = useApplication();

const map = mapFile.currentMap(new VueRefPatron<MapDocument>()).ref();
</script>

<template>
  <div>
    <span
      v-for="(title, url) in parentNames"
      :key="url || uniqueId('history_')"
    >
      /
      <RouterLink :to="url">
        {{ title }}
      </RouterLink>
    </span>
    <span v-if="map">
      /
      {{ map.settings.title }}
    </span>
  </div>
</template>
