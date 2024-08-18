import { Guest } from '@/modules/system/guest/Guest';
import { RuntimeError } from '@/modules/system/error/RuntimeError';

/**
 * Пул постоянных посетителей для источника - патронов
 */
export class PatronPool<T> implements Guest<T> {
  private patrons = new Set<Guest<T>>();

  /**
   * Добавить гостя в пул патронов, если гость представился патроном
   */
  public add(shouldBePatron: Guest<T>) {
    try {
      if (shouldBePatron.introduction() === 'patron') {
        this.patrons.add(shouldBePatron);
      }
    } catch (e) {
      throw new RuntimeError('Cant add patron to pool', { cause: e });
    }
  }

  /**
   * Передать один документ всем известным патронам
   */
  public receive(value: T) {
    try {
      this.patrons.forEach((target) => {
        target.receive(value);
      });
      return this;
    } catch (e) {
      throw new RuntimeError('Cant receive value in patrons pool', { cause: e });
    }
  }

  /**
   * Передаст получение гостю и добавит его в патроны
   * если гость является патроном. Также передаст получение
   * другим уже существовавшим ранее патронам
   */
  public distributeReceiving(receiving: T, ...possiblePatrons: Guest<T>[]) {
    possiblePatrons.forEach((patron) => patron.receive(receiving));
    this.receive(receiving);
    possiblePatrons.forEach((patron) => this.add(patron));
  }

  public introduction() {
    return 'guest' as const;
  }
}
