<script setup lang="ts">
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheSideBar from '@/components/TheSideBar/TheSideBar.vue';
import TheEditor from '@/components/TheEditor/TheEditor.vue';
import TheMiniMap from '@/components/TheMiniMap/TheMiniMap.vue';
import FormObject from '@/components/FormObject/FormObject.vue';
import FormType from '@/components/FormType/FormType.vue'; </script>

<template>
  <div class="grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative">
    <TheHeader class="col-span-2" />
    <TheSideBar />
    <TheEditor class="w-auto col-auto h-full " />
    <TheMiniMap />
  </div>
  <FormObject />
  <FormType />
</template>
