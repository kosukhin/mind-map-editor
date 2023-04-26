<script lang="ts" setup>
import { watch } from '@vue/runtime-core'
import { computed, ref } from '@vue/reactivity'
import cloneDeep from 'lodash/cloneDeep'
import {
  useMapObject,
  useSettings,
  useOverlay,
  useMap,
  useLayer,
} from '~/composables'
import Button from '~/components/ui/Button/Button'
import { SHOW_OBJECT } from '~/constants'
import { MapObject } from '~/entities'
import { all, removeObjectOnLayer, updateObjectOnLayer } from '~/utils'
import Textarea from '~/components/ui/Textarea/Textarea'
import Checkbox from '~/components/ui/Checkbox/Checkbox'
import Input from '~/components/ui/Input/Input'
import { useFormDirtyCheck } from '~/composables/useFormDirtyCheck'
import Drawer from '~/components/ui/Drawer/Drawer'

const { layer, layerObjects } = useLayer()
const { map } = useMap()
const { close } = useOverlay()
const { currentObject } = useMapObject()
const { settings } = useSettings()
const form = ref({})
const { stringify } = JSON
const isDirty = computed(
  () => stringify(form.value) !== stringify(currentObject.value)
)
useFormDirtyCheck(isDirty, SHOW_OBJECT)

watch(
  currentObject,
  () => {
    currentObject.map((vObj) => {
      form.value = cloneDeep(vObj)
    })
  },
  {
    flush: 'post',
    immediate: true,
  }
)

const remove = () => {
  close()
  all([currentObject, map] as const).map(([vObj, vMap]) => {
    delete vMap.objects[vObj.id]
    removeObjectOnLayer(layerObjects, vObj)
  })
}

const save = () => {
  close()
  all([currentObject, map, layer] as const).map(
    async ([vObj, vMap, vLayer]) => {
      vMap.objects[vObj.id] = {
        ...vMap.objects[vObj.id],
        ...form.value,
      }
      await updateObjectOnLayer(
        layerObjects,
        vLayer,
        vMap.objects[vObj.id],
        vMap
      )
    }
  )
}

const removeRelation = (index: number) => {
  if (!(form.value as MapObject).arrows) return
  all([currentObject, map, layer] as const).map(
    async ([vObj, vMap, vLayer]) => {
      ;(form.value as MapObject).arrows.splice(index, 1)
      await updateObjectOnLayer(
        layerObjects,
        vLayer,
        vMap.objects[vObj.id],
        vMap
      )
    }
  )
}

const cancel = () => {
  close()
}
</script>

<template>
  <Drawer :name="SHOW_OBJECT">
    <template #header>
      <h2 class="ObjectForm-MainTitle">Объект карты</h2>
      <small v-if="currentObject.value" class="ObjectForm-MainSubTitle">
        ID #{{ currentObject.value.id }}
      </small>
    </template>
    <div v-if="!settings.isNothing && form" class="ObjectForm">
      <div v-if="!settings.value.isEditable" class="ObjectForm-Inner">
        <div class="ObjectForm-Title">Название</div>
        <div class="ObjectForm-Description">{{ currentObject.value.name }}</div>
        <div class="ObjectForm-Title">Описание</div>
        <div class="ObjectForm-Description">
          {{
            currentObject.value.description
              ? currentObject.value.description
              : 'Нет описания'
          }}
        </div>
      </div>
      <div v-else class="ObjectForm-Inner" @change="isDirty = true">
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
        <div class="ObjectForm-Title">Название сверху</div>
        <div class="ObjectForm-Row">
          <Textarea v-model="form.additionalName" />
        </div>
        <div class="ObjectForm-Title">Название внизу</div>
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

        <template v-if="form.arrows && form.arrows.length">
          <div class="ObjectForm-Title">Связи</div>
          <div class="ObjectForm-Row">
            <div
              v-for="(arrow, index) in form.arrows"
              :key="arrow.id"
              class="ObjectForm-Arrow"
            >
              <span class="ObjectForm-ArrowName">
                #{{ index + 1 }} {{ map.value.objects[arrow.id].name }}
              </span>
              <Button
                class="ObjectForm-ArrowButton"
                type="danger"
                size="sm"
                @click="removeRelation(index)"
                >Удалить
              </Button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <div class="ObjectForm-ButtonsGroup">
        <Button type="success" @click="save">Сохранить</Button>
        <Button type="danger" @click="remove">Удалить</Button>
      </div>
      <div class="ObjectForm-ButtonsGroup">
        <Button @click="cancel">Отменить</Button>
      </div>
    </template>
  </Drawer>
</template>

<style scoped lang="scss">
@import 'ObjectForm';
</style>
