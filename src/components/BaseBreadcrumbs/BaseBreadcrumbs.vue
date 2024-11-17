<script lang="ts" setup>
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const {
  breadcrumbs, mapCurrentID,
} = useApplication();

const list = breadcrumbs.list(new VueRefPatron<{title: string, name: string}[]>()).ref();
</script>

<template>
  <div>
    <span v-for="item in list" :key="item.name">
      /
      <a href="#" @click.prevent="mapCurrentID.give(item.name)">
        {{ item.title }}
      </a>
    </span>
  </div>
</template>
