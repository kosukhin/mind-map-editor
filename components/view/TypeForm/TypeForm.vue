<script lang="ts" setup>
import { useCurrentMap, useMapTypes, useOverlay } from "~/composables";
import { SHOW_TYPE } from "~/constants";
import { computed, ref } from "@vue/reactivity";
import { useFormDirtyCheck } from "~/composables/useFormDirtyCheck";
import SvgEditor from "~/components/view/SvgEditor/SvgEditor.vue";
import { watch } from "@vue/runtime-core";
import Button from "~/components/ui/Button/Button.vue";
import { allSet } from "~/entities";
import Input from "~/components/ui/Input/Input.vue";

const {close} = useOverlay();
const {map} = useCurrentMap();
const { currentTypeId, currentType } = useMapTypes();
const svg = ref('');
const size = ref([0, 0]);
const form = ref<any>({});
const {stringify} = JSON;
const isDirty = computed(() =>
  stringify(form.value) !== stringify(currentType.map(vType => vType))
)
useFormDirtyCheck(isDirty, SHOW_TYPE);

watch(currentType, () => {
  currentType.map(vType => {
    form.value = {
      ...vType
    };
  })
}, {
  flush: "post",
  immediate: true,
});

const save = () => {
  close();
  allSet([map, currentTypeId] as const).map(([vMap, vTypeId]) => {
    vMap.types[vTypeId] = {
      ...vMap.types[vTypeId],
      ...form.value,
    }
  })
}
</script>

<template>
  <div class="TypeForm" v-if="!currentType.isNothing">
    <Input class="TypeForm-Row" v-model="form.name" />
    <SvgEditor class="TypeForm-Row" v-model="form" />
    <div class="TypeForm-Controls">
      <Button type="success" @click="save">
        Сохранить
      </Button>
      <Button @click="close">
        Отменить
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "TypeForm";
</style>
