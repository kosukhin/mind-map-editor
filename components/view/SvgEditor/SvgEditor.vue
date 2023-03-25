<script setup>
import Editor from 'svgedit/dist/editor/Editor';
import 'svgedit/dist/editor/svgedit.css';
import { onMounted } from "@vue/runtime-core";
import { useVModel } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: String,
  },
  size: {
    type: Array,
  }
});

const emit = defineEmits([
  'update:modelValue',
  'update:size'
]);

const data = useVModel(props, 'modelValue', emit);
const sizeData = useVModel(props, 'size', emit);

onMounted(() => {
  const editor = new Editor(document.getElementById('svg-editor'));
  editor.init();
  editor.loadFromString(String(data.value));
  editor.setConfig({
    lang: 'ru',
    allowInitialUserOverride: false,
    extensions: [],
    noDefaultExtensions: true,
  });

  setTimeout(() => {
    editor.svgCanvas.bind('changed', () => {
      data.value = editor.svgCanvas.getSvgString();
      sizeData.value[0] = editor.svgCanvas.contentW;
      sizeData.value[1] = editor.svgCanvas.contentH;
    })
  })
});
</script>

<template>
  <div class="SvgEditor" id="svg-editor"></div>
</template>

<style lang="scss" scoped>
@import "SvgEditor";
</style>
