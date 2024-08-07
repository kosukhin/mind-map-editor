import { Canvas } from '@/modules/application/canvas/Canvas';
import { ResultOf } from '@/modules/system/result/ResultOf';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';

/**
 * Конвертация структуры данных холста в объект
 */
export class CanvasNull implements Canvas {
  private canvas = new ResultOf<ResultValuableParam<Canvas>>(null);

  public value() {
    return this.canvas;
  }
}
