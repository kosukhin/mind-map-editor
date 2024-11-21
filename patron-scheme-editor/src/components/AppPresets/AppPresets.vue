<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { useFactories } from '@/composables/useFactories';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import { MapTypeDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { computed, ref } from 'vue';
import { useApplication } from '@/composables/useApplication';

const {
  jsonp, svgMapTypeImage,
} = useFactories();
const { mapType } = useApplication();

const presets = ref<any[]>([])

const presetsExtended = computed(() => presets.value.map((preset) => ({
  preset,
  image: svgMapTypeImage.create(preset).markup(),
})));
</script>

<template>
  <BaseModal name="presets">
    <div class="AppPresets">
      <div class="text-md font-bold mb-2">Общие</div>
      <div class="flex gap-2 items-end">
        <div
          v-for="item in presetsExtended"
          :key="item.preset.name"
          class="flex flex-col gap-2"
        >
          <div class="AppTypesParent-ItemTitle">{{ item.preset.name }}</div>
          <div
            class="AppTypesParent-ItemImage"
            v-html="item.image"
            :style="`width:${item.preset.width}px;height:${item.preset.height}px`"
          ></div>
          <BaseButton
            class="AppTypesParent-ItemButton e2e-add-preset-type"
            type="success"
            size="sm"
            @click="mapType.give({name: item.preset.name, type: item.preset})"
          >
            {{ $t('general.addToMap') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
