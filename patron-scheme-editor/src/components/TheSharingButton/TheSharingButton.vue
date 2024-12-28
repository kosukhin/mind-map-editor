<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useSharing } from '@/composables/useSharing';

const { sharedFile } = useSharing();
</script>

<template>
  <div
    class="absolute bg-body hover:bg-border cursor-pointer border-solid border-border bottom-[150px] right-[60px] p-3 w-15 h-15"
    @click="sharedFile.do()"
  >
    <BaseIcon icon="fa-share-nodes" />
  </div>
</template>
