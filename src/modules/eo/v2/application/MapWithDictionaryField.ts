import { Valueable } from '@/modules/eo/targets/system/Valueable';
import { MapStructure } from '@/entities/Map';
lueable';

export class MapWithDictionaryField implements Valueable<MapStructure> {
  constructor(
    private baseMap: Valueable<MapStructure>,
    private dictionaryKey: keyof MapStructure,
    private dictionaryValue: unknown,
    private dictionaryValueKey?: unknown,
  ) {}

  value(): MapStructure {
    const structure = this.baseMap.value() as any;
    const dictionaryValueKey = String(this.dictionaryValueKey ? this.dictionaryValueKey : new Date().getTime());

    return {
      ...structure,
      [this.dictionaryKey]: {
        ...structure[this.dictionaryKey],
        [dictionaryValueKey]: this.dictionaryValue,
      },
    };
  }
}
