import { Map } from '@/modules/application/map/Map';
import { Guest } from '@/modules/system/guest/Guest';
import { LayerBase } from '@/modules/application/layer/LayerBase';
import { Cache } from '@/modules/system/guest/Cache';
import { Patron } from '@/modules/system/guest/Patron';
import { Visitant } from '@/modules/system/guest/Visitant';
import { GuestChain } from '@/modules/system/guest/GuestChain';
import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { Layer } from 'konva/lib/Layer';
import { PointIdDocument } from '@/modules/entities/PointIdDocument';
import { SizeDocument } from '@/modules/entities/SizeDocument';
import { PointDocument } from '@/modules/entities/PointDocument';

export class MiniMap {
  private theSize = new Cache(this);

  private thePoints = new Cache<PointIdDocument[]>(this);

  private viewportSizeCache = new Cache<SizeDocument>(this);

  private viewportPositionCache = new Cache<PointDocument>(this);

  public constructor(private map: Map, private layer: LayerBase) {
    const minimapWidth = 130;
    const chain = new GuestChain<{layer: Layer, size: SizeDocument, objects: MapObjectDocument[]}>();
    map.mapObjects(new Patron(chain.receiveKey('objects')));
    layer.layer(new Patron(chain.receiveKey('layer')));
    layer.size(new Patron(chain.receiveKey('size')));
    chain.result(new Patron(new Visitant(({ layer: konvaLayer, size, objects }) => {
      console.log('recalc minimap');
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

  viewportPosition(guest: Guest<PointDocument>) {
    this.viewportPositionCache.receiving(guest);
    return this;
  }

  viewportSize(guest: Guest<SizeDocument>) {
    this.viewportSizeCache.receiving(guest);
    return this;
  }

  size(guest: Guest<SizeDocument>) {
    this.theSize.receiving(guest);
    return this;
  }

  points(guest: Guest<PointIdDocument[]>) {
    this.thePoints.receiving(guest);
    return this;
  }
}
