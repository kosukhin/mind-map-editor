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

export class MiniMap {
  private theSize = new Cache(this);

  private thePoints = new Cache<PointIdDocument[]>(this);

  public constructor(private map: Map, private layer: LayerBase) {
    const minimapWidth = 130;
    const chain = new GuestChain<{layer: Layer, objects: MapObjectDocument[]}>();
    map.mapObjects(new Patron(chain.receiveKey('objects')));
    layer.layer(new Patron(chain.receiveKey('layer')));
    chain.result(new Patron(new Visitant(({ layer: konvaLayer, objects }) => {
      const layerSize = {
        width: konvaLayer.width(),
        height: konvaLayer.height(),
      };
      const scale = minimapWidth / layerSize.width;
      const miniSize = {
        width: layerSize.width * scale,
        height: layerSize.height * scale,
      };
      this.theSize.receive(miniSize);
      this.thePoints.receive(objects.map((object) => ({
        id: object.id,
        x: object.position[0] * scale,
        y: object.position[1] * scale,
      })));
    })));
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
