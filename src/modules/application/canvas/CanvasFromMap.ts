import { CanvasStructure } from '@/modules/entities/CanvasStructure';
import { Result } from '@/modules/system/result/Result';
import { Canvas } from '@/modules/application/canvas/Canvas';
import { Map } from '@/modules/application/map/Map';

/**
 * Реагируем на изменение Map отрисовкой нового холста
 */
export class CanvasFromMap implements Canvas {
  public constructor(private parent: Canvas, map: Map) {
    map.value().channel().subscribe({
      notify: (mapValue) => {
        console.log('CanvasFromMap: do something', mapValue);
      },
    });
  }

  public value(): Result<CanvasStructure> {
    return this.parent.value();
  }
}
