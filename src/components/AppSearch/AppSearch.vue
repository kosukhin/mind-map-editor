<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import { SHOW_SEARCH } from '@/constants/overlays';
import { useMap } from '@/composables/useMap';
import { useOverlay } from '@/composables/useOverlay';
import { useMoveToObject } from '@/composables/useMoveToObject';
import { MapObject } from '@/entities/Map';
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { clone } from 'lodash';
import { overlayController } from '@/modulesHigh/overlay/overlayController';
import { useSearch } from '@/app/useSearch';

overlayController.autoClose(SHOW_SEARCH);

const { map } = useMap();

const {
  typeField, queryField, mapTypes, searchResults, isSearchedAnything,
} = useSearch();

const { close } = useOverlay();
const { scrollToObject } = useMoveToObject();
const moveToObject = (object: MapObject) => {
  close();
  scrollToObject(object.id);
};

const showFirstAdditionalField = (additionalFields: any) => Object
  .values(additionalFields)
  .filter(Boolean).shift();

const namedSearchFormShowed = ref(false);
const namedSearchForm = ref({
  name: '',
  query: '',
  type: '',
});
const namedSearchSave = () => {
  if (map.value) {
    if (!map.value.namedSearches) {
      map.value.namedSearches = [];
    }
    map.value?.namedSearches.push(clone(namedSearchForm.value));
    Object.keys(namedSearchForm.value).forEach((key) => {
      (namedSearchForm.value as any)[key] = '';
    });
    namedSearchFormShowed.value = false;
  }
};

const namedSearchApplyIndex = (index: number) => {
  const search = map.value?.namedSearches?.[index];
  if (search) {
    queryField.value = search.query;
    typeField.value = search.type;
  }
};

const namedSearchRemoveByIndex = (index: number) => {
  map.value?.namedSearches?.splice(index, 1);
};
</script>

<template>
  <div class="AppSearch">
    <div class="rounded-main mb-2 w-full p-2 border border-solid border-body-dark">
      <h4 class="text-md font-bold mb-1">{{ $t('general.savedSearches') }}</h4>
      <BaseButton
        class="max-w-[150px]"
        @click="namedSearchFormShowed=!namedSearchFormShowed"
      >
        {{ $t('general.create') }}
      </BaseButton>
      <div
        v-if="namedSearchFormShowed"
        class="flex gap-2 items-center my-2"
      >
        <b>{{ $t('general.named') }}</b>
        <BaseInput v-model="namedSearchForm.name" />
        <b>{{ $t('general.searchString') }}</b>
        <BaseInput v-model="namedSearchForm.query" />
        <b>{{ $t('general.type') }}</b>
        <BaseSelect
          v-model="namedSearchForm.type"
          :items="mapTypes"
          option-id="id"
          option-label="name"
        />
        <BaseButton type="success" @click="namedSearchSave">
          {{ $t('general.save') }}
        </BaseButton>
      </div>
      <div v-if="map" class="flex py-3 gap-4">
        <span
          :key="`nsearch-${index}`"
          v-for="(nSearch, index) in map.namedSearches"
          style="display: flex; gap: 4px"
        >
          <a
            href="#"
            @click.prevent="namedSearchApplyIndex(index)"
          >
            {{nSearch.name}}
          </a>
          <a href="#" @click.prevent="namedSearchRemoveByIndex(index)">&times;</a>
        </span>
      </div>
    </div>
    <BaseInput
      v-model="queryField"
      class="mb-2"
      :placeholder="$t('general.specifyQuery')"
    />
    <div class="mb-2">
      <BaseSelect
        v-model="typeField"
        :items="mapTypes"
        option-id="id"
        option-label="name"
        :placeholder="$t('general.specifyType')"
      />
    </div>
    <div v-if="isSearchedAnything && searchResults.length" class="AppSearch-Items">
      <div
        v-for="result in searchResults"
        :key="result.name"
        class="cursor-pointer"
        @click="moveToObject(result)"
      >
        <b class="AppSearch-ItemName" v-html="result.name"></b>
        <b
          v-if="result.additionalName"
          class="AppSearch-ItemName"
          v-html="result.additionalName"
        ></b>
        <div v-else v-html="showFirstAdditionalField(result.additionalFields ?? {})"></div>
      </div>
    </div>
    <div v-else-if="queryField">{{ $t('general.noResults') }}</div>
    <div v-else>{{ $t('general.resultsWillBeHere') }}</div>
  </div>
</template>
