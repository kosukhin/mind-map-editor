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
  SHOW_TYPE,
  SHOW_TEXT,
  SHOW_SETTINGS,
  SHOW_OBJECT,
  SHOW_SEARCH,
  SHOW_PARENT_TYPES
} from "~/constants";
import MapAsText from "~/components/view/MapAsText/MapAsText.vue";
import Settings from "~/components/view/Settings/Settings.vue";
import Search from "~/components/view/Search/Search.vue";
import JsonForm from '~/components/view/JsonForm/JsonForm.vue';
import ParentTypes from "~/components/view/ParentTypes/ParentTypes.vue";
import {useRuntimeConfig} from "#app/nuxt";
import {ref} from "@vue/reactivity";

const {version} = useRuntimeConfig();
const isSidebarOpen = ref(false);
</script>

<template>
  <div class="EditorPage-SideBarOpener" @click="isSidebarOpen = !isSidebarOpen">
    <hr><hr><hr>
  </div>
  <div class="EditorPage">
    <Header class="EditorPage-Header"/>
    <SideBar :class="['EditorPage-SideBar', {opened: isSidebarOpen}]"/>
    <Editor class="EditorPage-Editor"/>
    <MiniMap class="EditorPage-MiniMap"/>
  </div>
  <Notify/>
  <Modal :name="SHOW_TYPE">
    <template #header>
      <h2>Тип карты</h2>
    </template>
    <TypeForm/>
  </Modal>
  <Modal :name="SHOW_PARENT_TYPES">
    <template #header>
      <h2>Родительские типы</h2>
    </template>
    <ParentTypes/>
  </Modal>
  <Modal :name="SHOW_TEXT">
    <template #header>
      <h2>Вся карта текстом</h2>
    </template>
    <MapAsText/>
  </Modal>
  <Modal :name="SHOW_SETTINGS">
    <template #header>
      <h2>Настройки карты, {{ version }}</h2>
    </template>
    <Settings/>
  </Modal>
  <Modal :name="SHOW_SEARCH">
    <template #header>
      <h2>Поиск по карте</h2>
    </template>
    <Search/>
  </Modal>
  <JsonForm/>
  <Drawer :name="SHOW_OBJECT">
    <ObjectForm/>
  </Drawer>
</template>

<style scoped lang="scss">
@import "EditorPage";
</style>
