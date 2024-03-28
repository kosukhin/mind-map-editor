// eslint-disable-next-line max-classes-per-file
import { AnyFn } from '@/entities/Utils';

interface ListInterface {
  toArray(): any[]
  ensureEvery(predicate: AnyFn): ListInterface
  ensureSome(predicate: AnyFn): ListInterface
  apply(fn: AnyFn): any
  tap(fn: AnyFn): ListInterface
}

class LeftList implements ListInterface {
  // eslint-disable-next-line class-methods-use-this
  toArray() {
    return [];
  }

  ensureEvery() {
    return this;
  }

  ensureSome() {
    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  apply(fn: AnyFn) {
    return null;
  }

  tap(fn: AnyFn) {
    return this;
  }
}
class List implements ListInterface {
  // eslint-disable-next-line no-useless-constructor
  constructor(private arr: any[]) {}

  toArray() {
    return this.arr;
  }

  ensureEvery(predicate: AnyFn) {
    return this.arr.every(predicate) ? this : new LeftList();
  }

  ensureSome(predicate: AnyFn) {
    return this.arr.some(predicate) ? this : new LeftList();
  }

  apply(fn: AnyFn) {
    return fn(...this.arr);
  }

  tap(fn: AnyFn) {
    fn(...this.arr);
    return this;
  }
}

// Цель этой функции подготовить использование массива как аргументов для функции
export const withList = (args: any[]) => new List(args);
