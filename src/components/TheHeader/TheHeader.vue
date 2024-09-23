<script setup lang="ts">
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';

</script>

<template>
  <div class="flex items-center p-3 gap-3">
    <img src="/icon-top-bar.png" width="57" height="42" alt="mmc" />
    <BaseBreadcrumbs class="TheHeader-Breadcrumbs" />
    <div class="ml-auto gap-1 flex">
      <BaseButton
        size="sm"
        title="Отменить последнее действие"
        class="w-7 block"
      >
        <BaseIcon icon="fa-rotate-left" />
      </BaseButton>
      <BaseButton
        size="sm"
        title="Вернуть отмененное действие"
        class="w-7 block"
      >
        <BaseIcon icon="fa-rotate-right" />
      </BaseButton>
      <BaseButton
        type="success"
        size="sm"
        title="Показать лог уведомлений"
        class="w-7 block"
      >
        <BaseIcon icon="fa-file-text" />
      </BaseButton>
      <BaseButton
        type="success"
        size="sm"
        class="w-7 block e2e-open-menu"
        :title="$t('general.menu')"
      >
        <BaseIcon icon="fa-bars" />
      </BaseButton>
      <BaseButton
        :title="$t('general.byText')"
        type="primary"
        size="sm"
        class="w-7 block"
      >
        <BaseIcon icon="fa-text-width" />
      </BaseButton>
      <BaseButton
        class="w-7 block e2e-search"
        size="sm"
      >
        <BaseIcon icon="fa-search" />
      </BaseButton>
      <BaseButton
        size="sm"
        :title="$t('general.visitHistory')"
        class="w-7 block"
      >
        <BaseIcon icon="fa-history" />
      </BaseButton>
    </div>
  </div>
</template>
