import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { Guest } from '@/modules/system/guest/Guest';
import Konva from 'konva';
import { GuestDynamic } from '@/modules/system/guest/GuestDynamic';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { GuestChain } from '@/modules/system/guest/GuestChain';
import { Patron } from '@/modules/system/guest/Patron';
import Stage = Konva.Stage;

export class KonvaStage {
  private guestChain = new GuestChain(2);

  public constructor(private mapFile: MapFile, private canvas: BrowserCanvas) {
    const chainGuest = new Patron(this.guestChain);
    this.canvas.canvas(chainGuest);
    this.mapFile.currentMap(chainGuest);
  }

  public stage(guest: Guest<Stage>): this {
    console.log('try stage');
    this.guestChain.result(new GuestDynamic(([canvas, map]) => {
      console.log('result', canvas, map);
      const stage = new Konva.Stage({
        width: 300,
        height: 300,
        container: canvas as HTMLDivElement,
        fill: '#eee',
        draggable: true,
      });
      console.log('result', canvas, map);
      guest.receive(stage);
    }));
    return this;
  }
}
