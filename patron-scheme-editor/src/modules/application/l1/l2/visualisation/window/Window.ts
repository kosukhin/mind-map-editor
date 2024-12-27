import { GuestAware, GuestAwareType, GuestType, Source, SourceEmpty } from "patron-oop"

type WindowDocument = {
  height: number,
  width: number
}

export class Window implements GuestAwareType<WindowDocument> {
  private source = new Source<WindowDocument>({
    height: window.innerHeight,
    width: window.innerWidth
  });

  public constructor() {
    const resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        this.source.give({
          height: window.innerHeight,
          width: window.innerWidth
        });
      });
    });

    const body = document.querySelector('body');

    if (body) {
      resizeObserver.observe(body);
    }
  }

  public value(guest: GuestType<WindowDocument>) {
    this.source.value(guest);
    return this;
  }
}
