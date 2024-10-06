import { GuestType } from '@/modules/system/guest/GuestType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { ChainType } from '@/modules/system/guest/ChainType';
import { debug } from 'debug';
import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';
import { MapDocument } from '../documents/MapStructures';
import { MapFileType } from '../mapFile/MapFileType';

type HistoryProps = {
  historyIndex: number,
  mapsHistory: MapDocument[]
}

const localDebug = debug('MapHistory');

/**
 * История изменения карты
 */
export class MapHistory implements GuestType<MapDocument> {
  private mapsHistory: CacheType<MapDocument[]>;

  private historyIndex: CacheType<number>;

  public constructor(
    private mapFile: MapFileType,
    private map: MapType,
    private mapId: MapCurrentIDType,
    private factories: {
      cache: FactoryType<CacheType>,
      guest: FactoryType<GuestType>,
      guestInTheMiddle: FactoryType<GuestType>,
      guestCast: FactoryType<GuestType>,
      chain: FactoryType<ChainType>,
      patron: FactoryType<GuestType>
    },
  ) {
    this.mapsHistory = factories.cache.create(this, []);
    this.historyIndex = factories.cache.create(this, 0);
    this.mapFile.currentMap(factories.patron.create(this));
    this.mapId.id(factories.patron.create(
      factories.guest.create(() => {
        this.mapsHistory.receive([]);
        this.historyIndex.receive(0);
      }),
    ));
  }

  public receive(value: MapDocument): this {
    requestIdleCallback(() => {
      this.historyIndex.receiving(
        this.factories.guest.create(
          (lastHistoryIndex: number) => {
            this.mapsHistory.receiving(
              this.factories.guest.create((history: MapDocument[]) => {
                localDebug('add map to history', history, value);
                const isMapFromHistory = history.some(
                  (historyMap) => JSON.stringify(historyMap) === JSON.stringify(value),
                );
                localDebug('isMapFromHistory', isMapFromHistory);
                if (!isMapFromHistory) {
                  const prevHistory = history[lastHistoryIndex] ? [history[lastHistoryIndex]] : [];
                  this.historyIndex.receive(0);
                  this.mapsHistory.receive([value, ...prevHistory, ...history.slice(0, 9)]);
                }
              }),
            );
          },
        ),
      );
    });
    return this;
  }

  public isPrevPossible<R extends GuestType<boolean>>(guest: R) {
    const chain = this.factories.chain.create(this);
    this.historyIndex.receiving(this.factories.guestCast.create(guest, chain.receiveKey('historyIndex')));
    this.mapsHistory.receiving(this.factories.guestCast.create(guest, chain.receiveKey('mapsHistory')));
    chain.result(
      this.factories.guestInTheMiddle.create(guest, ({ historyIndex, mapsHistory }: HistoryProps) => {
        const isPrevPossible = historyIndex < mapsHistory.length - 1;
        localDebug('recalculate is prev possible', isPrevPossible);
        guest.receive(isPrevPossible);
      }),
    );
    return guest;
  }

  public prev() {
    this.historyIndex.receiving(
      this.factories.guest.create((lastHistoryIndex: number) => {
        const nextHistoryIndex = lastHistoryIndex + 1;
        this.historyIndex.receive(nextHistoryIndex);
        this.mapsHistory.receiving(
          this.factories.guest.create((mapsHistory: MapDocument[]) => {
            const map = mapsHistory[nextHistoryIndex];
            this.map.receive(map);
          }),
        );
      }),
    );
  }

  public isNextPossible<R extends GuestType<boolean>>(guest: R) {
    const chain = this.factories.chain.create(this);
    this.historyIndex.receiving(this.factories.guestCast.create(guest, chain.receiveKey('historyIndex')));
    this.mapsHistory.receiving(this.factories.guestCast.create(guest, chain.receiveKey('mapsHistory')));
    chain.result(
      this.factories.guestInTheMiddle.create(guest, ({ historyIndex, mapsHistory }: HistoryProps) => {
        const isNextPossible = historyIndex > 0 && historyIndex <= mapsHistory.length - 1;
        localDebug('recalculate is next possible', isNextPossible);
        guest.receive(isNextPossible);
      }),
    );
    return guest;
  }

  public next() {
    this.historyIndex.receiving(
      this.factories.guest.create((lastHistoryIndex: number) => {
        const nextHistoryIndex = lastHistoryIndex - 1;
        this.historyIndex.receive(nextHistoryIndex);
        this.mapsHistory.receiving(
          this.factories.guest.create((mapsHistory: MapDocument[]) => {
            const map = mapsHistory[nextHistoryIndex];
            this.map.receive(map);
          }),
        );
      }),
    );
  }
}
