<script setup>
import { PatronSchemeEditor } from 'patron-scheme-editor';
import { ref } from 'vue';

const content = ref(window.content ?? '');
</script>

<template>
  <PatronSchemeEditor v-model="content" readonly />
</template>
