<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import { useOverlayAutoClose } from '@/composables/useOverlayAutoclose';
import { SHOW_SEARCH } from '@/constants/overlays';
import { useSharedMap } from '@/composables/useSharedMap';
import { useSharedOverlay } from '@/composables/useSharedOverlay';
import { useMoveToObject } from '@/composables/useMoveToObject';
import { MapObject } from '@/entities/Map';
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue';

useOverlayAutoClose(SHOW_SEARCH);

const isFoundInAdditionalFilters = (
  object: MapObject,
  searchQuery: string,
) => object.additionalFields
  && Object.values(object.additionalFields).some((v) => v.toLowerCase().includes(searchQuery));

const type = ref(null);
const query = ref('');
const { map } = useSharedMap();

// TODO убрать дублирование
const mapTypes = computed(() => {
  const result: { id: string; name: string }[] = [];

  if (map.value) {
    Object.entries(map.value.types).forEach(([typeId, mapType]) => {
      result.push({
        id: typeId,
        name: mapType.name,
      });
    });
  }

  return [{ id: null, name: 'Любой тип узла' }, ...result];
});

const searchResults = computed(() => {
  if (!map.value) {
    return [];
  }

  let objects = Object.values(map.value.objects);

  if (type.value) {
    objects = objects.filter((object) => object.type === type.value);
  }

  if (query.value) {
    const searchQuery = query.value.toLowerCase();

    return objects.filter((object) => (
      object.name.toLowerCase().includes(searchQuery)
        || isFoundInAdditionalFilters(object, searchQuery)
        || (object.additionalName
          && object.additionalName.toLowerCase().includes(searchQuery))
    ));
  }

  if (type.value) {
    return objects;
  }

  return [];
});

const { close } = useSharedOverlay();
const { scrollToObject } = useMoveToObject();
const moveToObject = (object: MapObject) => {
  close();
  scrollToObject(object.id);
};

const showFirstAdditionalField = (additionalFields: any) => Object
  .values(additionalFields)
  .filter(Boolean).shift();
</script>

<template>
  <div class="AppSearch">
    <BaseInput
      v-model="query"
      class="AppSearch-Input"
      placeholder="Введите запрос"
    />
    <div class="Common-Mb-Md">
      <BaseSelect
        v-model="type"
        :items="mapTypes"
        option-id="id"
        option-label="name"
      />
    </div>
    <div v-if="searchResults.length" class="AppSearch-Items">
      <div
        v-for="result in searchResults"
        :key="result.name"
        class="AppSearch-Item"
        @click="moveToObject(result)"
      >
        <b class="AppSearch-ItemName">{{ result.name }}</b>
        <b v-if="result.additionalName" class="AppSearch-ItemName">
          &nbsp;
          {{ result.additionalName }}
        </b>
        <div v-else>
          {{ showFirstAdditionalField(result.additionalFields ?? {}) }}
        </div>
      </div>
    </div>
    <div v-else-if="query">{{ $t('general.noResults') }}</div>
  </div>
</template>

<style scoped lang="scss">
@import 'AppSearch';
</style>
