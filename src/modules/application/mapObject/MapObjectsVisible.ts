import { MapCurrent } from '@/modules/application/map/MapCurrent';
import { Cache } from '@/modules/system/guest/Cache';
import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { Chain } from '@/modules/system/guest/Chain';
import { Patron } from '@/modules/system/guest/Patron';
import { Guest } from '@/modules/system/guest/Guest';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { MapObjectsType } from '@/modules/application/mapObject/MapObjectType';
import { LayerBase } from '@/modules/application/layer/LayerBase';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { SizeDocument } from '@/modules/entities/SizeDocument';
import { GuestType } from '../../system/guest/GuestType';

export class MapObjectsVisible implements MapObjectsType {
  private visibleObjectsCache = new Cache<MapObjectDocument[]>(this);

  public constructor(konvaStage: LayerBase, canvas: BrowserCanvas, mapCurrent: MapCurrent) {
    const chain = new Chain<{layer: Layer, size: SizeDocument, objects: MapObjectDocument[]}>();
    canvas.size(new Patron(chain.receiveKey('size')));
    konvaStage.layer(new Patron(chain.receiveKey('layer')));
    mapCurrent.mapObjects(new Patron(chain.receiveKey('objects')));
    chain.result(new Patron(new Guest(({ layer, size, objects }) => {
      const stage = layer.parent as unknown as Stage;
      if (!stage) {
        return;
      }
      const visibleObjects = objects.filter((object) => this.isInBoundings(stage, size, object.position));
      this.visibleObjectsCache.receive(visibleObjects);
    })));
  }

  public objects(guest: GuestType<MapObjectDocument[]>) {
    this.visibleObjectsCache.receiving(guest);
    return this;
  }

  private isInBoundings(stage: Stage, size: SizeDocument, position: [number, number]) {
    const stageStartX = stage.x() + 100;
    const stageEndX = stage.x() - size.width;
    const stageStartY = stage.y() + 100;
    const stageEndY = stage.y() - size.height;
    const [objectX, objectY] = position;
    return (
      stageStartX > -objectX
      && -objectX > stageEndX
      && stageStartY > -objectY
      && -objectY > stageEndY
    );
  }
}
