import { ResultOf } from '@/objects/system/result/ResultOf';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { Canvas } from '@/objects/application/canvas/Canvas';
import { Result } from '@/objects/system/result/Result';

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
