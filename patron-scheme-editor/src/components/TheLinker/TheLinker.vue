<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const type = 'default';
const { mapObjectsLink } = useApplication();
const objectIds = mapObjectsLink.objectIds(new VueRefPatron<string[]>([])).ref();
</script>

<template>
  <BaseButton :type="type" @click="mapObjectsLink.startLink()">
    {{ objectIds.length === 1 ? 'Выбиретие объект' : (objectIds.length === 2 ? 'Второй объект' : 'Связать объекты') }}
  </BaseButton>
</template>
