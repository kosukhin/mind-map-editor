<script lang="ts" setup>
import {useCurrentMap} from "~/composables";

const {mapName} = useCurrentMap()
</script>

<template>
  <div><a href="/">Главная</a> / {{ mapName }} </div>
</template>
