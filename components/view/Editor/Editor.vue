<script setup lang="ts">
import { useCurrentMapRenderer, useLayerListeners } from '~/composables'
import { CANVAS_DOM_ID } from '~/constants'

useCurrentMapRenderer()
useLayerListeners()
</script>

<template>
  <div :id="CANVAS_DOM_ID" :key="'editor-canvas'"></div>
</template>
