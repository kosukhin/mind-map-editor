<script lang="ts" setup>
import BaseDrawer from '@/components/BaseDrawer/BaseDrawer.vue';
import { useApplication } from '@/composables/useApplication';
import { VueComputedPatron } from '@/modules/integration/vue/VueComputedPatron';
import { useFactories } from '@/composables/useFactories';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseCheckbox from '@/components/BaseCheckbox/BaseCheckbox.vue';
import BaseInputTitle from '@/components/BaseInputTitle/BaseInputTitle.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseInputRow from '@/components/BaseInput/BaseInputRow.vue';
import BaseEditor from '@/components/BaseEditor/BaseEditor.vue';
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const {
  mapObjectCurrent, mapFile, mapObject, drawer, mapObjectRemoved, mapObjectRelationRemoved,
} = useApplication();
const { patron, chain, guest } = useFactories();

type ObjectChainProps = {map: MapDocument, objectId: string};
const object = new VueComputedPatron<MapObjectDocument>(() => {
  const theChain = chain.create();
  mapObjectCurrent.objectId(patron.create(theChain.receiveKey('objectId')));
  mapFile.currentMap(patron.create(theChain.receiveKey('map')));
  theChain.result(patron.create(
    guest.create(({ map, objectId }: ObjectChainProps) => {
      object.value = map.objects[objectId];
    }),
  ));
}).ref();

const map = mapFile.currentMap(new VueRefPatron<MapDocument>()).ref();

const close = () => {
  mapObjectCurrent.receive('');
  drawer.receive('');
};

const remove = () => {
  mapObjectRemoved.receive(object.value);
  close();
};

const save = () => {
  mapObject.receive(object.value);
  close();
};

const removeRelation = (index: number) => {
  mapObjectRelationRemoved.receive({
    index,
    object: object.value,
  });
};
</script>

<template>
  <BaseDrawer name="object" @close="close">
    <template #header>
      <h2 class="text-lg font-bold">{{ $t('general.mapObject') }}</h2>
      <small v-if="object" class="flex gap-2 items-center">
        <span> ID #{{ object.id }} </span>
        <BaseButton size="sm" type="primary">
          {{ $t('general.copy') }}
        </BaseButton>
      </small>
    </template>
    <div v-if="object" class="flex flex-col gap-2">
      <div class="FormObject-Inner">
        <div class="FormObject-Row">
          <BaseCheckbox
            v-model="object.linked"
            :label="$t('general.nameAsLink')"
          />
        </div>
        <template v-if="object.linked">
          <BaseInputTitle>{{ $t('general.outerLink') }}</BaseInputTitle>
          <div class="FormObject-Row">
            <BaseInput v-model="object.outlink" />
          </div>
          <div class="FormObject-Row">
            <BaseCheckbox
              v-model="object.targetBlank"
              :label="$t('general.inNewTab')"
            />
          </div>
        </template>
        <BaseInputRow class="mb-2" :key="key" v-for="(_, key) in object.additionalFields">
          <BaseInputTitle class="mb-1">
            {{ key }}
          </BaseInputTitle>
          <BaseEditor v-model="object.additionalFields[key]" />
        </BaseInputRow>
        <BaseInputRow>
          <BaseInputTitle>
            {{ $t('general.topName') }}
          </BaseInputTitle>
          <BaseEditor v-model="object.additionalName" />
        </BaseInputRow>
        <BaseInputRow>
          <BaseInputTitle>
            {{ $t('general.bottomName') }}
          </BaseInputTitle>
          <BaseEditor v-model="object.name" />
        </BaseInputRow>
        <BaseInputRow>
          <BaseInputTitle>
            {{ $t('general.description') }}
          </BaseInputTitle>
          <BaseEditor v-model="object.description" />
        </BaseInputRow>
        <BaseInputRow>
          <BaseInputTitle>
            Z-Index
          </BaseInputTitle>
          <BaseInput v-model="object.zindex" type="number" />
        </BaseInputRow>
        <BaseInputRow>
          <BaseInputTitle>
            Width
          </BaseInputTitle>
          <BaseInput v-model="object.width" step="20" type="number" />
        </BaseInputRow>
        <BaseInputRow>
          <BaseInputTitle>
            Height
          </BaseInputTitle>
          <BaseInput v-model="object.height" step="20" type="number" />
        </BaseInputRow>
        <BaseInputRow>
          <BaseInputTitle>
            {{ $t('general.objectType') }}
          </BaseInputTitle>
          <BaseSelect
            v-model="object.type"
            :items="[]"
            option-id="id"
            option-label="name"
          />
        </BaseInputRow>
        <div class="my-2">
          <BaseButton
            class="FormObject-ArrowButton"
            type="primary"
            size="md"
          >
            {{ $t('general.transfer') }}
          </BaseButton>
        </div>
        <div class="my-2">
          <BaseCheckbox
            v-model="object.inMenu"
            :label="$t('general.useInMenu')"
          />
        </div>
        <template v-if="object.inMenu">
          <div class="FormObject-Title">{{ $t('general.menuOrder') }}</div>
          <div class="FormObject-Row">
            <BaseInput v-model="object.menuOrder" type="number" />
          </div>
        </template>
        <template v-if="object.arrows && object.arrows.length">
          <div class="FormObject-Title">{{ $t('general.relations') }}</div>
          <div class="FormObject-Row">
            <div
              v-for="(arrow, index) in object.arrows"
              :key="arrow.id"
              class="FormObject-Arrow"
            >
              <span v-if="map?.objects[arrow.id]" class="FormObject-ArrowName">
                #{{ index + 1 }} {{ map.objects[arrow.id].name }}
              </span>
              <BaseButton
                class="FormObject-ArrowButton"
                type="danger"
                size="sm"
                @click="removeRelation(index)"
              >
                {{ $t('general.delete') }}
              </BaseButton>
            </div>
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <div class="py-3 flex gap-1">
        <BaseButton type="success" @click="save">
          {{ $t('general.save') }}
        </BaseButton>
        <BaseButton type="danger" @click="remove">
          {{ $t('general.delete') }}
        </BaseButton>
        <BaseButton @click="close">
          {{ $t('general.cancel') }}
        </BaseButton>
      </div>
    </template>
  </BaseDrawer>
</template>
