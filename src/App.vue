<script setup lang="ts">
import { ref, watch } from 'vue';
import { useService } from '@/composables/useService';
import PageNoContent from '@/views/PageNoContent.vue';
import {
  PatronSchemeEditor, VueRefPatron, useApplication, useFactories,
} from 'patron-scheme-editor';
import 'patron-scheme-editor/patron-scheme-editor.css';
import TheSharingButton from '@/components/TheSharingButton/TheSharingButton.vue';
import { useSharing } from '@/composables/useSharing';
import { Patron } from 'patron-oop';
import presets from '../public/data/presets.json';

const { serviceFileContent, shareConflict, sharedFromWorker } = useService();

const canBeUsed = serviceFileContent.canBeUsed(new VueRefPatron()).ref();
const closed = ref(false);

const { patron } = useFactories();
const { sharedFile, sharedLastTimestamp } = useSharing();

const patronContentRef = ref();
serviceFileContent.content(patron.create((content: boolean) => {
  patronContentRef.value = content;
}));

const directoryContent = ref();

watch(directoryContent, (newValue) => {
  closed.value = false;
  canBeUsed.value = true;
  patronContentRef.value = newValue;
});

watch(patronContentRef, (newValue) => {
  if (directoryContent.value) {
    directoryContent.value = newValue;
  }
});

watch(patronContentRef, (patronContentValue: string) => {
  serviceFileContent.give(patronContentValue);
});

const { sharePossible, sharedStorageRecord } = useSharing();
const sharingPossiblePatron = new VueRefPatron();
sharePossible.value(sharingPossiblePatron);
const sharedStoragePatron = new VueRefPatron();
sharedStorageRecord.value(sharedStoragePatron);

const { modal } = useApplication();
shareConflict.value(new Patron((isConflict) => {
  if (isConflict) {
    modal.give('custom');
  }
}));

const openNewFile = () => {
  sharedFromWorker.value(sharedStorageRecord);
  location.reload();
};

const sharedLastTimestampPatron = new VueRefPatron<{timestamp: number}>();
sharedLastTimestamp.value(sharedLastTimestampPatron);
</script>

<template>
  <PatronSchemeEditor
    v-if="canBeUsed && patronContentRef && !closed"
    v-model="patronContentRef"
    :presets="presets"
  >
    <template #insideGrid>
      <TheSharingButton v-if="sharingPossiblePatron.value" />
    </template>
    <template #beforeSettingsButtons>
      <button
        v-if="patronContentRef"
        type="button"
        class="rounded-main text-md p-md bg-primary hover:bg-primary-second text-white"
        @click="closed = true"
      >
        Закрыть
      </button>
      <button
        v-if="sharedStoragePatron.value"
        type="button"
        class="rounded-main text-md p-md bg-primary hover:bg-primary-second text-white"
        @click="sharedStorageRecord.do('empty');patronContentRef = null"
      >
        Очистить Sharing
      </button>
    </template>
    <template #customModalTitle>
      Конфликт шаринга
    </template>
    <template #customModalBody>
      <p v-if="sharedLastTimestampPatron.value">
        Последний шаринг: {{ new Date(sharedLastTimestampPatron.value.timestamp).toLocaleString() }}
      </p>
      <p v-else>
        Открытый файл не шарился
      </p>
      <p>
        Вы открыли новый файл через функционал шаринга, но не закрыли старый, поэтому случился конфликт
      </p>
      <p>
        <a href="#" @click.prevent="modal.give('')">
          Оставить открытый файл
        </a>
      </p>
      <p>
        <a href="#" @click.prevent="sharedFile.do()">
          Шарить открытый файл
        </a>
      </p>
      <p>
        <a href="#" @click.prevent="openNewFile()">
          Загрузить новый файл
        </a>
      </p>
    </template>
  </PatronSchemeEditor>
  <PageNoContent v-show="!(canBeUsed && patronContentRef && !closed)" v-model="directoryContent" />
</template>

<style>
body {
  font: 14px Arial, sans-serif;
}
</style>
