<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
import { omit } from 'lodash';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseCheckbox from '@/components/BaseCheckbox/BaseCheckbox.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import { MapSettings } from '@/entities/Map';
import { useSharedMap } from '@/composables/useSharedMap';
import { useRequestRemoveMap } from '@/composables/useRequestRemoveMap';
import { useSharedOverlay } from '@/composables/useSharedOverlay';
import { useSharedKeybindings } from '@/composables/useSharedKeybindings';
import {
  SHOW_JSON,
  SHOW_KEYBINDINGS,
  SHOW_PARENT_TYPES,
  SHOW_SETTINGS,
} from '@/constants/overlays';
import { useFormDirtyCheck } from '@/composables/useFormDirtyCheck';
import { downloadFile } from '@/utils/dom';
import { createMapFileNameFromUrl } from '@/utils/map';

const { stringify } = JSON;

const form = ref<Partial<MapSettings>>({});
const {
  map, mapName, firstMapLoad, parentTypes,
} = useSharedMap();
watch(
  firstMapLoad,
  () => {
    if (map.value) {
      form.value = { ...map.value.settings };
      form.value.prevFavoriteGroup = form.value.favoriteGroup;
    }
  },
  {
    immediate: true,
  },
);

const i18n = useI18n();
const { removeMap } = useRequestRemoveMap();
const onRemove = async () => {
  // eslint-disable-next-line no-restricted-globals
  if (confirm(i18n.t('general.notifications.thisWillTotallyRemoveMap'))) {
    await removeMap(mapName.value);
  }
};

const { close, overlayName, isOpened } = useSharedOverlay();
const onSave = () => {
  close();
  if (map.value) {
    map.value.settings = { ...form.value } as MapSettings;
  }
};

const { ctrlSFired } = useSharedKeybindings();
watch(ctrlSFired, () => {
  if (!isOpened(SHOW_SETTINGS)) {
    return;
  }
  onSave();
});

const isDirty = computed(
  () => stringify(omit(form.value, ['prevFavoriteGroup']))
    !== stringify(omit(map.value?.settings, ['prevFavoriteGroup'])),
);
useFormDirtyCheck(isDirty, SHOW_SETTINGS);

const onDownloadMap = () => {
  if (map.value) {
    downloadFile(createMapFileNameFromUrl(map.value), JSON.stringify(map.value));
  }
};
</script>

<template>
  <div class="TheSettings">
    <div class="TheSettings-Content">
      <a href="#" class="PageEditor-Download" @click.prevent="onDownloadMap">
        Скачать карту
      </a>
      <div class="TheSettings-Row">
        <div class="TheSettings-ButtonGroup">
          <BaseButton
            class="TheSettings-Button"
            type="primary"
            @click="overlayName = SHOW_JSON"
          >
            {{ $t('general.jsonExportImport') }}
          </BaseButton>
          <BaseButton
            class="TheSettings-Button"
            type="primary"
            @click="overlayName = SHOW_KEYBINDINGS"
          >
            {{ $t('general.keybindings') }}
          </BaseButton>
          <BaseButton
            v-if="parentTypes.length"
            type="primary"
            class="TheSettings-Button"
            @click="overlayName = SHOW_PARENT_TYPES"
          >
            {{ $t('general.parentTypes') }}
          </BaseButton>
        </div>
      </div>
      <div class="TheSettings-Row">
        <BaseCheckbox
          v-model="form.colored"
          :label="$t('general.useLabelsColoring')"
        />
      </div>
      <div class="TheSettings-Row">
        <BaseCheckbox
          v-model="form.skipSearchIndex"
          label="Пропустить индексацию поиском"
        />
      </div>
      <div class="TheSettings-Row">
        <label>
          <b>{{ $t('general.mapName') }}</b>
          <BaseInput v-model="form.title" />
        </label>
      </div>
      <div class="TheSettings-Row">
        <a href="https://github.com/kosukhin/mind-map-creator" target="_blank">
          {{ $t('general.githubRepo') }}
        </a>
      </div>
      <div class="TheSettings-Row">
        <b>{{ $t('general.favorites') }}</b>
        <BaseInput v-model="form.favoriteGroup" />
      </div>
    </div>
    <div class="TheSettings-ButtonGroup">
      <BaseButton class="TheSettings-Button" type="success" @click="onSave">
        {{ $t('general.save') }}
      </BaseButton>
      <BaseButton class="TheSettings-Button" @click="close">
        {{ $t('general.cancel') }}
      </BaseButton>
      <BaseButton class="TheSettings-Button" type="danger" @click="onRemove">
        {{ $t('general.removeMap') }}
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'TheSettings';
</style>
