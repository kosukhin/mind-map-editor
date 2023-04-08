<script setup lang="ts">
import svg64 from 'svg64'
import {
  useMapType,
  useMap,
  useOverlay,
  useLayer,
  useSideBar,
} from '~/composables'
import Button from '~/components/ui/Button/Button'
import {
  DEFAULT_SVG,
  HEADER_HEIGHT,
  SHOW_TYPE,
  SHOW_SETTINGS,
  SIDEBAR_WIDTH,
} from '~/constants'
import { KonvaLayerObject, MapObject } from '~/entities'
import { addObjectToLayer, createObject, all } from '~/utils'
import Linker from '~/components/view/Linker/Linker'

const { map } = useMap()
const { layer, stage, layerObjects } = useLayer()
const { currentTypeId } = useMapType()
const { overlayName } = useOverlay()
const { isSidebarOpen } = useSideBar()

const selectType = (name: string) => {
  overlayName.value = SHOW_TYPE
  currentTypeId.value = name
}

const addType = () => {
  map.map((vMap) => {
    const newTypeId = Date.now().toString()
    vMap.types[newTypeId] = {
      name: 'Новый тип',
      svg: DEFAULT_SVG,
      width: 100,
      height: 100,
    }
    currentTypeId.value = newTypeId
    overlayName.value = SHOW_TYPE
  })
}

const removeType = (typeId: string) => {
  map.map((vMap) => {
    let isTypeUsed = false
    Object.values(vMap.objects).forEach((object) => {
      if (object.type === typeId) {
        isTypeUsed = true
      }
    })

    if (isTypeUsed) {
      alert('Невозомжно удалить тип, он используется')
      return
    }

    delete vMap.types[typeId]
  })
}

const addToCanvas = (e: DragEvent, type: string, useStagePosition = false) => {
  all([layer, map, stage] as const).map(async ([vLayer, vMap, vStage]) => {
    const vType = vMap.types[type]
    let position: [number, number] = [
      e.x - SIDEBAR_WIDTH - vType.width / 2 + vStage.x() * -1,
      e.y - HEADER_HEIGHT - vType.height / 2 + vStage.y() * -1,
    ]

    if (useStagePosition) {
      position = [vStage.x() * -1, vStage.y() * -1]
    }

    const newObject: MapObject = createObject(position, type)

    isSidebarOpen.value = false
    vMap.objects[newObject.id] = newObject
    const objects = await addObjectToLayer(vLayer, newObject, vMap)
    layerObjects.set(newObject.id, objects as KonvaLayerObject[])
  })
}
</script>

<template>
  <div class="SideBar">
    <Button type="primary" @click="addType">Добавить тип</Button>
    <div v-if="!map.isNothing" class="SideBar-Items">
      <div
        v-for="(type, name) in map.value.types"
        :key="name"
        class="SideBar-Item"
      >
        <div class="SideBar-ItemName">{{ type.name }}</div>
        <img
          alt="Перетащите на канвас, чтобы добавить"
          :src="svg64(type.svg)"
          class="SideBar-ItemImage"
          draggable="true"
          title="Перетащите на канвас, чтобы добавить"
          @dblclick="addToCanvas($event, name, true)"
          @dragend="addToCanvas($event, name)"
        />
        <div class="SideBar-ItemButtons">
          <Button size="sm" type="primary" @click="selectType(name)">
            Изменить
          </Button>
          <Button size="sm" type="danger" @click="removeType(name)">
            Удалить
          </Button>
        </div>
      </div>
    </div>
    <div class="SideBar-Footer">
      <Button type="primary" @click="overlayName.value = SHOW_SETTINGS">
        Настройки
      </Button>
      <Linker />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'SideBar';
</style>
