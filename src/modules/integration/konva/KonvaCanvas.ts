import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { Guest } from '@/modules/system/guest/Guest';
import Konva from 'konva';
import { GuestDynamic } from '@/modules/system/guest/GuestDynamic';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { GuestChain } from '@/modules/system/guest/GuestChain';
import Stage = Konva.Stage;

export class KonvaCanvas {
  public constructor(private mapFile: MapFile, private canvas: BrowserCanvas) {}

  public stage(guest: Guest<Stage>): this {
    const chainGuest = new GuestChain(2);
    this.canvas.canvas(chainGuest);
    this.mapFile.currentMap(chainGuest);
    chainGuest.result(new GuestDynamic(([canvas, map]) => {
      console.log('result', canvas, map);
      guest.receive(null as unknown as Stage);
    }));
    return this;
  }
}
