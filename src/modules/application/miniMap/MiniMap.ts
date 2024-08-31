import { Map } from '@/modules/application/map/Map';
import { LayerBase } from '@/modules/application/layer/LayerBase';
import { Cache } from '@/modules/system/guest/Cache';
import { Patron } from '@/modules/system/guest/Patron';
import { Guest } from '@/modules/system/guest/Guest';
import { Chain } from '@/modules/system/guest/Chain';
import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { Layer } from 'konva/lib/Layer';
import { PointIdDocument } from '@/modules/entities/PointIdDocument';
import { SizeDocument } from '@/modules/entities/SizeDocument';
import { PointDocument } from '@/modules/entities/PointDocument';
import { GuestType } from '../../system/guest/GuestType';

export class MiniMap {
  private theSize = new Cache(this);

  private thePoints = new Cache<PointIdDocument[]>(this);

  private viewportSizeCache = new Cache<SizeDocument>(this);

  private viewportPositionCache = new Cache<PointDocument>(this);

  public constructor(private map: Map, private layer: LayerBase) {
    const minimapWidth = 130;
    const chain = new Chain<{layer: Layer, size: SizeDocument, objects: MapObjectDocument[]}>();
    map.mapObjects(new Patron(chain.receiveKey('objects')));
    layer.layer(new Patron(chain.receiveKey('layer')));
    layer.size(new Patron(chain.receiveKey('size')));
    chain.result(new Patron(new Guest(({ layer: konvaLayer, size, objects }) => {
      const scale = minimapWidth / size.width;
      const layerSize = {
        width: konvaLayer.width() * scale,
        height: konvaLayer.height() * scale,
      };
      this.viewportPositionCache.receive({
        x: konvaLayer.x(),
        y: konvaLayer.y(),
      });
      this.viewportSizeCache.receive(layerSize);
      const miniSize = {
        width: size.width * scale,
        height: size.height * scale,
      };
      this.theSize.receive(miniSize);
      // this.thePoints.receive(objects.map((object) => ({
      //   id: object.id,
      //   x: object.position[0] * scale,
      //   y: object.position[1] * scale,
      // })));
    })));
  }

  viewportPosition(guest: GuestType<PointDocument>) {
    this.viewportPositionCache.receiving(guest);
    return this;
  }

  viewportSize(guest: GuestType<SizeDocument>) {
    this.viewportSizeCache.receiving(guest);
    return this;
  }

  size(guest: GuestType<SizeDocument>) {
    this.theSize.receiving(guest);
    return this;
  }

  points(guest: GuestType<PointIdDocument[]>) {
    this.thePoints.receiving(guest);
    return this;
  }
}
