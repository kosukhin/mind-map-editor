<script lang="ts" setup>
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const {
  breadcrumbs, mapCurrentID,
} = useApplication();

const list = breadcrumbs.list(new VueRefPatron<{title: string, name: string}[]>()).ref();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <span class="flex gap-2" v-for="(item, index) in list" :key="item.name">
      <span v-if="index !== 0">/</span>
      <b v-if="index === list.length - 1">Открыто: {{ item.title }}</b>
      <a v-else href="#" @click.prevent="mapCurrentID.give(item.name)">
        {{ item.title }}
      </a>
    </span>
  </div>
</template>
