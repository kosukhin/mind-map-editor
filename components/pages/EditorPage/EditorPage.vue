<script setup lang="ts">
import Header from '@/components/view/Header/Header';
import Editor from '@/components/view/Editor/Editor.vue';
import SideBar from '@/components/view/SideBar/SideBar.vue';
import MiniMap from '@/components/view/MiniMap/MiniMap.vue';
import Notify from "~/components/ui/Notify/Notify.vue";
import TypeForm from "~/components/view/TypeForm/TypeForm.vue";
import ObjectForm from "~/components/view/ObjectForm/ObjectForm.vue";
import Drawer from "~/components/ui/Drawer/Drawer.vue";
import Modal from "~/components/ui/Modal/Modal.vue";
import {
  SHOW_JSON,
  SHOW_TYPE,
  SHOW_TEXT,
  SHOW_SETTINGS,
  SHOW_OBJECT,
  SHOW_SEARCH
} from "~/constants";
import MapAsText from "~/components/view/MapAsText/MapAsText.vue";
import Settings from "~/components/view/Settings/Settings.vue";
import Search from "~/components/view/Search/Search.vue";
import JsonForm from '~/components/view/JsonForm/JsonForm.vue';
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
    <MapAsText/>
  </Modal>
  <Modal :name="SHOW_SETTINGS">
    <Settings/>
  </Modal>
  <Modal :name="SHOW_SEARCH">
    <Search/>
  </Modal>
  <Modal :name="SHOW_JSON">
    <JsonForm/>
  </Modal>
  <Drawer :name="SHOW_OBJECT">
    <ObjectForm/>
  </Drawer>
</template>

<style scoped lang="scss">
@import "EditorPage";
</style>
