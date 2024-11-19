<script setup lang="ts">
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheSideBar from '@/components/TheSideBar/TheSideBar.vue';
import TheEditor from '@/components/TheEditor/TheEditor.vue';
import TheMiniMap from '@/components/TheMiniMap/TheMiniMap.vue';
import FormObject from '@/components/FormObject/FormObject.vue';
import FormType from '@/components/FormType/FormType.vue';
import FormSettings from '@/components/TheSettings/FormSettings.vue';
import AppPresets from '@/components/AppPresets/AppPresets.vue';
import AppTypesParent from '@/components/AppTypesParent/AppTypesParent.vue';
import AppMenuObject from '@/components/AppMenuObject/AppMenuObject.vue';
import TheMapAsText from '@/components/TheMapAsText/TheMapAsText.vue';
import AppSearch from '@/components/AppSearch/AppSearch.vue';
import AppFileMaps from '@/components/AppFileMaps/AppFileMaps.vue';
import { useApplication } from '@/composables/useApplication';
import { watch } from 'vue';
import { useFactories } from '@/composables/useFactories';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const { fileContent } = useApplication();
const { guest, patron } = useFactories();

watch(() => props.modelValue, (value) => {
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
</script>

<template>
  <div class="grid grid-cols-[200px_1fr] grid-rows-[50px_1fr] h-dvh relative">
    <TheHeader class="col-span-2" />
    <TheSideBar />
    <TheEditor class="w-auto col-auto h-full " />
    <TheMiniMap />
  </div>
  <FormObject />
  <FormType />
  <FormSettings />
  <AppPresets />
  <AppTypesParent />
  <AppMenuObject />
  <TheMapAsText />
  <AppSearch />
  <AppFileMaps />
</template>
