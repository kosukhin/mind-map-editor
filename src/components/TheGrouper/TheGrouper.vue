<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';

const type = 'default';
const isGrouping = false;
const title = 'Группировать';
</script>

<template>
  <div v-if="isGrouping" key="grouper-panel" class="TheGrouper-Panel">
    <BaseButton class="w-full" type="primary">
      {{ $t('general.clone') }}
    </BaseButton>
  </div>
  <BaseButton class="w-full" :type="type"> {{ title }} </BaseButton>
</template>
