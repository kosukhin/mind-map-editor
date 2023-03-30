<script setup lang="ts">
import { useRuntimeConfig } from '#app/nuxt'
import { watch } from '@vue/runtime-core'
import { useSeoMeta } from '@vueuse/head'
import Header from '@/components/view/Header/Header'
import Editor from '@/components/view/Editor/Editor.vue'
import SideBar from '@/components/view/SideBar/SideBar.vue'
import MiniMap from '@/components/view/MiniMap/MiniMap.vue'
import Notify from '~/components/ui/Notify/Notify.vue'
import TypeForm from '~/components/view/TypeForm/TypeForm.vue'
import ObjectForm from '~/components/view/ObjectForm/ObjectForm.vue'
import Modal from '~/components/ui/Modal/Modal.vue'
import {
  SHOW_TEXT,
  SHOW_SETTINGS,
  SHOW_SEARCH,
  SHOW_PARENT_TYPES,
} from '~/constants'
import MapAsText from '~/components/view/MapAsText/MapAsText.vue'
import Settings from '~/components/view/Settings/Settings.vue'
import Search from '~/components/view/Search/Search.vue'
import JsonForm from '~/components/view/JsonForm/JsonForm.vue'
import ParentTypes from '~/components/view/ParentTypes/ParentTypes.vue'
import { useCurrentMap, useSideBar } from '~/composables'

const { version } = useRuntimeConfig()
const { isSidebarOpen } = useSideBar()
const { firstMapLoad, map } = useCurrentMap()

watch(firstMapLoad, () => {
  map.map((vMap) => {
    useSeoMeta({
      title: vMap.settings.title,
    })
  })
})
</script>

<template>
  <div class="EditorPage-SideBarOpener" @click="isSidebarOpen = !isSidebarOpen">
    <hr />
    <hr />
    <hr />
  </div>
  <div class="EditorPage">
    <Header class="EditorPage-Header" />
    <SideBar :class="['EditorPage-SideBar', { opened: isSidebarOpen }]" />
    <Editor class="EditorPage-Editor" />
    <MiniMap class="EditorPage-MiniMap" />
  </div>
  <Notify />
  <TypeForm />
  <Modal :name="SHOW_PARENT_TYPES">
    <template #header>
      <h2>Родительские типы</h2>
    </template>
    <ParentTypes />
  </Modal>
  <Modal :name="SHOW_TEXT">
    <template #header>
      <h2>Вся карта текстом</h2>
    </template>
    <MapAsText />
  </Modal>
  <Modal :name="SHOW_SETTINGS">
    <template #header>
      <h2>Настройки карты, {{ version }}</h2>
    </template>
    <Settings />
  </Modal>
  <Modal :name="SHOW_SEARCH">
    <template #header>
      <h2>Поиск по карте</h2>
    </template>
    <Search />
  </Modal>
  <JsonForm />
  <ObjectForm />
</template>

<style scoped lang="scss">
@import 'EditorPage';
</style>
