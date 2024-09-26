<script lang="ts" setup>
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseCheckbox from '@/components/BaseCheckbox/BaseCheckbox.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { useFactories } from '@/composables/useFactories';

const parentTypes: string[] = [];

const {
  modal, mapFile, mapRemoved, mapSettings, keyboard,
} = useApplication();
const { patron, guest } = useFactories();

const map = mapFile.currentMap(new VueRefPatron<MapDocument>()).ref();

const close = () => {
  modal.receive('');
};

const save = () => {
  mapSettings.receive(map.value.settings);
  close();
};

keyboard.event(
  patron.create(
    guest.create((e: KeyboardEvent) => {
      modal.isOpenedByName('settings', guest.create((opened: boolean) => {
        if (opened && e.ctrlKey && e.key === 's' && e.type === 'keydown') {
          e.preventDefault();
          save();
        }
      }));
    }),
  ),
);
</script>

<template>
  <BaseModal name="settings">
    <template #header>
      <h2 class="text-lg font-bold">{{ $t('general.mapSettings') }}</h2>
    </template>
    <div class="TheSettings" v-if="map?.settings">
      <div class="mb-2">
        <a href="#" class="PageEditor-Download">
          Скачать карту
        </a>
        <div class="TheSettings-Row">
          <div class="flex gap-2 mb-2">
            <BaseButton
              class="text-white"
              type="primary"
            >
              {{ $t('general.jsonExportImport') }}
            </BaseButton>
            <BaseButton
              class="text-white"
              type="primary"
            >
              {{ $t('general.keybindings') }}
            </BaseButton>
            <BaseButton
              v-if="parentTypes.length"
              type="primary"
              class="text-white"
            >
              {{ $t('general.parentTypes') }}
            </BaseButton>
            <BaseButton
              type="primary"
              class="text-white e2e-open-presets"
              @click="modal.receive('presets')"
            >
              Пресеты
            </BaseButton>
          </div>
        </div>
        <div class="TheSettings-Row">
          <BaseCheckbox
            v-model="map.settings.colored"
            :label="$t('general.useLabelsColoring')"
          />
        </div>
        <div class="mb-2">
          <BaseCheckbox
            v-model="map.settings.skipSearchIndex"
            label="Пропустить индексацию поиском"
          />
        </div>
        <div class="mb-2">
          <label>
            <b>{{ $t('general.mapName') }}</b>
            <BaseInput v-model="map.settings.title" />
          </label>
        </div>
        <div class="mb-2">
          <a href="https://github.com/kosukhin/mind-map-creator" target="_blank">
            {{ $t('general.githubRepo') }}
          </a>
        </div>
        <div class="mb-4">
          <b>{{ $t('general.favorites') }}</b>
          <BaseInput v-model="map.settings.favoriteGroup" />
        </div>
      </div>
      <div class="flex gap-2">
        <BaseButton class="TheSettings-Button" type="success" @click="save()">
          {{ $t('general.save') }}
        </BaseButton>
        <BaseButton class="TheSettings-Button" @click="close">
          {{ $t('general.cancel') }}
        </BaseButton>
        <BaseButton class="TheSettings-Button" type="danger" @click="mapRemoved.receive(map);close()">
          {{ $t('general.removeMap') }}
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>
