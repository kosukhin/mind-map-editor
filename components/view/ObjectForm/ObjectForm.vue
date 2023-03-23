<script lang="ts" setup>
import {
  useMapObjects,
  useSettings,
  useOverlay,
  useCurrentMap
} from "~/composables";
import Input from "~/components/ui/Input/Input.vue";
import {watchEffect} from "@vue/runtime-core";
import {reactive} from "@vue/reactivity";
import Button from "~/components/ui/Button/Button.vue";
import {OVERLAY_CLOSE} from "~/constants";
import {allSet} from "~/entities";

const {map} = useCurrentMap();
const {overlayName} = useOverlay();
const {currentObject, currentObjectId} = useMapObjects();
const {settings} = useSettings();
const form = reactive({
  name: '',
  description: ''
});

watchEffect(() => {
  form.name = currentObject.value.name;
  form.description = currentObject.value.description;
})

const save = () => {
  overlayName.value = OVERLAY_CLOSE;
  allSet([currentObjectId, map] as const).map(([objId, vMap]) => {
    vMap.objects[objId] = {
      ...vMap.objects[objId],
      ...form
    };
  })
}
</script>

<template>
  <div class="ObjectForm" v-if="!settings.isNothing">
    <div class="ObjectForm-Inner" v-if="!settings.value.isEditable">
      <div class="ObjectForm-Title">Название</div>
      <div class="ObjectForm-Description">{{ currentObject.name }}</div>
      <div class="ObjectForm-Title">Описание</div>
      <div class="ObjectForm-Description">{{ currentObject.description ? currentObject.description : 'Нет описания' }}</div>
    </div>
    <div class="ObjectForm-Inner" v-else>
      <div class="ObjectForm-Title">Название</div>
      <div class="ObjectForm-Row">
        <Input v-model="form.name" />
      </div>
      <div class="ObjectForm-Title">Описание</div>
      <div class="ObjectForm-Row">
        <Input v-model="form.description" />
      </div>
      <div class="ObjectForm-Row">
        <Button @click="save">Сохранить</Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "ObjectForm";
</style>
