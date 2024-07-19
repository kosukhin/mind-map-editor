import { Convertable } from '@/modules/eo/targets/system/Convertable';

export class JSONObjectFromString<T> implements Convertable<string, T> {
  convert(from: string): T {
    return JSON.parse(from) as T;
  }
}
