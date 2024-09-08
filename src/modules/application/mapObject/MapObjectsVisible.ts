import { MapCurrent } from '@/modules/application/map/MapCurrent';
import { Cache } from '@/modules/system/guest/Cache';
import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { Chain } from '@/modules/system/guest/Chain';
import { Patron } from '@/modules/system/guest/Patron';
import { Guest } from '@/modules/system/guest/Guest';
import { MapObjectsType } from '@/modules/application/mapObject/MapObjectType';
import { LayerBase } from '@/modules/application/layer/LayerBase';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { SizeDocument } from '@/modules/entities/SizeDocument';
import { debug } from 'debug';
import { PointDocument } from '@/modules/entities/PointDocument';
import { GuestType } from '../../system/guest/GuestType';

const localDebug = debug('app:MapObjectsVisible');

export class MapObjectsVisible implements MapObjectsType {
  private visibleObjectsCache = new Cache<MapObjectDocument[]>(this);

  public constructor(layerDep: LayerBase, canvas: BrowserCanvas, mapCurrent: MapCurrent) {
    localDebug('constructor initialized');
    const chain = new Chain<{position: PointDocument, size: SizeDocument, objects: MapObjectDocument[]}>();
    canvas.size(new Patron(chain.receiveKey('size')));
    layerDep.position(new Patron(chain.receiveKey('position')));
    mapCurrent.mapObjects(new Patron(chain.receiveKey('objects')));
    chain.result(new Patron(new Guest(({ position, size, objects }) => {
      localDebug('objects come to result', objects);
      const visibleObjects = objects.filter((object) => this.isInBounding(position, size, object.position));
      localDebug('visible objects calculated', visibleObjects);
      this.visibleObjectsCache.receive(visibleObjects);
    })));
  }

  public objects(guest: GuestType<MapObjectDocument[]>) {
    this.visibleObjectsCache.receiving(guest);
    return this;
  }

  private isInBounding(layerPosition: PointDocument, size: SizeDocument, position: [number, number]) {
    const stageStartX = layerPosition.x + 100;
    const stageEndX = layerPosition.x - size.width;
    const stageStartY = layerPosition.y + 100;
    const stageEndY = layerPosition.y - size.height;
    const [objectX, objectY] = position;
    localDebug(
      'bounding vars',
      stageStartX,
      stageEndX,
      stageStartY,
      stageEndY,
    );
    localDebug('object position', position);
    return (
      stageStartX > -objectX
      && -objectX > stageEndX
      && stageStartY > -objectY
      && -objectY > stageEndY
    );
  }
}
