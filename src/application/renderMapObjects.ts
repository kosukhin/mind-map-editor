import { KonvaLayerObject } from '@/entities/Konva';
import { MapStructure } from '@/entities/Map';
import { addObjectToLayer } from '@/utils/konva';
import { Layer } from 'konva/lib/Layer';

type Params = [Layer, MapStructure, boolean]
type Result = Array<[string, KonvaLayerObject[]]>

export const renderMapObjects = ([vLayer, vMap, vDragLocked]: Params) => {
  const promises: Promise<any>[] = Object.values(vMap.objects).map(
    (object) => addObjectToLayer(vLayer, object, vMap, vDragLocked),
  );
  return (fn: (values: Result) => void) => {
    Promise.all(promises).then((results) => {
      const resultValue: any = [];
      results.forEach((curResult) => {
        resultValue.push([curResult[0].attrs.objectId, curResult]);
      });
      fn(resultValue);
    });
  };
};
