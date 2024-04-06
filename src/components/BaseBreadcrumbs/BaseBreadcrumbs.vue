<script lang="ts" setup>
import { useMap } from '@/composables/useMap';
import uniqueId from 'lodash/uniqueId';

const { map } = useMap();
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
