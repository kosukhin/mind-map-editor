<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseModal from '@/components/BaseModal/BaseModal.vue';
import { useApplication } from '@/composables/useApplication';
import { useFactories } from '@/composables/useFactories';
import { EditorSettings } from '@/modules/application/l1/l2/l3/l4/editor/EditorSettings';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
// @ts-ignore
import { computed } from 'vue';

const {
   svgMapTypeImage,
} = useFactories();
const { mapType, settings } = useApplication();

const settingsRef = new VueRefPatron<EditorSettings>();
settings.value(settingsRef);

const presetsExtended = computed(
  () => Object.fromEntries(
    Object.entries(settingsRef.value.presets).map(
      ([groupName, presets]) => [
        groupName,
        presets.map(
          (preset) => ({
            preset,
            image: svgMapTypeImage.create(preset).markup(),
          })
        )
      ]
    )
  )
);
</script>

<template>
  <BaseModal name="presets">
    <div class="AppPresets">
      <div class="text-md font-bold mb-2">Общие</div>
      <div class="flex flex-col gap-2">
        <div v-for="(presets, groupName) in presetsExtended" :key="groupName">
          <h3 class="text-md font-bold mb-1">{{ groupName }}</h3>
          <div class="flex gap-2 flex-wrap items-end">
            <div
              v-for="item in presets"
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
      </div>
    </div>
  </BaseModal>
</template>
