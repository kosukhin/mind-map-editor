<script lang="ts" setup>
import {
  useMapObjects,
  useSettings,
  useOverlay,
  useCurrentMap, useLayer
} from "~/composables";
import {watch} from "@vue/runtime-core";
import Button from "~/components/ui/Button/Button.vue";
import {OVERLAY_CLOSE} from "~/constants";
import {allSet} from "~/entities";
import {updateObjectOnLayer} from "~/utils";
import Textarea from "~/components/ui/Textarea/Textarea.vue";
import Checkbox from "~/components/ui/Checkbox/Checkbox.vue";
import {ref} from "@vue/reactivity";
import Input from "~/components/ui/Input/Input.vue";

const {layer, layerObjects} = useLayer();
const {map} = useCurrentMap();
const {overlayName} = useOverlay();
const {currentObject} = useMapObjects();
const {settings} = useSettings();
const form = ref({});

watch(currentObject, () => {
  currentObject.map(vObj => {
    form.value = {
      ...vObj
    }
  })
}, {
  flush: 'post',
  immediate: true,
})

const save = () => {
  overlayName.value = OVERLAY_CLOSE;
  allSet([currentObject, map, layer] as const).map(async ([vObj, vMap, vLayer]) => {
    vMap.objects[vObj.id] = {
      ...vMap.objects[vObj.id],
      ...form.value
    };
    await updateObjectOnLayer(layerObjects, vLayer, vMap.objects[vObj.id], vMap.types);
  })
}
</script>

<template>
  <div class="ObjectForm" v-if="!settings.isNothing">
    <div class="ObjectForm-Inner" v-if="!settings.value.isEditable">
      <div class="ObjectForm-Title">Название</div>
      <div class="ObjectForm-Description">{{ currentObject.value.name }}</div>
      <div class="ObjectForm-Title">Описание</div>
      <div class="ObjectForm-Description">{{
          currentObject.value.description ? currentObject.value.description : 'Нет описания'
        }}
      </div>
    </div>
    <div class="ObjectForm-Inner" v-else>
      <div class="ObjectForm-Row">
        <Checkbox v-model="form.linked" label="Название ссылкой" />
      </div>
      <template v-if="form.linked">
        <div class="ObjectForm-Title">Внешняя ссылка</div>
        <div class="ObjectForm-Row">
          <Input v-model="form.outlink" />
        </div>
        <div class="ObjectForm-Row">
          <Checkbox v-model="form.targetBlank" label="В новой влкадке" />
        </div>
      </template>
      <div class="ObjectForm-Title">Название</div>
      <div class="ObjectForm-Row">
        <Textarea v-model="form.name" />
      </div>
      <div class="ObjectForm-Title">Описание</div>
      <div class="ObjectForm-Row">
        <Textarea v-model="form.description" />
      </div>
      <div class="ObjectForm-Title">Z-Index</div>
      <div class="ObjectForm-Row">
        <Input v-model="form.zindex" type="number" />
      </div>
      <div class="ObjectForm-ButtonsGroup">
        <Button type="success" @click="save">Сохранить</Button>
        <Button type="danger">Удалить</Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "ObjectForm";
</style>
