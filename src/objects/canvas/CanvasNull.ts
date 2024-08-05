import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { Canvas } from '@/objects/canvas/Canvas';

/**
 * Конвертация структуры данных холста в объект
 */
export class CanvasNull implements Canvas {
  private canvas = new BaseResult<BaseResultParam<Canvas>>(null);

  public entity() {
    return this.canvas;
  }
}
