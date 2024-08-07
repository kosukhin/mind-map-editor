import { ResultOf } from '@/modules/system/result/ResultOf';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { Canvas } from '@/modules/application/canvas/Canvas';
import { Result } from '@/modules/system/result/Result';

/**
 * Конвертация структуры данных холста в объект
 */
export class CanvasOf implements Canvas {
  private canvas: Result<ResultValuableParam<Canvas>>;

  public constructor(canvasStructure: ResultValuableParam<Canvas>) {
    this.canvas = new ResultOf(canvasStructure);
  }

  public value() {
    return this.canvas;
  }
}
