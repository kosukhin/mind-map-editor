<script lang="ts" setup>
import {
  useMapObjects,
  useSettings,
  useOverlay,
  useCurrentMap, useLayer
} from "~/composables";
import {watchEffect} from "@vue/runtime-core";
import Button from "~/components/ui/Button/Button.vue";
import {OVERLAY_CLOSE} from "~/constants";
import {allSet} from "~/entities";
import {updateObjectOnLayer} from "~/utils";
import Textarea from "~/components/ui/Textarea/Textarea.vue";
import Checkbox from "~/components/ui/Checkbox/Checkbox.vue";
import {ref} from "@vue/reactivity";

const {layer, layerObjects} = useLayer();
const {map} = useCurrentMap();
const {overlayName} = useOverlay();
const {currentObject, currentObjectId} = useMapObjects();
const {settings} = useSettings();
const form = ref({});

watchEffect(() => {
  form.value = {
    ...currentObject.value
  }
})

const save = () => {
  overlayName.value = OVERLAY_CLOSE;
  allSet([currentObjectId, map, layer] as const).map(async ([objId, vMap, vLayer]) => {
    vMap.objects[objId] = {
      ...vMap.objects[objId],
      ...form.value
    };
    updateObjectOnLayer(layerObjects, vLayer, currentObject.value, vMap.types);
  })
}
</script>

<template>
  <div class="ObjectForm" v-if="!settings.isNothing">
    <div class="ObjectForm-Inner" v-if="!settings.value.isEditable">
      <div class="ObjectForm-Title">Название</div>
      <div class="ObjectForm-Description">{{ currentObject.name }}</div>
      <div class="ObjectForm-Title">Описание</div>
      <div class="ObjectForm-Description">{{
          currentObject.description ? currentObject.description : 'Нет описания'
        }}
      </div>
    </div>
    <div class="ObjectForm-Inner" v-else>
      <div class="ObjectForm-Row">
        <Checkbox v-model="form.linked" label="Название ссылкой" />
      </div>
      <div class="ObjectForm-Title">Название</div>
      <div class="ObjectForm-Row">
        <Textarea v-model="form.name" />
      </div>
      <div class="ObjectForm-Title">Описание</div>
      <div class="ObjectForm-Row">
        <Textarea v-model="form.description" />
      </div>
      <div class="ObjectForm-Row">
        <Button type="success" @click="save">Сохранить</Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "ObjectForm";
</style>
