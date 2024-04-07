<script setup lang="ts">
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useOverlay } from '@/composables/useOverlay';
import {
  SHOW_HISTORY_MAPS,
  SHOW_OBJECT_MENU,
  SHOW_SEARCH,
  SHOW_SESSION_LOG,
  SHOW_TEXT,
} from '@/constants/overlays';

const { overlayName } = useOverlay();
</script>

<template>
  <div class="flex items-center p-3 gap-3">
    <img src="/icon-top-bar.png" width="57" height="42" alt="mmc" />
    <BaseBreadcrumbs class="TheHeader-Breadcrumbs" />
    <div class="ml-auto gap-1 flex">
      <BaseButton
        type="success"
        size="sm"
        title="Показать лог сессии"
        class="aspect-square"
        @click="overlayName = SHOW_SESSION_LOG"
      >
        <BaseIcon icon="fa-file-text" />
      </BaseButton>
      <BaseButton
        type="success"
        size="sm"
        class="aspect-square"
        :title="$t('general.menu')"
        @click="overlayName = SHOW_OBJECT_MENU"
      >
        <BaseIcon icon="fa-bars" />
      </BaseButton>
      <BaseButton
        :title="$t('general.byText')"
        type="primary"
        size="sm"
        @click="overlayName = SHOW_TEXT"
      >
        <BaseIcon icon="fa-text-width" />
      </BaseButton>
      <BaseButton size="sm" @click="overlayName = SHOW_SEARCH">
        <BaseIcon icon="fa-search" />
      </BaseButton>
      <BaseButton
        size="sm"
        :title="$t('general.visitHistory')"
        @click="overlayName = SHOW_HISTORY_MAPS"
      >
        <BaseIcon icon="fa-history" />
      </BaseButton>
    </div>
  </div>
</template>
