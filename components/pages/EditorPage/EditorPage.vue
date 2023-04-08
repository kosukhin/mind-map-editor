<script setup lang="ts">
import { useRuntimeConfig } from '#app/nuxt'
import { watch } from '@vue/runtime-core'
import { ReactiveHead, useSeoMeta } from '@vueuse/head'
import { reactive } from '@vue/reactivity'
import Header from '@/components/view/Header/Header'
import Editor from '@/components/view/Editor/Editor'
import SideBar from '@/components/view/SideBar/SideBar'
import MiniMap from '@/components/view/MiniMap/MiniMap'
import Notify from '~/components/ui/Notify/Notify'
import TypeForm from '~/components/view/TypeForm/TypeForm'
import ObjectForm from '~/components/view/ObjectForm/ObjectForm'
import Modal from '~/components/ui/Modal/Modal'
import {
  SHOW_TEXT,
  SHOW_SETTINGS,
  SHOW_SEARCH,
  SHOW_PARENT_TYPES,
} from '~/constants'
import MapAsText from '~/components/view/MapAsText/MapAsText'
import Settings from '~/components/view/Settings/Settings'
import Search from '~/components/view/Search/Search'
import JsonForm from '~/components/view/JsonForm/JsonForm'
import ParentTypes from '~/components/view/ParentTypes/ParentTypes'
import { useLocks, useMap, useSideBar } from '~/composables'

const { version } = useRuntimeConfig()
const { isClickLocked } = useLocks()
const { isSidebarOpen } = useSideBar()
const { firstMapLoad, map } = useMap()
const head = reactive<ReactiveHead>({
  title: 'Идет загрузка...',
})
useSeoMeta(head)

watch(firstMapLoad, () => {
  map.map((vMap) => {
    head.title = vMap.settings.title
  })
})
</script>

<template>
  <div
    class="EditorPage-SelectionLocker"
    @click="isClickLocked = !isClickLocked"
  >
    <div v-if="!isClickLocked" class="opened">&#128275;</div>
    <div v-if="isClickLocked" class="closed">&#128274;</div>
  </div>
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
