import { CanvasStructure } from '@/modules/entities/CanvasStructure';
import { ResultObservableOf } from '@/modules/system/result/ResultObservableOf';

/**
 * Конвертация структуры данных холста в объект
 */
export class CanvasNullable extends ResultObservableOf<CanvasStructure> {
  constructor() {
    super(null);
  }
}
