<script lang="ts" setup>
import { useCurrentMap, useMapTypes, useOverlay } from "~/composables";
import { SHOW_TYPE } from "~/constants";
import { computed, ref } from "@vue/reactivity";
import { useFormDirtyCheck } from "~/composables/useFormDirtyCheck";
import SvgEditor from "~/components/view/SvgEditor/SvgEditor.vue";
import { watch } from "@vue/runtime-core";
import Button from "~/components/ui/Button/Button.vue";
import { allSet } from "~/entities";

const {close} = useOverlay();
const {map} = useCurrentMap();
const { currentTypeId, currentType } = useMapTypes();
const svg = ref('');
const size = ref([0, 0]);
const isDirty = computed(() =>
  svg.value !== currentType.map(vType => vType.svg)
)
useFormDirtyCheck(isDirty, SHOW_TYPE);

watch(currentType, () => {
  currentType.map(vType => {
    svg.value = vType.svg;
    size.value = [vType.width, vType.height];
  })
});

const save = () => {
  close();
  allSet([map, currentTypeId] as const).map(([vMap, vTypeId]) => {
    vMap.types[vTypeId] = {
      svg: svg.value,
      width: size.value[0],
      height: size.value[1],
    }
  })
}
</script>

<template>
  <div class="TypeForm" v-if="!currentType.isNothing">
    <SvgEditor class="TypeForm-Editor" v-model="svg" :size="size" />
    <div class="TypeForm-Controls">
      <Button type="success" @click="save">
        Сохранить
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "TypeForm";
</style>
