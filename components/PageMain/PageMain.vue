<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity'
import debounce from 'lodash/debounce'
import { watch } from '@vue/runtime-core'
import { useSeoMeta } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { calculateProgressBg, urlTrim } from '~/utils'
import {
  useRequestCreateMap,
  useRequestGetMaps,
  useRequestSearch,
} from '~/composables'
import BaseButton from '~/components/BaseButton/BaseButton.vue'
import BaseInput from '~/components/BaseInput/BaseInput.vue'

const i18n = useI18n()
useSeoMeta({
  title: i18n.t('pageMain.mainTitle'),
})

const { getMaps } = useRequestGetMaps()
const maps = await getMaps()
const progress = computed(() => {
  const max = Math.max(...Object.values(maps.progress))

  return Object.fromEntries(
    Object.entries(maps.progress).map(([key, value]) => {
      value = Math.round((value * 100) / max)
      const decimal = value / 100
      const color = calculateProgressBg(decimal)
      return [
        key,
        {
          value,
          decimal,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
      ]
    })
  )
})

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
      <a href="/api/create-search-index" target="_blank">
        {{ $t('pageMain.updateIndex') }}
      </a>
    </div>
    <div class="PageMain-Row">
      <BaseInput v-model="searchQuery" placeholder="Поиск в картах" />
    </div>
    <div v-if="lastSearchDate" class="PageMain-Row">
      {{ $t('pageMain.lastSearchTime') }}: {{ lastSearchDate }}
    </div>
    <div
      v-for="result in searchResults"
      :key="result.url + result.name"
      class="PageMain-Row"
    >
      <a :href="result.url">{{ result.name }}</a>
      [{{ result.url }}]
    </div>
    <h3 class="PageMain-SubTitle">{{ $t('pageMain.existedMaps') }}</h3>
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
        :placeholder="$t('pageMain.specifyNewCardName')"
      />
      <BaseButton class="PageMain-Button" type="primary" @click="onCreateMap">
        {{ $t('pageMain.create') }}
      </BaseButton>
    </div>
    <br />
    <hr />
    <br />
    <h3 class="PageMain-SubTitle">{{ $t('pageMain.progressStatistic') }}</h3>
    <div class="PageMain-Bars">
      <div
        v-for="(bar, index) in progress"
        :key="index"
        :style="`height: ${bar.value}%;background: ${bar.color}`"
        class="PageMain-Bar"
      >
        <p>{{ bar.value }}%</p>
        <p>
          {{ index }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'PageMain';
</style>
