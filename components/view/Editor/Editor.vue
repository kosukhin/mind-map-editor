<script setup lang="ts">
import { useMapRenderer, useLayerListeners } from '~/composables'
import { CANVAS_DOM_ID } from '~/constants'

useMapRenderer()
useLayerListeners()
</script>

<template>
  <div :id="CANVAS_DOM_ID" :key="'editor-canvas'"></div>
</template>
