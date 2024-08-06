import { Canvas } from '@/objects/application/canvas/Canvas';
import { ResultOf } from '@/objects/system/result/ResultOf';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';

/**
 * Конвертация структуры данных холста в объект
 */
export class CanvasNull implements Canvas {
  private canvas = new ResultOf<ResultValuableParam<Canvas>>(null);

  public value() {
    return this.canvas;
  }
}
