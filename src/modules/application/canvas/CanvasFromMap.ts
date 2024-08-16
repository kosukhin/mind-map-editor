import { Map } from '@/modules/application/map/Map';
import { CanvasStructure } from '@/modules/entities/CanvasStructure';
import { ResultObservable } from '@/modules/system/result/ResultObservable';
import { ResultObservableParent } from '@/modules/system/result/ResultObservableParent';

/**
 * Реагируем на изменение Map отрисовкой нового холста
 */
export class CanvasFromMap extends ResultObservableParent<CanvasStructure> {
  constructor(parent: ResultObservable<CanvasStructure>, private map: Map) {
    super(parent);
  }
}
