<script lang="ts" setup>
import { SHOW_OBJECT_MENU } from '@/constants/overlays';
import { useMapMenu } from '@/app/useMapMenu';
import { overlayController } from '@/modulesHigh/overlay/overlayController';
import { useMapBehaviour } from '@/app/useMapBehaviour';

overlayController.autoClose(SHOW_OBJECT_MENU);
const { menuItems } = useMapMenu();
const { moveToObject } = useMapBehaviour();
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
        @click.prevent="moveToObject(item.id)"
      >
        <span v-html="item.additionalName ? item.additionalName : item.name"></span>
      </a>
    </div>
  </div>
</template>
