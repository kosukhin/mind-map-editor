<script setup lang="ts">
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { useFactories } from '@/composables/useFactories';

const {
  drawer, modal, mapHistory, controlCombo,
} = useApplication();
const { patron, guest } = useFactories();

const isNextPossible = mapHistory.isNextPossible(new VueRefPatron()).ref();
const isPrevPossible = mapHistory.isPrevPossible(new VueRefPatron()).ref();

controlCombo.happened(
  'KeyZ',
  patron.create(guest.create(() => {
    if (isPrevPossible.value) {
      mapHistory.prev();
    }
  })),
);
controlCombo.happened(
  'KeyP',
  patron.create(guest.create(() => {
    if (isNextPossible.value) {
      mapHistory.next();
    }
  })),
);
</script>

<template>
  <div class="flex items-center p-3 gap-3">
    <img src="/icon-top-bar.png" width="57" height="42" alt="mmc" />
    <BaseBreadcrumbs class="TheHeader-Breadcrumbs" />
    <div class="ml-auto gap-1 flex">
      <BaseButton
        v-if="isNextPossible"
        size="sm"
        title="Отменить последнее действие"
        class="w-7 block"
        @click="mapHistory.next()"
      >
        <BaseIcon icon="fa-rotate-left" />
      </BaseButton>
      <BaseButton
        v-if="isPrevPossible"
        size="sm"
        title="Вернуть отмененное действие"
        class="w-7 block"
        @click="mapHistory.prev()"
      >
        <BaseIcon icon="fa-rotate-right" />
      </BaseButton>
      <BaseButton
        type="success"
        size="sm"
        class="w-7 block e2e-open-menu"
        :title="$t('general.menu')"
        @click="drawer.receive('menu')"
      >
        <BaseIcon icon="fa-bars" />
      </BaseButton>
      <BaseButton
        :title="$t('general.byText')"
        type="primary"
        size="sm"
        class="w-7 block"
        @click="modal.receive('mapAsText')"
      >
        <BaseIcon icon="fa-text-width" />
      </BaseButton>
      <BaseButton
        class="w-7 block e2e-search"
        size="sm"
        @click="modal.receive('search')"
      >
        <BaseIcon icon="fa-search" />
      </BaseButton>
      <BaseButton
        size="sm"
        :title="'Все карты файла'"
        class="w-7 block"
        @click="drawer.receive('fileMaps')"
      >
        <BaseIcon icon="fa-map" />
      </BaseButton>
    </div>
  </div>
</template>
