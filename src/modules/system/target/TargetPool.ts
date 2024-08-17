import { Target } from '@/modules/system/target/Target';

/**
 * Пул постоянных посетителей для источника
 */
export class TargetPool<T> implements Target<T> {
  private targets: Target<T>[] = [];

  add(target: Target<T>) {
    this.targets.push(target);
  }

  receive(value: T): this {
    this.targets.forEach((target) => {
      target.receive(value);
    });
    return this;
  }
}
