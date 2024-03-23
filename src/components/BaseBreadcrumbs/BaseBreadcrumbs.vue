<script lang="ts" setup>
import { useSharedMap } from '@/composables/useSharedMap';
import uniqueId from 'lodash/uniqueId';

const { map } = useSharedMap();
</script>

<template>
  <div>
    <span
      v-for="(title, url) in map?.parentNames"
      :key="url || uniqueId('history_')"
    >
      /
      <RouterLink :to="url">
        {{ title }}
      </RouterLink>
    </span>
    <span>
      /
      {{ map?.settings.title }}
    </span>
  </div>
</template>
