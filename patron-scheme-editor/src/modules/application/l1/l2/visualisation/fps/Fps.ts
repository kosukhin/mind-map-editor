import { GuestObjectType } from 'patron-oop';

export class Fps {
  public value<R extends GuestObjectType<number>>(guest: R) {
    if (typeof performance === 'undefined') {
      guest.give(0);
    }
    const every = 10;
    let last = performance.now();
    let ticks = 0;

    const doFrameMeasure = () => requestAnimationFrame((() => {
      ticks += 1;
      if (ticks >= every) {
        const now = performance.now();
        const diff = now - last;
        guest.give(Math.round(1000 / (diff / ticks)));
        last = now;
        ticks = 0;
      }
      doFrameMeasure();
    }));
    doFrameMeasure();

    return guest;
  }
}
