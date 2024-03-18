<script setup>
import Editor from 'svgedit/dist/editor/Editor';
import 'svgedit/dist/editor/svgedit.css';
import { onMounted, defineProps, defineEmits } from 'vue';
import { useVModel } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['update:modelValue']);

const data = useVModel(props, 'modelValue', emit);
onMounted(() => {
  const editor = new Editor(document.getElementById('svg-editor'));

  editor.setConfig({
    lang: 'ru',
    allowInitialUserOverride: false,
    extensions: [],
    noDefaultExtensions: true,
    imgPath: '/images',
  });
  editor.init();

  setTimeout(() => {
    editor.loadFromString(String(data.value.svg));
    editor.svgCanvas.bind('changed', () => {
      data.value.svg = editor.svgCanvas.getSvgString();
      data.value.width = editor.svgCanvas.contentW;
      data.value.height = editor.svgCanvas.contentH;
    });
  });
});
</script>

<template>
  <div id="svg-editor" class="AppSvgEditor"></div>
</template>

<style lang="scss" scoped>
@import 'AppSvgEditor';
</style>
