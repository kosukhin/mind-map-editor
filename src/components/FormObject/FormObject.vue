<script lang="ts" setup>
import { computed, ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { useClipboard } from '@vueuse/core';
import { omit } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseCheckbox from '@/components/BaseCheckbox/BaseCheckbox.vue';
import BaseDrawer from '@/components/BaseDrawer/BaseDrawer.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue';
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea.vue';
import { cloneObject, updateObjectOnLayer } from '@/utils/konva';
import { useSharedMap } from '@/composables/useSharedMap';
import { useSharedOverlay } from '@/composables/useSharedOverlay';
import { useSharedKeybindings } from '@/composables/useSharedKeybindings';
import { SHOW_OBJECT, SHOW_TRANSFER } from '@/constants/overlays';
import { useSharedMapObject } from '@/composables/useSharedMapObject';
import { useFormDirtyCheck } from '@/composables/useFormDirtyCheck';
import { createMapObjectUrl } from '@/utils/map';
import { useSharedLayer } from '@/composables/useSharedLayer';
import { MapObject } from '@/entities/Map';
import { useSharedNotify } from '@/composables/useSharedNotify';
import { setValue } from '@/utils/common';
import { COPIED, NOT_SUPPOERTED } from '@/constants/messages';
import { NOTIFY_ERROR, NOTIFY_SUCCESS } from '@/constants/system';
import { getLocation } from '@/utils/globals';
import { useSettings } from '@/composables/useSettings';
import { useObjectActions } from '@/composables/useObjectActions';

const { stringify } = JSON;

const { map } = useSharedMap();
const mapTypes = computed(() => {
  const result: { id: string; name: string }[] = [];

  if (map.value) {
    Object.entries(map.value.types).forEach(([typeId, type]) => {
      result.push({
        id: typeId,
        name: type.name,
      });
    });
  }

  return result;
});

const { close, isOpened, open } = useSharedOverlay();
const { ctrlSFired } = useSharedKeybindings();

const form = ref<any>({});
const { currentObject } = useSharedMapObject();
watch(
  currentObject,
  () => {
    if (currentObject.value) {
      form.value = cloneDeep(currentObject.value);
    }
  },
  {
    flush: 'post',
    immediate: true,
  },
);

const omittedProps = ['lastClick', 'position'];
const isDirty = computed(
  () => stringify(omit(form.value, omittedProps))
    !== stringify(omit(currentObject.value, omittedProps)),
);
useFormDirtyCheck(isDirty, SHOW_OBJECT);

const objectUrl = computed({
  get() {
    return createMapObjectUrl(form.value);
  },
  set(value) {
    form.value.outlink = value;
  },
});

const { layer, layerObjects } = useSharedLayer();
const save = async () => {
  close();
  if (currentObject.value && map.value && layer.value) {
    map.value.objects[currentObject.value.id] = {
      ...map.value.objects[currentObject.value.id],
      ...form.value,
      outlink: objectUrl.value,
    };
    await updateObjectOnLayer(
      layerObjects,
      layer.value,
      map.value.objects[currentObject.value.id],
      map.value,
    );
  }
};

watch(ctrlSFired, () => {
  if (!isOpened(SHOW_OBJECT)) {
    return;
  }
  save();
});

const removeRelation = async (index: number) => {
  if (!(form.value as MapObject).arrows) return;
  if (currentObject.value && map.value && layer.value) {
    (form.value as MapObject).arrows.splice(index, 1);
    await updateObjectOnLayer(
      layerObjects,
      layer.value,
      map.value.objects[currentObject.value.id],
      map.value,
    );
  }
};

const cancel = () => {
  close();
};

const clone = async () => {
  close();
  if (currentObject.value && map.value && layer.value) {
    await cloneObject(currentObject.value, map.value, layer.value, layerObjects);
  }
};

const { message } = useSharedNotify();
const { copy, isSupported } = useClipboard();
function onCopyUrl() {
  if (!isSupported) {
    setValue(message, [NOT_SUPPOERTED, NOTIFY_ERROR]);
    return;
  }
  if (currentObject.value) {
    copy(`${getLocation().pathname}#${currentObject.value.id}`);
    setValue(message, [COPIED, NOTIFY_SUCCESS]);
  }
}

const { settings } = useSettings();
const { removeCurrentObject } = useObjectActions();
</script>

<template>
  <BaseDrawer :name="SHOW_OBJECT">
    <template #header>
      <h2 class="FormObject-MainTitle">{{ $t('general.mapObject') }}</h2>
      <small v-if="currentObject" class="FormObject-MainSubTitle">
        <span> ID #{{ currentObject.id }} </span>
        <BaseButton size="sm" type="primary" @click="onCopyUrl">
          {{ $t('general.copy') }}
        </BaseButton>
      </small>
    </template>
    <div v-if="settings && form && currentObject" class="FormObject">
      <div v-if="!settings.isEditable" class="FormObject-Inner">
        <div class="FormObject-Title">{{ $t('general.name') }}</div>
        <div class="FormObject-Description">{{ currentObject.name }}</div>
        <div class="FormObject-Title">{{ $t('general.description') }}</div>
        <div class="FormObject-Description">
          {{
            currentObject.description
              ? currentObject.description
              : $t('general.noDescription')
          }}
        </div>
      </div>
      <div v-else class="FormObject-Inner">
        <div class="FormObject-Row">
          <BaseCheckbox
            v-model="form.linked"
            :label="$t('general.nameAsLink')"
          />
        </div>
        <template v-if="form.linked">
          <div class="FormObject-Title">{{ $t('general.outerLink') }}</div>
          <div class="FormObject-Row">
            <BaseInput v-model="objectUrl" />
          </div>
          <div class="FormObject-Row">
            <BaseCheckbox
              v-model="form.targetBlank"
              :label="$t('general.inNewTab')"
            />
          </div>
        </template>
        <div class="FormObject-Title">{{ $t('general.topName') }}</div>
        <div class="FormObject-Row">
          <BaseTextarea v-model="form.additionalName" />
        </div>
        <div class="FormObject-Title">{{ $t('general.bottomName') }}</div>
        <div class="FormObject-Row">
          <BaseTextarea v-model="form.name" />
        </div>
        <div class="FormObject-Title">{{ $t('general.description') }}</div>
        <div class="FormObject-Row">
          <BaseTextarea v-model="form.description" />
        </div>
        <div class="FormObject-Title">Z-Index</div>
        <div class="FormObject-Row">
          <BaseInput v-model="form.zindex" type="number" />
        </div>
        <div class="FormObject-Title">{{ $t('general.objectType') }}</div>
        <div class="FormObject-Row">
          <BaseSelect
            v-model="form.type"
            :items="mapTypes"
            option-id="id"
            option-label="name"
          />
        </div>
        <div class="FormObject-Row">
          <BaseButton
            class="FormObject-ArrowButton"
            type="primary"
            size="md"
            @click="clone"
          >
            {{ $t('general.clone') }}
          </BaseButton>
        </div>
        <div class="FormObject-Row">
          <BaseButton
            class="FormObject-ArrowButton"
            type="primary"
            size="md"
            @click="open(SHOW_TRANSFER)"
          >
            {{ $t('general.transfer') }}
          </BaseButton>
        </div>
        <div class="FormObject-Row">
          <BaseCheckbox
            v-model="form.inMenu"
            :label="$t('general.useInMenu')"
          />
        </div>
        <template v-if="form.inMenu">
          <div class="FormObject-Title">{{ $t('general.menuOrder') }}</div>
          <div class="FormObject-Row">
            <BaseInput v-model="form.menuOrder" type="number" />
          </div>
        </template>
        <template v-if="form.arrows && form.arrows.length">
          <div class="FormObject-Title">{{ $t('general.relations') }}</div>
          <div class="FormObject-Row">
            <div
              v-for="(arrow, index) in form.arrows"
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
      <div class="FormObject-ButtonsGroup">
        <BaseButton type="success" @click="save">
          {{ $t('general.save') }}
        </BaseButton>
        <BaseButton type="danger" @click="removeCurrentObject">
          {{ $t('general.delete') }}
        </BaseButton>
      </div>
      <div class="FormObject-ButtonsGroup">
        <BaseButton @click="cancel">
          {{ $t('general.cancel') }}
        </BaseButton>
      </div>
    </template>
  </BaseDrawer>
</template>

<style scoped lang="scss">
@import 'FormObject';
</style>
