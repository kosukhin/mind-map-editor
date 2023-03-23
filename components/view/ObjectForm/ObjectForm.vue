<script lang="ts" setup>
import {useMapObjects} from "~/composables";

const {currentObject} = useMapObjects();
</script>

<template>
  <div class="ObjectForm">
    <div class="ObjectForm-Title">Название</div>
    <div class="ObjectForm-Description">{{ currentObject.name }}</div>
    <div class="ObjectForm-Title">Описание</div>
    <div class="ObjectForm-Description">{{ currentObject.description }}</div>
  </div>
</template>

<style scoped lang="scss">
@import "ObjectForm";
</style>
