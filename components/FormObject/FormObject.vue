<script lang="ts" setup>
import { watch } from '@vue/runtime-core'
import { computed, ref } from '@vue/reactivity'
import cloneDeep from 'lodash/cloneDeep'
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
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
  SHOW_TRANSFER,
} from '~/constants'
import { MapObject } from '~/entities'
import { all, cloneObject, createMapObjectUrl, setValue } from '~/utils'
import { removeObjectOnLayer, updateObjectOnLayer } from '~/utils/konva'
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

const { close, isOpened, open } = useSharedOverlay()
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

const i18n = useI18n()
const { layer, layerObjects } = useSharedLayer()
const remove = () => {
  if (!confirm(i18n.t('formObject.notifications.sureDelete'))) {
    return
  }

  close()
  all([currentObject, map, layer] as const).map(([vObj, vMap, vLayer]) => {
    findRelationsToRemove(vObj, vMap).map((relations) => {
      relations.forEach((relation) => {
        relation.indexes.forEach((indexToRemove) => {
          vMap.objects[relation.objectId].arrows.splice(indexToRemove, 1)
        })
        updateObjectOnLayer(
          layerObjects,
          vLayer,
          vMap.objects[relation.objectId],
          vMap
        )
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
      await cloneObject(vObj, vMap, vLayer, layerObjects)
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
      <h2 class="FormObject-MainTitle">{{ $t('formObject.mapObject') }}</h2>
      <small v-if="currentObject.value" class="FormObject-MainSubTitle">
        <span> ID #{{ currentObject.value.id }} </span>
        <BaseButton size="sm" type="primary" @click="onCopyUrl">
          {{ $t('formObject.copy') }}
        </BaseButton>
      </small>
    </template>
    <div v-if="!settings.isNothing && form" class="FormObject">
      <div v-if="!settings.value.isEditable" class="FormObject-Inner">
        <div class="FormObject-Title">{{ $t('formObject.name') }}</div>
        <div class="FormObject-Description">{{ currentObject.value.name }}</div>
        <div class="FormObject-Title">{{ $t('formObject.description') }}</div>
        <div class="FormObject-Description">
          {{
            currentObject.value.description
              ? currentObject.value.description
              : $t('formObject.noDescription')
          }}
        </div>
      </div>
      <div v-else class="FormObject-Inner" @change="isDirty = true">
        <div class="FormObject-Row">
          <BaseCheckbox
            v-model="form.linked"
            :label="$t('formObject.nameAsLink')"
          />
        </div>
        <template v-if="form.linked">
          <div class="FormObject-Title">{{ $t('formObject.outerLink') }}</div>
          <div class="FormObject-Row">
            <BaseInput v-model="objectUrl" />
          </div>
          <div class="FormObject-Row">
            <BaseCheckbox
              v-model="form.targetBlank"
              :label="$t('formObject.inNewTab')"
            />
          </div>
        </template>
        <div class="FormObject-Title">{{ $t('formObject.topName') }}</div>
        <div class="FormObject-Row">
          <BaseTextarea v-model="form.additionalName" />
        </div>
        <div class="FormObject-Title">{{ $t('formObject.bottomName') }}</div>
        <div class="FormObject-Row">
          <BaseTextarea v-model="form.name" />
        </div>
        <div class="FormObject-Title">{{ $t('formObject.description') }}</div>
        <div class="FormObject-Row">
          <BaseTextarea v-model="form.description" />
        </div>
        <div class="FormObject-Title">Z-Index</div>
        <div class="FormObject-Row">
          <BaseInput v-model="form.zindex" type="number" />
        </div>
        <div class="FormObject-Title">{{ $t('formObject.objectType') }}</div>
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
            {{ $t('formObject.clone') }}
          </BaseButton>
        </div>
        <div class="FormObject-Row">
          <BaseButton
            class="FormObject-ArrowButton"
            type="primary"
            size="md"
            @click="open(SHOW_TRANSFER)"
          >
            {{ $t('formObject.transfer') }}
          </BaseButton>
        </div>
        <div class="FormObject-Row">
          <BaseCheckbox
            v-model="form.inMenu"
            :label="$t('formObject.useInMenu')"
          />
        </div>
        <template v-if="form.inMenu">
          <div class="FormObject-Title">{{ $t('formObject.menuOrder') }}</div>
          <div class="FormObject-Row">
            <BaseInput v-model="form.menuOrder" type="number" />
          </div>
        </template>
        <template v-if="form.arrows && form.arrows.length">
          <div class="FormObject-Title">{{ $t('formObject.relations') }}</div>
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
              >
                {{ $t('formObject.delete') }}
              </BaseButton>
            </div>
          </div>
        </template>
      </div>
    </div>
    <template #footer>
      <div class="FormObject-ButtonsGroup">
        <BaseButton type="success" @click="save">
          {{ $t('formObject.save') }}
        </BaseButton>
        <BaseButton type="danger" @click="remove">
          {{ $t('formObject.delete') }}
        </BaseButton>
      </div>
      <div class="FormObject-ButtonsGroup">
        <BaseButton @click="cancel">
          {{ $t('formObject.cancel') }}
        </BaseButton>
      </div>
    </template>
  </BaseDrawer>
</template>

<style scoped lang="scss">
@import 'FormObject';
</style>
