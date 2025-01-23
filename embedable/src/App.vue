<script setup>
import { PatronSchemeEditor } from 'patron-scheme-editor';
import { ref } from 'vue';

const content = ref(window.content ?? '');
</script>

<template>
  <PatronSchemeEditor style="font: 14px Arial, sans-serif" v-model="content" readonly />
</template>
