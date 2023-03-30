<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import debounce from 'lodash/debounce'
import { watch } from '@vue/runtime-core'
import { useSeoMeta } from '@vueuse/head'
import { search } from '~/requests/search'
import { getMaps } from '~/requests/getMaps'
import Input from '~/components/ui/Input/Input'
import { urlTrim } from '~/utils'

const searchQuery = ref('')
const maps = await getMaps()
const searchResults = ref<{ url: string; name: string }[]>([])

useSeoMeta({
  title: 'Главная страница',
})

watch(
  searchQuery,
  debounce(async () => {
    if (!searchQuery.value) {
      return
    }

    const result = await search(searchQuery.value)

    if (result.response.length) {
      searchResults.value = result.response.map((res) => {
        const parts = res.ref.split('|')
        return {
          name: parts[0],
          url: urlTrim(parts[1]),
        }
      })
    }
  }, 500)
)
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
    <div v-for="result in searchResults" class="MainPage-Row">
      <a :href="result.url">{{ result.name }}</a>
    </div>
    <h3 class="MainPage-SubTitle">Существующие карты</h3>
    <div class="MainPage-Files">
      <div v-for="file in maps.files" class="MainPage-File">
        <a :href="file.url">{{ file.name }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'MainPage';
</style>
