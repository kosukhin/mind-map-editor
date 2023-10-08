import { KonvaEventObject } from 'konva/lib/Node'
import { MapObject, MapStructure, MaybeInst } from '~/entities'
import { Maybe } from '~/utils'
import { SHOW_OBJECT } from '~/constants'

interface Result {
  currentObjectId: MaybeInst<number>
  openUrlByObject: MaybeInst<MapObject>
  overlayName: MaybeInst<string>
}

type Params = [KonvaEventObject<MouseEvent | PointerEvent>, MapStructure]

export const mapObjectClick =
  (isLocked: boolean) =>
  ([e, vMap]: Params): Result => {
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
