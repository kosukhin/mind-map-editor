import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { KonvaLayer } from '@/modules/integration/konva/KonvaTypes';
import { debug } from 'debug';
import Konva from 'konva';
import { FactoryType, GuestObjectType, SourceType } from 'patron-oop';

const localDebug = debug('MapObjectBackground');

export class MapObjectBackground implements GuestObjectType<MapDocument> {
  private mapNameCache: SourceType<string>;

  public constructor(
    private konvaLayer: LayerBase,
    private mapFile: MapFileType,
    private zIndex: GuestObjectType<() => void>,
    private factories: {
      cache: FactoryType<SourceType>;
      patron: FactoryType<GuestObjectType>;
      guest: FactoryType<GuestObjectType>;
      patronOnce: FactoryType<GuestObjectType>;
    },
  ) {
    this.mapNameCache = factories.cache.create('');
    this.mapFile.currentMap(factories.patron.create(this));
  }

  public give(value: MapDocument): this {
    this.konvaLayer.layer(
      this.factories.patronOnce.create((layer: KonvaLayer) => {
        localDebug('map received in background', value);
        this.mapNameCache.value(
          this.factories.guest.create((mapName: string) => {
            if (mapName === value.url) {
              return;
            }

            localDebug('background cache is not equals', mapName);
            this.mapNameCache.give(value.url);
            const img = new Image();
            const gridPattern = document.querySelector('.grid-example') as HTMLElement;
            localDebug('grid example', gridPattern);
            import('@/assets/grid.jpg').then((module: { default: string }) => {
              img.src = module.default;
              img.onload = () => {
                localDebug('canvas pattern loaded');
                localDebug('konva layer loaded');
                const background = new Konva.Rect({
                  width: 3000,
                  height: 3000,
                  x: 0,
                  y: 0,
                  fillPatternImage: img,
                  zIndex: 1,
                });
                this.zIndex.give(() => {
                  background.zIndex(0);
                });
                layer.add(background);
              };
            });
          }),
        );
      }),
    );
    return this;
  }
}
