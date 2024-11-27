<script lang="ts" setup>
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { VueRefPatronDuplex } from '@/modules/integration/vue/VueRefPatronDuplex';
import { Jsoned } from '@/modules/system/json/Jsoned';
import { SourceDynamic } from '@/modules/system/source/SourceDynamic';
import { GuestAware, GuestObject, Patron, Source, SourceEmpty, SourceType } from 'patron-oop';

const { mapFile, mapCurrent } = useApplication();

const mapCurrentSource = new SourceDynamic(
  mapCurrent,
  new GuestAware((guest) => {
    mapFile.currentMap(new GuestObject(guest));
  })
);

const json = new Jsoned(<SourceType>mapCurrentSource);

const sourceRef = new VueRefPatronDuplex(new VueRefPatron<string>(), json);
json.value(sourceRef);
const source = sourceRef.ref();
</script>

<template>
  <BaseModal name="export">
    <div class="AppPresets">
      <div class="text-md font-bold mb-2">Экспорт\Импорт текущей карты</div>
      <div class="flex flex-col gap-2">
        <BaseTextarea v-model="source" />
      </div>
    </div>
  </BaseModal>
</template>
