import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapDocument, MapTypeDocument,
  MapTypeWithNameDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import {
  NotificationType,
} from '@/modules/application/l1/l2/visualisation/notification/NotificationType';
import { CheckType } from '@/modules/application/l1/l2/l3/map/checks/CheckType';

/**
 * Объект для сохранения типов узлов карты
 */
export class MapTypes implements GuestType<MapTypeWithNameDocument> {
  public constructor(
    private map: MapType,
    private mapFile: MapFileType,
    private notification: NotificationType,
    private typeUsedCheck: CheckType<string>,
    private factories: {
      guest: FactoryType<GuestType>,
    },
  ) {}

  receive(value: MapTypeWithNameDocument): this {
    this.typeUsedCheck.check(value.name, this.factories.guest.create((isTypeUsed: boolean) => {
      this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
        if (isTypeUsed && value.name !== value.type.name) {
          this.notification.receive({
            type: 'error',
            text: 'Тип использован, его нельзя переименовать!',
          });
          return;
        }

        delete latestMap.types[value.name];
        this.map.receive({
          ...latestMap,
          types: {
            ...latestMap.types,
            [value.type.name]: value.type,
          },
        });
      }));
    }));
    return this;
  }
}
