<script setup lang="ts">
import AppFileMaps from '@/components/AppFileMaps/AppFileMaps.vue';
import AppMenuObject from '@/components/AppMenuObject/AppMenuObject.vue';
import AppPresets from '@/components/AppPresets/AppPresets.vue';
import AppSearch from '@/components/AppSearch/AppSearch.vue';
import AppTypesParent from '@/components/AppTypesParent/AppTypesParent.vue';
import FormObject from '@/components/FormObject/FormObject.vue';
import FormType from '@/components/FormType/FormType.vue';
import TheEditor from '@/components/TheEditor/TheEditor.vue';
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheMapAsText from '@/components/TheMapAsText/TheMapAsText.vue';
import TheMiniMap from '@/components/TheMiniMap/TheMiniMap.vue';
import FormSettings from '@/components/TheSettings/FormSettings.vue';
import TheSideBar from '@/components/TheSideBar/TheSideBar.vue';
import AppExport from '@/components/AppExport/AppExport.vue';
import { useApplication } from '@/composables/useApplication';
import { useFactories } from '@/composables/useFactories';
// @ts-ignore
import { watch, ref } from 'vue';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { Patron } from 'patron-oop';
import TheSidebarButton from '@/components/TheSidebarButton/TheSidebarButton.vue';
import { DeviceDocument } from '@/modules/application/l1/l2/visualisation/device/Device';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  presets: {
    type: Object,
    default: () => ({}),
  }
});

const emit = defineEmits(['update:modelValue']);

const { fileContent, settings, device } = useApplication();
const { guest, patron } = useFactories();

settings.value((lastSettings) => {
  settings.give({
    ...lastSettings,
    readonly: props.readonly,
    presets: props.presets
  });
})

watch(() => props.modelValue, (value: any) => {
  fileContent.value(guest.create((oldValue: string) => {
    if (value !== oldValue) {
      fileContent.give(value);
    }
  }));
}, {
  immediate: true,
});

fileContent.value(patron.create((newValue: string) => {
  emit('update:modelValue', newValue);
}));

const sidebarOpened = ref(true);

const devicePatron = new VueRefPatron<DeviceDocument>();
device.value(devicePatron);

device.value(new Patron((theDevice) => {
  sidebarOpened.value = theDevice.isDesktop;
}))
</script>

<template>
  <div class="bg-body absolute top-0 left-0 w-full h-full">
    <div class="grid grid-rows-[50px_1fr] h-dvh relative" :class="{'grid-cols-[200px_1fr]': !devicePatron.value.isMobile, 'grid-cols-[1fr]': devicePatron.value.isMobile}">
      <TheHeader class="col-span-2" />
      <TheSideBar v-if="sidebarOpened" :class="{'bg-[#f3f4f6] w-[200px] absolute top-[50px] left-0 z-10 bottom-0': devicePatron.value.isMobile}" @close="sidebarOpened=false" />
      <TheEditor class="w-auto col-auto h-full " />
      <TheMiniMap />
      <TheSidebarButton v-if="devicePatron.value.isMobile" @click="sidebarOpened = !sidebarOpened" />
    </div>
    <FormObject />
    <FormType />
    <FormSettings />
    <AppPresets />
    <AppTypesParent />
    <AppExport />
    <AppMenuObject />
    <TheMapAsText />
    <AppSearch />
    <AppFileMaps />
  </div>
</template>
