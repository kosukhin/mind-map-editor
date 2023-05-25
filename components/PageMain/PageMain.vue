<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import debounce from 'lodash/debounce'
import { watch } from '@vue/runtime-core'
import { useSeoMeta } from '@vueuse/head'
import { urlTrim } from '~/utils'
import {
  useRequestCreateMap,
  useRequestGetMaps,
  useRequestSearch,
} from '~/composables'
import BaseButton from '~/components/BaseButton/BaseButton.vue'
import BaseInput from '~/components/BaseInput/BaseInput.vue'

useSeoMeta({
  title: 'Главная страница',
})

const { getMaps } = useRequestGetMaps()
const maps = await getMaps()

const { search } = useRequestSearch()
const searchQuery = ref('')
const lastSearchDate = ref('')
const searchResults = ref<{ url: string; name: string }[]>([])
watch(
  searchQuery,
  debounce(async () => {
    if (!searchQuery.value) {
      return
    }

    const result = await search(searchQuery.value)
    lastSearchDate.value = new Date().toLocaleString()

    if (result.response.length) {
      searchResults.value = result.response.map((res) => {
        const parts = res.ref.split('|')
        return {
          name: parts[0],
          url: urlTrim(parts[1]),
        }
      })
    } else {
      searchResults.value = []
    }
  }, 500)
)

const newMapName = ref('')
const { createMap } = useRequestCreateMap()
const onCreateMap = async () => {
  const response = await createMap(newMapName.value)

  if (response.ok) {
    location.href = `/${response.document}`
  }
}
</script>

<template>
  <div class="PageMain">
    <h2 class="PageMain-Title">Mind-Map-Creator</h2>
    <div class="PageMain-Row">
      <a href="/api/create-search-index" target="_blank">Обновить индекс</a>
    </div>
    <div class="PageMain-Row">
      <BaseInput v-model="searchQuery" placeholder="Поиск в картах" />
    </div>
    <div v-if="lastSearchDate" class="PageMain-Row">
      Время последнего поиска: {{ lastSearchDate }}
    </div>
    <div
      v-for="result in searchResults"
      :key="result.url + result.name"
      class="PageMain-Row"
    >
      <a :href="result.url">{{ result.name }}</a>
    </div>
    <h3 class="PageMain-SubTitle">Существующие карты</h3>
    <div class="PageMain-Files">
      <div
        v-for="file in maps.files"
        :key="file.url + file.name"
        class="PageMain-File"
      >
        <a :href="file.url">{{ file.name }}</a>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <div class="PageMain-NewMap">
      <BaseInput
        v-model="newMapName"
        placeholder="Введите название новой карты"
      />
      <BaseButton class="PageMain-Button" type="primary" @click="onCreateMap">
        Создать
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'PageMain';
</style>
