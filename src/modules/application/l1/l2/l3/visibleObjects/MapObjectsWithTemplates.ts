import { MapObjectsType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapObjectDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { ChainType } from '@/modules/system/guest/ChainType';
import {
  MapObjectWithTemplateDocument,
} from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectWithTemplateDocument';
import { debug } from 'debug';

type ChainProps = {objects: MapObjectDocument[], types: MapTypeDocument[]};

const localDebug = debug('MapObjectsWithTemplates');

/**
 * Объекты карты с отрендеренным шаблоном HTML
 */
export class MapObjectsWithTemplates {
  public constructor(
    private mapObjects: MapObjectsType,
    private map: MapType,
    private factories: {
      chain: FactoryType<ChainType>,
      guestCast: FactoryType<GuestType>,
      guestInTheMiddle: FactoryType<GuestType>
    },
  ) {}

  public objects<R extends GuestType<MapObjectWithTemplateDocument[]>>(guest: R) {
    const chain = this.factories.chain.create();
    this.map.types(this.factories.guestCast.create(guest, chain.receiveKey('types')));
    this.mapObjects.objects(this.factories.guestCast.create(guest, chain.receiveKey('objects')));
    chain.result(this.factories.guestInTheMiddle.create(guest, ({ types, objects }: ChainProps) => {
      localDebug('visible objects', objects);
      const withTemplates = objects.map((object) => {
        const type = types.find((ct) => String(ct.id) === String(object.type));
        localDebug('check type existed', type);
        if (!type) {
          return {
            obj: object,
            template: '',
          };
        }
        let { svg } = type;
        localDebug('type svg', svg);
        if (object.additionalFields) {
          Object.entries(object.additionalFields).forEach(([key, value]) => {
            svg = svg.replaceAll(`\${${key}}`, value);
          });
        }
        ['width', 'height'].forEach((key) => {
          svg = svg.replaceAll(`\${${key}}`, (object as any)[key]);
        });

        return {
          obj: object,
          template: svg,
        };
      });
      guest.receive(withTemplates);
    }));
    return guest;
  }
}
