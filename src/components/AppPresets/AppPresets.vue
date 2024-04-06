<script lang="ts" setup>
import { useOverlayAutoClose } from '@/composables/useOverlayAutoclose';
import { SHOW_PRESETS } from '@/constants/overlays';
import { presetsCommon } from '@/constants/presets';
import svg64 from 'svg64';
import { svgRender } from '@/utils/svgRenderDefault';
import { useMap } from '@/composables/useMap';
import { MapType } from '@/entities/Map';
import BaseButton from '@/components/BaseButton/BaseButton.vue';

useOverlayAutoClose(SHOW_PRESETS);

const { map } = useMap();
const addType = (type: MapType) => {
  if (map.value) {
    map.value.types[type.name] = type;
  }
};
</script>

<template>
  <div class="AppPresets">
    <div class="Common-H3 Common-Mb-Md">Общие</div>
    <div class="Common-Flex Common-Mb-Md Common-Gap">
      <div
        v-for="item in presetsCommon"
        :key="item.name"
        class="AppTypesParent-Item"
      >
        <div class="AppTypesParent-ItemTitle">{{ item.name }}</div>
        <img
          class="AppTypesParent-ItemImage"
          :src="svg64(svgRender(item.svg))"
          height="100px"
          width="100px"
          alt=""
        />
        <BaseButton
          class="AppTypesParent-ItemButton"
          type="success"
          @click="addType(item)"
        >
          {{ $t('general.addToMap') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
