<script setup>
import Editor from 'svgedit/dist/editor/Editor';
import 'svgedit/dist/editor/svgedit.css';
import { onMounted } from "@vue/runtime-core";

const props = defineProps({
  svg: {
    type: String,
    required: true,
  }
})

onMounted(() => {
  const editor = new Editor(document.getElementById('svg-editor'));
  editor.init();
  editor.loadFromString(props.svg);
  editor.setConfig({
    lang: 'ru',
    allowInitialUserOverride: false,
    extensions: [],
    noDefaultExtensions: false,
  });
});
</script>

<template>
  <div class="SvgEditor" id="svg-editor"></div>
</template>

<style lang="scss" scoped>
@import "SvgEditor";
</style>
