<script lang="ts" setup>
import Input from "~/components/ui/Input/Input";
import {ref} from "@vue/reactivity";
import {getMaps} from "~/requests/getMaps";

const searchQuery = ref('');
const maps = await getMaps();
</script>

<template>
  <div class="MainPage">
    <h2 class="MainPage-Title">Mind-Map-Creator</h2>
    <div class="MainPage-Row">
      <Input v-model="searchQuery" placeholder="Поиск в картах" />
    </div>
    <h3 class="MainPage-SubTitle">Существующие карты</h3>
    <div class="MainPage-Files">
      <div class="MainPage-File" v-for="file in maps.files">
        <a :href="file.url">{{ file.name }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "MainPage";
</style>
