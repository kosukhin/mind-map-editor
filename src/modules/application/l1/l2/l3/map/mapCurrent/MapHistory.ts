import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { debug } from 'debug';
import {
  ChainType,
  FactoryType,
  GuestObjectType, SourceType,
} from 'patron-oop';
import { MapDocument } from '../documents/MapStructures';
import { MapFileType } from '../mapFile/MapFileType';

type HistoryProps = {
  historyIndex: number,
  mapsHistory: MapDocument[]
}

const localDebug = debug('MapHistory');

const normalizeMapDocumentAndSerialize = (map: MapDocument) => {
  const result = JSON.parse(JSON.stringify(map)) as MapDocument;
  Object.values(result.objects).forEach((object) => {
    object.width = 0;
    object.height = 0;
  });
  return JSON.stringify(result);
};

/**
 * История изменения карты
 */
export class MapHistory implements GuestObjectType<MapDocument> {
  private mapsHistory: SourceType<MapDocument[]>;

  private historyIndex: SourceType<number>;

  public constructor(
    private mapFile: MapFileType,
    private map: MapType,
    private mapId: MapCurrentIDType,
    private factories: {
      cache: FactoryType<SourceType>,
      guest: FactoryType<GuestObjectType>,
      guestInTheMiddle: FactoryType<GuestObjectType>,
      guestCast: FactoryType<GuestObjectType>,
      chain: FactoryType<ChainType>,
      patron: FactoryType<GuestObjectType>
    },
  ) {
    this.mapsHistory = factories.cache.create(this, []);
    this.historyIndex = factories.cache.create(this, 0);
    this.mapFile.currentMap(factories.patron.create(this));
    this.mapId.id(factories.patron.create(
      factories.guest.create(() => {
        this.mapsHistory.give([]);
        this.historyIndex.give(0);
      }),
    ));
  }

  public give(value: MapDocument): this {
    requestIdleCallback(() => {
      this.historyIndex.value(
        this.factories.guest.create(
          (lastHistoryIndex: number) => {
            this.mapsHistory.value(
              this.factories.guest.create((history: MapDocument[]) => {
                localDebug('add map to history', history, value);
                const isMapFromHistory = history.some(
                  (historyMap) => normalizeMapDocumentAndSerialize(historyMap) === normalizeMapDocumentAndSerialize(value),
                );
                localDebug('isMapFromHistory', isMapFromHistory);
                if (!isMapFromHistory) {
                  const prevHistory = history[lastHistoryIndex] ? [history[lastHistoryIndex]] : [];
                  this.historyIndex.give(0);
                  this.mapsHistory.give([value, ...prevHistory, ...history.slice(0, 9)]);
                }
              }),
            );
          },
        ),
      );
    });
    return this;
  }

  public isPrevPossible<R extends GuestObjectType<boolean>>(guest: R) {
    const chain = this.factories.chain.create(this);
    this.historyIndex.value(this.factories.guestCast.create(guest, chain.receiveKey('historyIndex')));
    this.mapsHistory.value(this.factories.guestCast.create(guest, chain.receiveKey('mapsHistory')));
    chain.result(
      this.factories.guestInTheMiddle.create(guest, ({ historyIndex, mapsHistory }: HistoryProps) => {
        const isPrevPossible = historyIndex < mapsHistory.length - 1;
        localDebug('recalculate is prev possible', isPrevPossible);
        guest.give(isPrevPossible);
      }),
    );
    return guest;
  }

  public prev() {
    this.historyIndex.value(
      this.factories.guest.create((lastHistoryIndex: number) => {
        const nextHistoryIndex = lastHistoryIndex + 1;
        this.historyIndex.give(nextHistoryIndex);
        this.mapsHistory.value(
          this.factories.guest.create((mapsHistory: MapDocument[]) => {
            const map = mapsHistory[nextHistoryIndex];
            this.map.give(map);
          }),
        );
      }),
    );
  }

  public isNextPossible<R extends GuestObjectType<boolean>>(guest: R) {
    const chain = this.factories.chain.create(this);
    this.historyIndex.value(this.factories.guestCast.create(guest, chain.receiveKey('historyIndex')));
    this.mapsHistory.value(this.factories.guestCast.create(guest, chain.receiveKey('mapsHistory')));
    chain.result(
      this.factories.guestInTheMiddle.create(guest, ({ historyIndex, mapsHistory }: HistoryProps) => {
        const isNextPossible = historyIndex > 0 && historyIndex <= mapsHistory.length - 1;
        localDebug('recalculate is next possible', isNextPossible);
        guest.give(isNextPossible);
      }),
    );
    return guest;
  }

  public next() {
    this.historyIndex.value(
      this.factories.guest.create((lastHistoryIndex: number) => {
        const nextHistoryIndex = lastHistoryIndex - 1;
        this.historyIndex.give(nextHistoryIndex);
        this.mapsHistory.value(
          this.factories.guest.create((mapsHistory: MapDocument[]) => {
            const map = mapsHistory[nextHistoryIndex];
            this.map.give(map);
          }),
        );
      }),
    );
  }
}
