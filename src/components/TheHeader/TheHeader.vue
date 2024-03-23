<script setup lang="ts">
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useSharedOverlay } from '@/composables/useSharedOverlay';
import {
  SHOW_HISTORY_MAPS, SHOW_OBJECT_MENU, SHOW_SEARCH, SHOW_TEXT,
} from '@/constants/overlays';

const { overlayName } = useSharedOverlay();
</script>

<template>
  <div class="TheHeader">
    <RouterLink to="/">
      <img src="/icon-top-bar.png" width="57" height="42" alt="mmc" />
    </RouterLink>
    <BaseBreadcrumbs class="TheHeader-Breadcrumbs" />
    <div class="TheHeader-Actions">
      <BaseButton
        type="success"
        size="sm"
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

<style scoped lang="scss">
@import 'TheHeader';
</style>
