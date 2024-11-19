<script lang="ts" setup>
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import { useApplication } from '@/composables/useApplication';
import {
  MapDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { VueComputedPatron } from '@/modules/integration/vue/VueComputedPatron';
import { useFactories } from '@/composables/useFactories';
import BaseInputRow from '@/components/BaseInput/BaseInputRow.vue';
import BaseInputTitle from '@/components/BaseInputTitle/BaseInputTitle.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue';
import { ref } from 'vue';

const {
  mapTypeCurrent, mapFile, mapType, modal, controlCombo,
} = useApplication();
const { patron, chain, guest } = useFactories();

mapTypeCurrent.typeId(
  patron.create(guest.create((typeId: string) => {
    if (typeId) {
      modal.give('type');
    }
  })),
);

type ChainProps = {map: MapDocument, typeId: string};
const typeName = ref<string>('');
const theChain = chain.create();
const type = new VueComputedPatron<MapTypeDocument>(() => {
  mapTypeCurrent.typeId(patron.create(theChain.receiveKey('typeId')));
  mapFile.currentMap(patron.create(theChain.receiveKey('map')));
  theChain.result(patron.create(
    guest.create(({ map, typeId }: ChainProps) => {
      type.value = map.types[typeId];
      typeName.value = type.value?.name;
    }),
  ));
}).ref();

const close = () => {
  mapTypeCurrent.give('');
  modal.give('');
  theChain.receiveKey('typeId').give('');
};

const save = () => {
  mapType.give({
    name: typeName.value,
    type: type.value,
  });
  close();
};

controlCombo.happenedConditional(
  'KeyS',
  modal.openedByName('type'),
  patron.create(guest.create(save)),
);
</script>

<template>
  <BaseModal name="type">
    <template #header>
      <h2 class="text-lg font-bold">{{ $t('general.mapType') }}</h2>
    </template>
    <div v-if="type" class="flex flex-col">
      <BaseInputRow>
        <BaseInputTitle>
          Название типа
        </BaseInputTitle>
        <BaseInput v-model="type.name" />
      </BaseInputRow>
      <BaseInputRow>
        <BaseInputTitle>
          SVG
        </BaseInputTitle>
        <BaseTextarea v-model="type.svg" />
      </BaseInputRow>
      <BaseInputRow>
        <BaseInputTitle>
          Ширина
        </BaseInputTitle>
        <BaseInput v-model="type.width" />
      </BaseInputRow>
      <BaseInputRow>
        <BaseInputTitle>
          Высота
        </BaseInputTitle>
        <BaseInput v-model="type.height" />
      </BaseInputRow>
    </div>
    <template #footer>
      <div class="flex justify-end pt-4 gap-2">
        <BaseButton type="success" @click="save">
          {{ $t('general.save') }}
        </BaseButton>
        <BaseButton @click="close">
          {{ $t('general.cancel') }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
