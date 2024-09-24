import { GuestType } from '@/modules/system/guest/GuestType';

export class Fps {
  public value<R extends GuestType<number>>(guest: R) {
    if (typeof performance === 'undefined') {
      guest.receive(0);
    }
    const every = 10;
    let last = performance.now();
    let ticks = 0;

    const doFrameMeasure = () => requestAnimationFrame((() => {
      ticks += 1;
      if (ticks >= every) {
        const now = performance.now();
        const diff = now - last;
        guest.receive(Math.round(1000 / (diff / ticks)));
        last = now;
        ticks = 0;
      }
      doFrameMeasure();
    }));
    doFrameMeasure();

    return guest;
  }
}
