import { GuestAwareObjectType, GuestObjectType } from 'patron-oop';

export class Draggable implements GuestObjectType<HTMLElement> {
  public constructor(private el: GuestAwareObjectType<HTMLElement>) {
    el.value(this);
  }

  public give(el: HTMLElement): this {
    el.addEventListener('dragstart', (e) => {
      const targetEl = e.target as HTMLElement;
      if (!targetEl) {
        return;
      }
      const targetClone = targetEl.cloneNode(true) as HTMLElement;
      targetClone.style.transform = 'translate(0,0)';
      targetClone.style.position = 'absolute';
      targetClone.style.top = '0';
      targetClone.style.left = '0';
      targetClone.style.zIndex = '999';
      if (e.dataTransfer) {
        e.dataTransfer.setDragImage(targetClone, 0, 0);
      }
      document.body.append(targetClone);
      const onDrag = (e: DragEvent) => {
        targetClone.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      };
      targetEl.addEventListener('drag', onDrag, { passive: true });
      targetEl.addEventListener('dragend', () => {
        targetClone.removeEventListener('drag', onDrag);
        targetClone.remove();
      });
    });
    return this;
  }

  public introduction() {
    return 'patron' as const;
  }
}
