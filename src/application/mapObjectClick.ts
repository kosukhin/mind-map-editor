import { MapObjectStructure, MapStructure } from '@/entities/MapStructures';
import { KonvaEventObject } from 'konva/lib/Node';
import { Nullable } from '@/entities/Nullable';
import { SHOW_OBJECT } from '@/constants/overlays';

interface Result {
  currentObjectId: Nullable<number>
  openUrlByObject: Nullable<MapObjectStructure>
  overlayName: Nullable<string>
}

type Params = [KonvaEventObject<MouseEvent | PointerEvent>, MapStructure]

export const mapObjectClick = (isLocked: boolean) => ([e, vMap]: Params): Result => {
  const groupResult: Result = {
    currentObjectId: null,
    openUrlByObject: null,
    overlayName: null,
  };
  const { objectId } = e.target.attrs;
  if (e.target.attrs.text && objectId) {
    const object = vMap.objects[objectId];
    if (object?.linked) {
      groupResult.openUrlByObject = object;
      return groupResult;
    }
  }
  groupResult.currentObjectId = objectId;
  if (!isLocked) {
    groupResult.overlayName = SHOW_OBJECT;
  }
  return groupResult;
};
