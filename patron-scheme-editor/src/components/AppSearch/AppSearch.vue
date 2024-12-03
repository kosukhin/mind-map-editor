<script lang="ts" setup>
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import { ref } from 'vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { VueSource } from '@/modules/integration/vue/VueSource';
import { useFactories } from '@/composables/useFactories';
import { debug } from 'debug';

const {
  objectsMatchedToQuery, controlCombo, modal, stagePosition,
} = useApplication();
const { guest, patron } = useFactories();

const inputRef = ref();

const localDebug = debug('app:AppSearch');

modal.isOpenedByName(
  'search',
  patron.create(guest.create((opened: boolean) => {
    setTimeout(() => {
      if (opened && inputRef.value) {
        localDebug('search is opened', opened);
        inputRef.value.$el.focus();
      }
    }, 500);
  })),
);

const queryField = ref('');

const searchResults = objectsMatchedToQuery.objects(
  new VueSource(queryField),
  new VueRefPatron<MapObjectDocument[]>([]),
).ref();

controlCombo.happened(
  'KeyF',
  patron.create(guest.create(() => {
    modal.give('search');
  })),
);
</script>

<template>
  <BaseModal name="search">
    <div class="AppSearch">
      <BaseInput
        ref="inputRef"
        v-model="queryField"
        class="mb-2 e2e-query-input"
        :placeholder="$t('general.specifyQuery')"
      />
      <div v-if="searchResults.length" class="AppSearch-Items">
        <div
          v-for="result in searchResults"
          :key="result.name"
          class="cursor-pointer"
          @click.prevent="stagePosition.give(result);modal.give('')"
        >
          <b class="AppSearch-ItemName" v-html="result.name"></b>
          <b
            v-if="result.additionalName"
            class="AppSearch-ItemName"
            v-html="result.additionalName"
          ></b>
          <div v-if="result.additionalFields" v-html="Object.values(result.additionalFields).join(' ')"></div>
        </div>
      </div>
      <div v-else-if="queryField">{{ $t('general.noResults') }}</div>
      <div v-else>{{ $t('general.resultsWillBeHere') }}</div>
    </div>
  </BaseModal>
</template>
