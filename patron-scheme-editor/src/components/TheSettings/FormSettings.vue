<script lang="ts" setup>
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { useFactories } from '@/composables/useFactories';
import { useSharing } from '@/composables/useSharing';

const {
  modal, mapFile, mapRemoved, mapSettings, controlCombo, parentNames, mapCurrentID,
} = useApplication();
const { patron, guest } = useFactories();

const parentTypes = parentNames.names(new VueRefPatron<string[]>()).ref();

const map = mapFile.currentMap(new VueRefPatron<MapDocument>()).ref();

const mapId = mapCurrentID.id(new VueRefPatron<string>()).ref();

const close = () => {
  modal.give('');
};

const save = () => {
  mapSettings.give(map.value.settings);
  close();
};

controlCombo.happenedConditional(
  'KeyS',
  modal.openedByName('settings'),
  patron.create(guest.create(save)),
);

const { sharedStorageRecord } = useSharing();
const sharingStoragePatron = new VueRefPatron();
sharedStorageRecord.value(sharingStoragePatron);
</script>

<template>
  <BaseModal name="settings">
    <template #header>
      <h2 class="text-lg font-bold">{{ $t('general.mapSettings') }}</h2>
    </template>
    <div class="TheSettings" v-if="map?.settings">
      <div class="mb-2">
        <div class="TheSettings-Row">
          <div class="flex gap-2 mb-2">
            <BaseButton
              v-if="sharingStoragePatron.value"
              type="primary"
              class="text-white"
              @click="sharedStorageRecord.give(null)"
            >
              Очистить Sharing
            </BaseButton>
            <BaseButton
              v-if="parentTypes.length > 1"
              type="primary"
              class="text-white"
              @click="modal.give('parentTypes')"
            >
              {{ $t('general.parentTypes') }}
            </BaseButton>
            <BaseButton
              type="primary"
              class="text-white"
              @click="modal.give('export')"
            >
              {{ $t('general.exportOrImport') }}
            </BaseButton>
            <BaseButton
              type="primary"
              class="text-white e2e-open-presets"
              @click="modal.give('presets')"
            >
              Пресеты
            </BaseButton>
          </div>
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
      </div>
      <div class="flex gap-2">
        <BaseButton class="TheSettings-Button" type="success" @click="save()">
          {{ $t('general.save') }}
        </BaseButton>
        <BaseButton class="TheSettings-Button" @click="close">
          {{ $t('general.cancel') }}
        </BaseButton>
        <BaseButton class="TheSettings-Button" type="danger" @click="mapRemoved.give(mapId);close()">
          {{ $t('general.removeMap') }}
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>
