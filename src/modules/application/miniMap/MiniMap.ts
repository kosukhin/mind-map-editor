import { Map } from '@/modules/application/map/Map';
import { Guest } from '@/modules/system/guest/Guest';
import { LayerBase } from '@/modules/application/layer/LayerBase';
import { Value } from '@/modules/system/guest/Value';
import { Patron } from '@/modules/system/guest/Patron';
import { Visitant } from '@/modules/system/guest/Visitant';
import { GuestChain } from '@/modules/system/guest/GuestChain';
import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { Layer } from 'konva/lib/Layer';

interface PointDocument {
  id: string,
  x: number,
  y: number
}

interface SizeDocument {
  width: number;
  height: number;
}

export class MiniMap {
  private theSize = new Value({
    width: 0,
    height: 0,
  }, this);

  private thePoints = new Value<PointDocument[]>([], this);

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

  points(guest: Guest<PointDocument[]>) {
    this.thePoints.receiving(guest);
    return this;
  }
}
