<script lang="ts" setup>
import { useSharedMap } from '@/composables/useSharedMap';
import { computed } from '@vue/reactivity';
import uniqueId from 'lodash/uniqueId';

const { mapName, map } = useSharedMap();

const mapHistory = computed(() => {
  const link: any = [];
  let result: any = [];
  if (map.value) {
    result = mapName.value.split('_').map((history) => {
      link.push(history);
      return {
        link: [...link],
        name: map.value?.parentNames?.[history] ?? history,
      };
    });
    result[result.length - 1].name = map.value.settings.title;
  }

  return result;
});
</script>

<template>
  <div v-if="mapHistory">
    <RouterLink to="/">{{ $t('general.home') }}</RouterLink>
    <span
      v-for="history in mapHistory"
      :key="history ? history.link : uniqueId('history_')"
    >
      /
      <RouterLink v-if="history" :to="history.link.join('/')">
        {{ history.name }}
      </RouterLink>
    </span>
  </div>
</template>
