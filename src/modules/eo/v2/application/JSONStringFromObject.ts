import { Convertable } from '@/modules/eo/targets/system/Convertable';

export class JSONStringFromObject<T> implements Convertable<T, string> {
  convert(from: T): string {
    return JSON.stringify(from);
  }
}
