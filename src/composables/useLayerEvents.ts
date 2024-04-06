import { shallowRef, watch } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { KonvaEventObject } from 'konva/lib/Node';
import { useLayer } from '@/composables/useLayer';
import { setValue } from '@/utils/common';
import Konva from 'konva';

export const useLayerEvents = createSharedComposable(() => {
  const { layer, stage } = useLayer();
  const dragend = shallowRef<KonvaEventObject<DragEvent>>();
  const dragstart = shallowRef<KonvaEventObject<DragEvent>>();
  const click = shallowRef<KonvaEventObject<MouseEvent>>();
  const stageClick = shallowRef<KonvaEventObject<MouseEvent>>();
  const tap = shallowRef<KonvaEventObject<PointerEvent>>();
  const mouseenter = shallowRef<KonvaEventObject<MouseEvent>>();
  const mouseleave = shallowRef<KonvaEventObject<MouseEvent>>();
  const wheel = shallowRef<KonvaEventObject<WheelEvent>>();
  const dragmove = shallowRef<KonvaEventObject<DragEvent>>();

  watch(layer, (newLayer, oldLayer) => {
    const setDragend = setValue(dragend);
    const setDragstart = setValue(dragstart);
    const setClick = (e: KonvaEventObject<any>) => {
      if (!(e.target instanceof Konva.Rect)) {
        e.cancelBubble = true;
      }
      setValue(click, e);
    };
    const setTap = setValue(tap);
    const setMouseenter = setValue(mouseenter);
    const setMouseleave = setValue(mouseleave);

    if (oldLayer) {
      oldLayer.off('dragend', setDragend);
      oldLayer.off('dragstart', setDragstart);
      oldLayer.off('click', setClick);
      oldLayer.off('tap', setTap);
      oldLayer.off('mouseenter', setMouseenter);
      oldLayer.off('mouseleave', setMouseleave);
      oldLayer.destroy();
    }

    if (newLayer) {
      newLayer.on('dragend', setDragend);
      newLayer.on('dragstart', setDragstart);
      newLayer.on('click', setClick);
      newLayer.on('tap', setTap);
      newLayer.on('mouseenter', setMouseenter);
      newLayer.on('mouseleave', setMouseleave);
    }
  });

  const setWheel = setValue(wheel);
  const setDragmove = setValue(dragmove);
  const setStagClick = setValue(stageClick);

  watch(stage, (newStage, oldStage) => {
    if (oldStage) {
      oldStage.off('wheel', setWheel);
      oldStage.off('dragmove', setDragmove);
      oldStage.off('click', setStagClick);
      oldStage.off('tap', setStagClick);
      oldStage.destroy();
    }

    if (newStage) {
      newStage.on('wheel', setWheel);
      newStage.on('dragmove', setDragmove);
      newStage.on('click', setStagClick);
      newStage.on('tap', setStagClick);
    }
  });

  return {
    dragend,
    dragstart,
    dragmove,
    click,
    stageClick,
    tap,
    mouseenter,
    mouseleave,
    wheel,
  };
});
