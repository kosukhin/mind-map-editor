import { ConvertableRevertable } from '@/modules/eo/targets/system/ConvertableRevertable';

export class JSONString<T> implements ConvertableRevertable<T, string> {
  revert(from: string): T {
    return JSON.parse(from);
  }

  convert(from: T): string {
    return JSON.stringify(from);
  }
}
