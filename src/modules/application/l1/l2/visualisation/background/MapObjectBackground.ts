import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { GuestType } from '@/modules/system/guest/GuestType';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { CacheType } from '@/modules/system/guest/CacheType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import html2canvas from 'html2canvas';
import { Rect } from 'konva/lib/shapes/Rect';
import { Layer } from 'konva/lib/Layer';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { debug } from 'debug';

const localDebug = debug('MapObjectBackground');

export class MapObjectBackground implements GuestType<MapDocument> {
  private mapNameCache: CacheType<string>;

  public constructor(
    private konvaLayer: LayerBase,
    private mapFile: MapFileType,
    private zIndex: GuestType<() => void>,
    private factories: {
      cache: FactoryType<CacheType>,
      guest: FactoryType<GuestType>,
    },
  ) {
    this.mapNameCache = factories.cache.create(this, '');
    this.mapFile.currentMap(this);
  }

  introduction() {
    return 'patron' as const;
  }

  receive(value: MapDocument): this {
    localDebug('map received in background', value);
    this.mapNameCache.receiving(this.factories.guest.create((mapName: string) => {
      if (mapName === value.url) {
        return;
      }

      localDebug('background cache is not equals', mapName);
      this.mapNameCache.receive(value.url);
      const img = new Image();
      const gridPattern = document.querySelector('.grid-example') as HTMLElement;
      if (gridPattern) {
        html2canvas(gridPattern).then((canvas) => {
          img.src = canvas.toDataURL();
          img.onload = () => {
            this.konvaLayer.layer(this.factories.guest.create((layer: Layer) => {
              const background = new Rect({
                width: 3000,
                height: 3000,
                x: 0,
                y: 0,
                fillPatternImage: img,
                zIndex: 1,
              });
              this.zIndex.receive(() => {
                background.zIndex(0);
              });
              layer.add(background);
            }));
          };
        });
      }
    }));
    return this;
  }
}
