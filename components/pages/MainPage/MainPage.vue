<script lang="ts" setup>
import Input from "~/components/ui/Input/Input";
import {ref} from "@vue/reactivity";
import {getMaps} from "~/requests/getMaps";
import debounce from "lodash/debounce";
import {watch} from "@vue/runtime-core";
import {search} from "~/requests/search";
import {useSeoMeta} from "@vueuse/head";
import {urlTrim} from "~/utils";

const searchQuery = ref('');
const maps = await getMaps();
const searchResults = ref<{url: string, name: string}[]>([]);

useSeoMeta({
  title: 'Главная страница',
})

watch(searchQuery, debounce(async () => {
  if (!searchQuery.value) {
    return;
  }

  const result = await search(searchQuery.value);

  if (result.response.length) {
    searchResults.value = result.response.map(res => {
      const parts = res.ref.split('|');
      return {
        name: parts[0],
        url: urlTrim(parts[1])
      }
    })
  }
}, 500));
</script>

<template>
  <div class="MainPage">
    <h2 class="MainPage-Title">Mind-Map-Creator</h2>
    <div class="MainPage-Row">
      <a href="/api/create-search-index" target="_blank">Обновить индекс</a>
    </div>
    <div class="MainPage-Row">
      <Input v-model="searchQuery" placeholder="Поиск в картах" />
    </div>
    <div class="MainPage-Row" v-for="result in searchResults">
      <a :href="result.url">{{ result.name }}</a>
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
