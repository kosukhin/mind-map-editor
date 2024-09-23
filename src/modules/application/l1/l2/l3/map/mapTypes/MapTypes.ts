import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapDocument,
  MapTypeWithNameDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import {
  CheckNotificationType,
} from '@/modules/application/l1/l2/l3/map/checks/CheckNotificationType';
import { ChainType } from '@/modules/system/guest/ChainType';

/**
 * Объект для сохранения типов узлов карты
 */
export class MapTypes implements GuestType<MapTypeWithNameDocument> {
  public constructor(
    private map: MapType,
    private mapFile: MapFileType,
    private checks: CheckNotificationType<MapTypeWithNameDocument>[],
    private factories: {
      guest: FactoryType<GuestType>,
      chain: FactoryType<ChainType>
    },
  ) {}

  receive(value: MapTypeWithNameDocument): this {
    const checksChain = this.factories.chain.create(this);
    this.checks.forEach((check, index) => {
      check.breakOnFail(value, checksChain.receiveKey(String(index)));
    });

    checksChain.result(this.factories.guest.create(() => {
      this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
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
