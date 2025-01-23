import { GuestObjectType, FactoryType, GuestAwareAllType } from 'patron-oop';
import {
  MapDocument,
  MapTypeWithNameDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { CheckNotificationType } from '@/modules/application/l1/l2/l3/map/checks/CheckNotificationType';

/**
 * Объект для сохранения типов узлов карты
 */
export class MapTypes implements GuestObjectType<MapTypeWithNameDocument> {
  public constructor(
    private map: MapType,
    private mapFile: MapFileType,
    private checks: CheckNotificationType<MapTypeWithNameDocument>[],
    private factories: {
      guest: FactoryType<GuestObjectType>;
      chain: FactoryType<GuestAwareAllType>;
    },
  ) { }

  public give(value: MapTypeWithNameDocument): this {
    const checksChain = this.factories.chain.create(this);
    this.checks.forEach((check, index) => {
      check.breakOnFail(value, checksChain.guestKey(String(index)));
    });

    checksChain.value(
      this.factories.guest.create(() => {
        this.mapFile.currentMap(
          this.factories.guest.create((latestMap: MapDocument) => {
            delete latestMap.types[value.name];
            this.map.give({
              ...latestMap,
              types: {
                ...latestMap.types,
                [value.type.name]: value.type,
              },
            });
          }),
        );
      }),
    );

    return this;
  }
}
