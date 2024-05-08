<script lang="ts" setup>
import { SHOW_OBJECT_MENU } from '@/constants/overlays';
import { useMapMenu } from '@/app/useMapMenu';
import { mapController } from '@/modulesHigh/map/mapController';
import { overlayController } from '@/modulesHigh/overlay/overlayController';
import { compose } from 'lodash/fp';

overlayController.autoClose(SHOW_OBJECT_MENU);
const { menuItems } = useMapMenu();
const selectMenuItem = compose(overlayController.close, mapController.scrollToObject);
</script>

<template>
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
        @click.prevent="selectMenuItem(item.id)"
      >
        {{ item.additionalName ? item.additionalName : item.name }}
      </a>
    </div>
  </div>
</template>
