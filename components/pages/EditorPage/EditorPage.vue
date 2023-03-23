<script setup lang="ts">
import Header from '@/components/view/Header/Header';
import Editor from '@/components/view/Editor/Editor';
import SideBar from '@/components/view/SideBar/SideBar';
import MiniMap from '@/components/view/MiniMap/MiniMap';
import Notify from "~/components/ui/Notify/Notify.vue";
</script>

<template>
  <div class="EditorPage">
    <Header class="EditorPage-Header" />
    <SideBar class="EditorPage-SideBar" />
    <Editor class="EditorPage-Editor" />
    <MiniMap class="EditorPage-MiniMap" />
  </div>
  <Notify />
</template>

<style scoped lang="scss">
@import "EditorPage";
</style>
