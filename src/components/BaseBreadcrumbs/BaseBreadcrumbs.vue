<script lang="ts" setup>
import uniqueId from 'lodash/uniqueId';

const parentNames = [];
const settingsTitle = 'title';
</script>

<template>
  <div>
    <span
      v-for="(title, url) in parentNames"
      :key="url || uniqueId('history_')"
    >
      /
      <RouterLink :to="url">
        {{ title }}
      </RouterLink>
    </span>
    <span>
      /
      {{ settingsTitle }}
    </span>
  </div>
</template>
