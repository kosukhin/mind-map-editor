<script lang="ts" setup>
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import BaseDrawer from '@/components/BaseDrawer/BaseDrawer.vue';
import { useApplication } from '@/composables/useApplication';
import { useFactories } from '@/composables/useFactories';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const {
  controlCombo, drawer, menu, stagePosition,
} = useApplication();
const { guest, patron } = useFactories();

const menuItems = menu.menuObjects(new VueRefPatron<MapObjectDocument[]>()).ref();

controlCombo.happened(
  'KeyM',
  patron.create(guest.create(() => {
    drawer.receive('menu');
  })),
);
</script>

<template>
  <BaseDrawer direction="rtl" name="menu">
    <div class="AppMenuObject">
      <div v-if="!menuItems.length" class="AppMenuObject-Empty">
        {{ $t('appMenuObject.noItems') }}
      </div>
      <div v-else class="flex flex-col gap-1">
        <a
          v-for="item in menuItems"
          :key="item.id"
          class="AppMenuObject-Item"
          href="#"
          @click.prevent="stagePosition.receive(item);drawer.receive('')"
        >
          <span v-html="item.additionalName ? item.additionalName : item.name"></span>
        </a>
      </div>
    </div>
  </BaseDrawer>
</template>
