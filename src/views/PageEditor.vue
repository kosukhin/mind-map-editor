<script setup lang="ts">
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheSideBar from '@/components/TheSideBar/TheSideBar.vue';
import TheEditor from '@/components/TheEditor/TheEditor.vue';
import TheMiniMap from '@/components/TheMiniMap/TheMiniMap.vue';
import BaseNotify from '@/components/BaseNotify/BaseNotify.vue';
import FormObject from '@/components/FormObject/FormObject.vue';
</script>

<template>
  <div class="grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative">
    <TheHeader class="col-span-2" />
    <TheSideBar />
    <TheEditor class="w-auto col-auto h-full " />
    <TheMiniMap />
  </div>
  <BaseNotify />
  <FormObject />
</template>
