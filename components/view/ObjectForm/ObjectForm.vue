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
  useKeybindings,
} from '~/composables'
import Button from '~/components/ui/Button/Button'
import { SHOW_OBJECT } from '~/constants'
import { KonvaLayerObject, MapObject } from '~/entities'
import {
  addObjectToLayer,
  all,
  createMapObjectUrl,
  removeObjectOnLayer,
  updateObjectOnLayer,
} from '~/utils'
import Textarea from '~/components/ui/Textarea/Textarea'
import Checkbox from '~/components/ui/Checkbox/Checkbox'
import Input from '~/components/ui/Input/Input'
import { useFormDirtyCheck } from '~/composables/useFormDirtyCheck'
import Drawer from '~/components/ui/Drawer/Drawer'
import Select from '~/components/ui/Select/Select.vue'
import { findRelationsToRemove } from '~/application'

const { shiftSFired } = useKeybindings()
const { layer, layerObjects } = useLayer()
const { map } = useMap()
const { close, isClosed } = useOverlay()
const { currentObject } = useMapObject()
const { settings } = useSettings()
const form = ref({})
const { stringify } = JSON
const isDirty = computed(
  () => stringify(form.value) !== stringify(currentObject.value)
)
useFormDirtyCheck(isDirty, SHOW_OBJECT)
const mapTypes = computed(() => {
  const result = []

  map.map((vMap) => {
    Object.entries(vMap.types).forEach(([typeId, type]) => {
      result.push({
        id: typeId,
        name: type.name,
      })
    })
  })

  return result
})

watch(shiftSFired, () => {
  if (isClosed.value) {
    return
  }

  save()
})

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

const objectUrl = computed({
  get() {
    return createMapObjectUrl(form.value)
  },
  set(value) {
    form.value.outlink = value
  },
})

const remove = () => {
  if (!confirm('Вы уверены что нужно удалить?')) {
    return
  }

  close()
  all([currentObject, map] as const).map(([vObj, vMap]) => {
    findRelationsToRemove(vObj, vMap).map((relations) => {
      relations.forEach((relation) => {
        relation.indexes.forEach((indexToRemove) => {
          vMap.objects[relation.objectId].arrows.splice(indexToRemove, 1)
        })
      })
    })
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
        outlink: objectUrl.value,
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

const clone = () => {
  close()
  all([currentObject, map, layer] as const).map(
    async ([vObj, vMap, vLayer]) => {
      const newId = Date.now().toString()
      const clonedObject = cloneDeep(vObj)
      clonedObject.id = newId
      vMap.objects[newId] = clonedObject
      const objects = await addObjectToLayer(vLayer, clonedObject, vMap)
      layerObjects.set(clonedObject.id, objects as KonvaLayerObject[])
    }
  )
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
            <Input v-model="objectUrl" />
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
        <div class="ObjectForm-Title">Тип объекта</div>
        <div class="ObjectForm-Row">
          <Select
            v-model="form.type"
            :items="mapTypes"
            option-id="id"
            option-label="name"
          />
        </div>
        <div class="ObjectForm-Row">
          <Button
            class="ObjectForm-ArrowButton"
            type="primary"
            size="md"
            @click="clone"
          >
            Клонировать
          </Button>
        </div>
        <div class="ObjectForm-Row">
          <Checkbox v-model="form.inMenu" label="Использовать в меню" />
        </div>
        <template v-if="form.inMenu">
          <div class="ObjectForm-Title">Порядок в меню</div>
          <div class="ObjectForm-Row">
            <Input v-model="form.menuOrder" type="number" />
          </div>
        </template>
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
