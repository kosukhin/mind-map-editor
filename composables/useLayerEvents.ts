import { useLayer } from "~/composables";
import { watch } from "@vue/runtime-core";
import {Nullable} from '~/entities';
import { shallowRef } from "@vue/reactivity";
import { KonvaEventObject } from "konva/lib/Node";

type KonvaEvent = Nullable<KonvaEventObject<any>>;

export const useLayerEvents = () => {
  const { layer } = useLayer();
  const dragend = shallowRef<KonvaEvent>(null);
  const dragstart = shallowRef<KonvaEvent>(null);
  const click = shallowRef<KonvaEvent>(null);
  const tap = shallowRef<KonvaEvent>(null);
  const mouseenter = shallowRef<KonvaEvent>(null);
  const mouseleave = shallowRef<KonvaEvent>(null);
  const wheel = shallowRef<KonvaEvent>(null);
  const transformend = shallowRef<KonvaEvent>(null);

  watch(layer, () => {
    // Можно сделать хэлпер notNullWatcher чтобы часто не повторять эту проверку
    if (!layer.value) return;

    layer.value.on('dragend', e => {
      dragend.value = e;
    });

    layer.value.on('dragstart', e => {
      dragstart.value = e;
    });

    layer.value.on('click', e => {
      click.value = e;
    });

    layer.value.on('tap', e => {
      tap.value = e;
    });

    layer.value.on('mouseenter', e => {
      mouseenter.value = e;
    });

    layer.value.on('mouseleave', e => {
      mouseleave.value = e;
    });

    layer.value.on('wheel', e => {
      wheel.value = e;
    });

    layer.value.on('transformend', e => {
      transformend.value = e;
    });
  })

  return {
    dragend,
    dragstart,
    click,
    tap,
    mouseenter,
    mouseleave,
    wheel,
    transformend,
  }
}
