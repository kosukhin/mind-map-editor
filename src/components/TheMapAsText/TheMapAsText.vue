<script lang="ts" setup>
import { useShare } from '@vueuse/core';
import { ref } from '@vue/reactivity';
import { useI18n } from 'vue-i18n';
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseTextTitle from '@/components/BaseText/BaseTextTitle.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { useFactories } from '@/composables/useFactories';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

const { mapFile, mapCurrent } = useApplication();
const {
  guest, patron, textOf, textNlAsBr, textWithoutHTML,
} = useFactories();
const map = mapFile.currentMap(new VueRefPatron()).ref();

const mapAsString = ref('');
const objects = ref<MapObjectDocument[]>([]);
mapCurrent.objects(
  patron.create(
    guest.create((latestObjects: MapObjectDocument[]) => {
      objects.value = latestObjects;
      textNlAsBr
        .create(
          textOf.create(
            latestObjects.map((object) => `<div class="TheMapAsText-Item">
                <h3>${object.name}</h3><p>${object.additionalName || ''}</p><p>${object.description || ''}</p><p>${object.additionalFields && Object.values(object.additionalFields).join('</p><p>')}</p></div>`).join(''),
          ),
        )
        .asString(
          guest.create((textWithBrs: string) => {
            console.log(textWithBrs);
            mapAsString.value = textWithBrs;
          }),
        );
    }),
  ),
);

const i18n = useI18n();
const { share, isSupported } = useShare();
const onShare = () => {
  if (!isSupported.value) {
    alert(i18n.t('general.notifications.sharingDontSupported'));
  }

  textWithoutHTML
    .create(
      textOf.create(
        mapAsString.value,
      ),
    )
    .asString(
      guest.create((textNoHTML: string) => {
        share({
          text: textNoHTML,
        });
      }),
    );
};

const textRef = ref();
const onSelectAll = () => {
  if (map.value) {
    const range = new Range();
    range.setStart(textRef.value, 0);
    range.setEnd(textRef.value, Object.values(objects.value).length);
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(range);
  }
};
</script>

<template>
  <BaseModal name="mapAsText">
    <template #header>
      <BaseTextTitle class="block mb-3">
        {{ $t('general.mapAsText') }}
        <div class="flex gap-1">
          <BaseButton
            size="sm"
            type="success"
            class="font-normal"
            @click="onShare"
          >
            {{ $t('general.share') }}
          </BaseButton>
          <BaseButton
            size="sm"
            type="primary"
            class="font-normal"
            @click="onSelectAll"
          >
            {{ $t('general.selectAll') }}
          </BaseButton>
        </div>
      </BaseTextTitle>
    </template>
    <article v-if="map" class="TheMapAsText">
      <div ref="textRef" v-html="mapAsString"></div>
    </article>
  </BaseModal>
</template>
