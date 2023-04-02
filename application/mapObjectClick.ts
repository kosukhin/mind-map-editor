import { KonvaEventObject } from 'konva/lib/Node'
import curry from 'lodash/fp/curry'
import { MapObject, MapStructure, Maybe, MaybeInst } from '~/entities'
import { SHOW_OBJECT } from '~/constants'

interface Result {
  currentObjectId: MaybeInst<number>
  openUrlByObject: MaybeInst<MapObject>
  overlayName: MaybeInst<string>
}

export const mapObjectClick = curry(
  (
    isLocked: boolean,
    e: KonvaEventObject<MouseEvent | PointerEvent>,
    vMap: MapStructure
  ): Result => {
    const groupResult = {
      currentObjectId: Maybe<number>(),
      openUrlByObject: Maybe<MapObject>(),
      overlayName: Maybe<string>(),
    }
    const objectId = e.target.attrs.objectId

    if (e.target.attrs.text && objectId) {
      const object = vMap.objects[objectId]

      if (object.linked) {
        groupResult.openUrlByObject.value = object
        return groupResult
      }
    }

    groupResult.currentObjectId.value = objectId

    if (!isLocked) {
      groupResult.overlayName.value = SHOW_OBJECT
    }

    return groupResult
  }
)
