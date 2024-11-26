<script lang="ts" setup>
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { Patron, SourceEmpty } from 'patron-oop';

const { mapFile, mapCurrent } = useApplication();

const mapSerialized = new SourceEmpty<string>();

mapFile.currentMap(new Patron((map) => {
  mapSerialized.give(JSON.stringify(map));
}))

// mapSerialized.value(new Patron((value) => {
//   mapFile.currentMap(new Guest((latestMap) => {
//     const latestMapSerialized = JSON.stringify(latestMap);
//     if (latestMapSerialized !== value) {
//       mapCurrent.give(JSON.parse(value));
//     }
//   }));
// }))

const sourceRef = new VueRefPatron<string>();
const source = sourceRef.ref();
</script>

<template>
  <BaseModal name="export">
    <div class="AppPresets">
      <div class="text-md font-bold mb-2">Общие</div>
      <div class="flex flex-col gap-2">
        <BaseTextarea v-model="source" />
      </div>
    </div>
  </BaseModal>
</template>
