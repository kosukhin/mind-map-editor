import { Result } from '@/modules/system/result/Result';

export class ResultOf<T> implements Result<T> {
  public constructor(private value: T | null) {}

  public replaceResult(newResult: T): this {
    this.value = newResult;
    return this;
  }

  public exists() {
    return this.value !== null;
  }

  public result() {
    if (this.value === null) {
      throw new Error('Result: no value!');
    }

    return this.value;
  }
}
