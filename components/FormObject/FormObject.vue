<script lang="ts" setup>
import { watch } from '@vue/runtime-core'
import { computed, ref } from '@vue/reactivity'
import cloneDeep from 'lodash/cloneDeep'
import { useClipboard } from '@vueuse/core'
import {
  useSharedMapObject,
  useSettings,
  useSharedOverlay,
  useSharedMap,
  useSharedLayer,
  useSharedKeybindings,
  useSharedNotify,
  useFormDirtyCheck,
} from '~/composables'
import {
  COPIED,
  NOT_SUPPOERTED,
  NOTIFY_ERROR,
  NOTIFY_SUCCESS,
  SHOW_OBJECT,
} from '~/constants'
import { KonvaLayerObject, MapObject } from '~/entities'
import {
  addObjectToLayer,
  all,
  createMapObjectUrl,
  removeObjectOnLayer,
  setValue,
  updateObjectOnLayer,
} from '~/utils'
import { findRelationsToRemove } from '~/application'
import BaseButton from '~/components/BaseButton/BaseButton.vue'
import BaseTextarea from '~/components/BaseTextarea/BaseTextarea.vue'
import BaseCheckbox from '~/components/BaseCheckbox/BaseCheckbox.vue'
import BaseInput from '~/components/BaseInput/BaseInput.vue'
import BaseDrawer from '~/components/BaseDrawer/BaseDrawer.vue'
import BaseSelect from '~/components/BaseSelect/BaseSelect.vue'

const { stringify } = JSON

const { map } = useSharedMap()
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

const { close, isOpened } = useSharedOverlay()
const { ctrlSFired } = useSharedKeybindings()
watch(ctrlSFired, () => {
  if (!isOpened(SHOW_OBJECT)) {
    return
  }
  save()
})

const form = ref({})
const { currentObject } = useSharedMapObject()
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
const isDirty = computed(
  () => stringify(form.value) !== stringify(currentObject.value)
)
useFormDirtyCheck(isDirty, SHOW_OBJECT)

const objectUrl = computed({
  get() {
    return createMapObjectUrl(form.value)
  },
  set(value) {
    form.value.outlink = value
  },
})

const { layer, layerObjects } = useSharedLayer()
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

const { message } = useSharedNotify()
const { copy, isSupported } = useClipboard()
function onCopyUrl() {
  if (!isSupported) {
    setValue(message, [NOT_SUPPOERTED, NOTIFY_ERROR])
    return
  }
  currentObject.map((vObject) => {
    copy(`${location.pathname}#${vObject.id}`)
    setValue(message, [COPIED, NOTIFY_SUCCESS])
  })
}

const { settings } = useSettings()
</script>

<template>
  <BaseDrawer :name="SHOW_OBJECT">
    <template #header>
      <h2 class="FormObject-MainTitle">Объект карты</h2>
      <small v-if="currentObject.value" class="FormObject-MainSubTitle">
        <span> ID #{{ currentObject.value.id }} </span>
        <BaseButton size="sm" type="primary" @click="onCopyUrl">
          копировать
        </BaseButton>
      </small>
    </template>
    <div v-if="!settings.isNothing && form" class="FormObject">
      <div v-if="!settings.value.isEditable" class="FormObject-Inner">
        <div class="FormObject-Title">Название</div>
        <div class="FormObject-Description">{{ currentObject.value.name }}</div>
        <div class="FormObject-Title">Описание</div>
        <div class="FormObject-Description">
          {{
            currentObject.value.description
              ? currentObject.value.description
              : 'Нет описания'
          }}
        </div>
      </div>
      <div v-else class="FormObject-Inner" @change="isDirty = true">
        <div class="FormObject-Row">
          <BaseCheckbox v-model="form.linked" label="Название ссылкой" />
        </div>
        <template v-if="form.linked">
          <div class="FormObject-Title">Внешняя ссылка</div>
          <div class="FormObject-Row">
            <BaseInput v-model="objectUrl" />
          </div>
          <div class="FormObject-Row">
            <BaseCheckbox v-model="form.targetBlank" label="В новой влкадке" />
          </div>
        </template>
        <div class="FormObject-Title">Название сверху</div>
        <div class="FormObject-Row">
          <BaseTextarea v-model="form.additionalName" />
        </div>
        <div class="FormObject-Title">Название внизу</div>
        <div class="FormObject-Row">
          <BaseTextarea v-model="form.name" />
        </div>
        <div class="FormObject-Title">Описание</div>
        <div class="FormObject-Row">
          <BaseTextarea v-model="form.description" />
        </div>
        <div class="FormObject-Title">Z-Index</div>
        <div class="FormObject-Row">
          <BaseInput v-model="form.zindex" type="number" />
        </div>
        <div class="FormObject-Title">Тип объекта</div>
        <div class="FormObject-Row">
          <BaseSelect
            v-model="form.type"
            :items="mapTypes"
            option-id="id"
            option-label="name"
          />
        </div>
        <div class="FormObject-Row">
          <BaseButton
            class="FormObject-ArrowButton"
            type="primary"
            size="md"
            @click="clone"
          >
            Клонировать
          </BaseButton>
        </div>
        <div class="FormObject-Row">
          <BaseCheckbox v-model="form.inMenu" label="Использовать в меню" />
        </div>
        <template v-if="form.inMenu">
          <div class="FormObject-Title">Порядок в меню</div>
          <div class="FormObject-Row">
            <BaseInput v-model="form.menuOrder" type="number" />
          </div>
        </template>
        <template v-if="form.arrows && form.arrows.length">
          <div class="FormObject-Title">Связи</div>
          <div class="FormObject-Row">
            <div
              v-for="(arrow, index) in form.arrows"
              :key="arrow.id"
              class="FormObject-Arrow"
            >
              <span class="FormObject-ArrowName">
                #{{ index + 1 }} {{ map.value.objects[arrow.id].name }}
              </span>
              <BaseButton
                class="FormObject-ArrowButton"
                type="danger"
                size="sm"
                @click="removeRelation(index)"
                >Удалить
              </BaseButton>
            </div>
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <div class="FormObject-ButtonsGroup">
        <BaseButton type="success" @click="save">Сохранить</BaseButton>
        <BaseButton type="danger" @click="remove">Удалить</BaseButton>
      </div>
      <div class="FormObject-ButtonsGroup">
        <BaseButton @click="cancel">Отменить</BaseButton>
      </div>
    </template>
  </BaseDrawer>
</template>

<style scoped lang="scss">
@import 'FormObject';
</style>
