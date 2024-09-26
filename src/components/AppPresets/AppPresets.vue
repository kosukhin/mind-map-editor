<script lang="ts" setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue';

const presetsCommon: any[] = [];
</script>

<template>
  <div class="AppPresets">
    <div class="text-md font-bold mb-2">Общие</div>
    <div class="flex gap-2 items-end">
      <div
        v-for="item in presetsCommon"
        :key="item.name"
        class="flex flex-col gap-2"
      >
        <div class="AppTypesParent-ItemTitle">{{ item.name }}</div>
        <div
          class="AppTypesParent-ItemImage"
          :style="`width:${item.width}px;height:${item.height}px`"
        ></div>
        <BaseButton
          class="AppTypesParent-ItemButton e2e-add-preset-type"
          type="success"
          size="sm"
        >
          {{ $t('general.addToMap') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
