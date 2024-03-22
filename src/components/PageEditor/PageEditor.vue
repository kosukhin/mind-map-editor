<script setup lang="ts">
import AppMenuObject from '@/components/AppMenuObject/AppMenuObject.vue';
import AppSearch from '@/components/AppSearch/AppSearch.vue';
import AppTypesParent from '@/components/AppTypesParent/AppTypesParent.vue';
import BaseDrawer from '@/components/BaseDrawer/BaseDrawer.vue';
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import BaseNotify from '@/components/BaseNotify/BaseNotify.vue';
import FormJson from '@/components/FormJson/FormJson.vue';
import FormObject from '@/components/FormObject/FormObject.vue';
import FormType from '@/components/FormType/FormType.vue';
import TheEditor from '@/components/TheEditor/TheEditor.vue';
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheHistoryMaps from '@/components/TheHistoryMaps/TheHistoryMaps.vue';
import TheKeybindings from '@/components/TheKeybindings/TheKeybindings.vue';
import TheMapAsText from '@/components/TheMapAsText/TheMapAsText.vue';
import TheMiniMap from '@/components/TheMiniMap/TheMiniMap.vue';
import TheObjectTransfer from '@/components/TheObjectTransfer/TheObjectTransfer.vue';
import TheSettings from '@/components/TheSettings/TheSettings.vue';
import TheSideBar from '@/components/TheSideBar/TheSideBar.vue';
import { useMoveToObject } from '@/composables/useMoveToObject';
import { useProject } from '@/composables/useProject';
import { useSharedHashChange } from '@/composables/useSharedHashChange';
import { useSharedKeybindings } from '@/composables/useSharedKeybindings';
import { useSharedLocks } from '@/composables/useSharedLocks';
import { useSharedMap } from '@/composables/useSharedMap';
import { useSharedMeta } from '@/composables/useSharedMeta';
import { useSharedOverlay } from '@/composables/useSharedOverlay';
import { useSharedSideBar } from '@/composables/useSharedSideBar';
import {
  SHOW_HISTORY_MAPS,
  SHOW_KEYBINDINGS,
  SHOW_OBJECT_MENU, SHOW_PARENT_TYPES, SHOW_SEARCH, SHOW_SETTINGS,
} from '@/constants/overlays';
import { getLocation } from '@/utils/globals';
import { watch } from '@vue/runtime-core';

useSharedMeta();

const { scrollToObject } = useMoveToObject();
const { hashChanged } = useSharedHashChange();
watch(hashChanged, () => {
  if (hashChanged.value) {
    scrollToObject(hashChanged.value);
  }
});

const { overlayName } = useSharedOverlay();
const { ctrlFFired, ctrlMFired, ctrlHFired } = useSharedKeybindings();
watch(ctrlFFired, () => {
  overlayName.value = SHOW_SEARCH;
});
watch(ctrlMFired, () => {
  overlayName.value = SHOW_OBJECT_MENU;
});
watch(ctrlHFired, () => {
  overlayName.value = SHOW_HISTORY_MAPS;
});

const { isDragLocked } = useSharedLocks();
const handleLock = () => {
  isDragLocked.value = !isDragLocked.value;
  setTimeout(() => getLocation().reload());
};

const version = '0.1';
const { isSidebarOpen } = useSharedSideBar();

const { isProjectOpened, loadProjectFiles } = useProject();
const { openMapOfCurrentUrl } = useSharedMap();
[!isProjectOpened.value].filter(Boolean).forEach(() => {
  loadProjectFiles().then(() => {
    openMapOfCurrentUrl();
  });
});
</script>

<template>
  <div
    class="PageEditor-SelectionLocker"
    :class="{ 'PageEditor-SelectionLocker_Locked': isDragLocked }"
    @click="handleLock"
  >
    <div v-if="!isDragLocked" class="opened">&#128275;</div>
    <div v-if="isDragLocked" class="closed">&#128274;</div>
  </div>
  <div class="PageEditor-SideBarOpener" @click="isSidebarOpen = !isSidebarOpen">
    <hr />
    <hr />
    <hr />
  </div>
  <div class="PageEditor">
    <TheHeader class="PageEditor-Header" />
    <TheSideBar :class="['PageEditor-SideBar', { opened: isSidebarOpen }]" />
    <TheEditor class="PageEditor-Editor" />
    <TheMiniMap class="PageEditor-MiniMap" />
  </div>
  <BaseNotify />
  <FormType />
  <BaseDrawer :name="SHOW_OBJECT_MENU" direction="rtl">
    <template #header>
      <h2>{{ $t('general.menu') }}</h2>
    </template>
    <AppMenuObject />
  </BaseDrawer>
  <BaseModal :name="SHOW_KEYBINDINGS">
    <template #header>
      <h2>{{ $t('general.keybindings') }}</h2>
    </template>
    <TheKeybindings />
  </BaseModal>
  <BaseModal :name="SHOW_PARENT_TYPES">
    <template #header>
      <h2>{{ $t('general.parentTypes') }}</h2>
    </template>
    <AppTypesParent />
  </BaseModal>
  <TheMapAsText />
  <BaseModal :name="SHOW_SETTINGS">
    <template #header>
      <h2>{{ $t('general.mapSettings') }}, {{ version }}</h2>
    </template>
    <TheSettings />
  </BaseModal>
  <BaseModal :name="SHOW_SEARCH">
    <template #header>
      <h2>{{ $t('general.mapSearch') }}</h2>
    </template>
    <AppSearch />
  </BaseModal>
  <FormJson />
  <FormObject />
  <TheHistoryMaps />
  <TheObjectTransfer />
</template>

<style scoped lang="scss">
@import 'PageEditor';
</style>
