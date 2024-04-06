<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faBars, faTextWidth, faFileText, faSearch, faHistory, faPlusSquare, faCog, IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

const icons: Record<string, IconDefinition> = {
  'fa-bars': faBars,
  'fa-text-width': faTextWidth,
  'fa-search': faSearch,
  'fa-history': faHistory,
  'fa-plus-square': faPlusSquare,
  'fa-cog': faCog,
  'fa-file-text': faFileText,
};

defineProps({
  icon: {
    type: String,
  },
});
</script>

<template>
  <FontAwesomeIcon :icon="icons[icon]" />
</template>
