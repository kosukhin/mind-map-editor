import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapObjectCurrentType,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrentType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';

const regexpMatches = (str: string, reg: RegExp) => {
  const matches = str.matchAll(reg);
  return Array.from(matches).map((v) => v[1]);
};

const buildMapFromArray = (arr: any[], existedFields: Record<string, unknown>) => arr.reduce((acc, item) => {
  acc[item] = existedFields[item] || item;
  return acc;
}, {} as any);

export class ObjectAdditionalFieldsFix implements GuestType<string> {
  public constructor(
    objectCurrent: MapObjectCurrentType,
    private mapFile: MapFileType,
    private mapObject: MapObjectType,
    private factories: {
      guest: FactoryType<GuestType>,
    },
  ) {
    objectCurrent.objectId(this);
  }

  introduction() {
    return 'patron' as const;
  }

  receive(value: string): this {
    this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
      const object = latestMap.objects[value];
      if (!object) {
        return;
      }
      const objectType = latestMap.types[object.type];
      const variableRegexp = /\$\{([a-zA-Z1-9]+)\}/g;
      const fields = regexpMatches(objectType.svg, variableRegexp);
      const neededFields = fields.filter(
        (v) => v !== 'width' && v !== 'height',
      );
      object.additionalFields = buildMapFromArray(neededFields, object.additionalFields ?? {});
      this.mapObject.receive(object);
    }));
    return this;
  }
}
