import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { Cache } from '@/modules/system/guest/Cache';
import { Patron } from '@/modules/system/guest/Patron';
import { Guest } from '@/modules/system/guest/Guest';
import { Chain } from '@/modules/system/guest/Chain';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { Layer } from 'konva/lib/Layer';
import { PointIdDocument } from '@/modules/application/l1/l2/l3/map/documents/PointIdDocument';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { debug } from 'debug';
import { GuestInTheMiddle } from '@/modules/system/guest/GuestInTheMiddle';
import { GuestCast } from '@/modules/system/guest/GuestCast';
import { GuestType } from '@/modules/system/guest/GuestType';

const localDebug = debug('app:MiniMap');
const minimapWidth = 130;

export class MiniMap {
  private theSize = new Cache(this);

  private thePoints = new Cache<PointIdDocument[]>(this);

  private viewportSizeCache = new Cache<SizeDocument>(this);

  public constructor(private map: MapType, private layer: LayerBase) {
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
      this.viewportSizeCache.receive(layerSize);
      const miniSize = {
        width: size.width * scale,
        height: size.height * scale,
      };
      this.theSize.receive(miniSize);
      const points = objects.map((object) => ({
        id: object.id,
        x: object.position[0] * scale,
        y: object.position[1] * scale,
      }));
      localDebug('minimap points', points);
      this.thePoints.receive(points);
    })));
  }

  viewportPosition(guest: GuestType<PointDocument>) {
    const chain = new Chain<{size: SizeDocument, position: PointDocument}>();
    this.layer.size(new GuestCast(guest, chain.receiveKey('size')));
    this.layer.position(new GuestCast(guest, chain.receiveKey('position')));
    chain.result(new GuestInTheMiddle(guest, ({ size, position }) => {
      const scale = minimapWidth / size.width;
      const scaledPosition = {
        x: position.x * scale * -1,
        y: position.y * scale * -1,
      };
      localDebug('scaled position is', scaledPosition);
      guest.receive(scaledPosition);
    }));
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
