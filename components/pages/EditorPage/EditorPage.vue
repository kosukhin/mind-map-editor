<script setup lang="ts">
import Header from '@/components/view/Header/Header';
import Editor from '@/components/view/Editor/Editor';
import SideBar from '@/components/view/SideBar/SideBar';
import MiniMap from '@/components/view/MiniMap/MiniMap';
import Notify from "~/components/ui/Notify/Notify.vue";
import TypeForm from "~/components/view/TypeForm/TypeForm.vue";
import ObjectForm from "~/components/view/ObjectForm/ObjectForm.vue";
import Drawer from "~/components/ui/Drawer/Drawer.vue";
import Modal from "~/components/ui/Modal/Modal.vue";
import {SHOW_TYPE, SHOW_TEXT, SHOW_OBJECT} from "~/constants";
import MapAsText from "~/components/view/MapAsText/MapAsText.vue";
</script>

<template>
  <div class="EditorPage">
    <Header class="EditorPage-Header"/>
    <SideBar class="EditorPage-SideBar"/>
    <Editor class="EditorPage-Editor"/>
    <MiniMap class="EditorPage-MiniMap"/>
  </div>
  <Notify/>
  <Modal :name="SHOW_TYPE">
    <TypeForm/>
  </Modal>
  <Modal :name="SHOW_TEXT">
    <MapAsText />
  </Modal>
  <Drawer :name="SHOW_OBJECT">
    <ObjectForm/>
  </Drawer>
</template>

<style scoped lang="scss">
@import "EditorPage";
</style>
