import { useLayer } from "~/composables";
import {watchEffect} from "@vue/runtime-core";
import { Maybe, Nullable } from "~/entities";
import { shallowReactive } from "@vue/reactivity";
import { KonvaEventObject } from "konva/lib/Node";

type KonvaEvent = Nullable<KonvaEventObject<any>>;

export const useLayerEvents = () => {
  const { layer } = useLayer();
  const dragend = shallowReactive(Maybe<KonvaEvent>());
  const dragstart = shallowReactive(Maybe<KonvaEvent>());
  const click = shallowReactive(Maybe<KonvaEvent>());
  const tap = shallowReactive(Maybe<KonvaEvent>());
  const mouseenter = shallowReactive(Maybe<KonvaEvent>());
  const mouseleave = shallowReactive(Maybe<KonvaEvent>());
  const wheel = shallowReactive(Maybe<KonvaEvent>());
  const transformend = shallowReactive(Maybe<KonvaEvent>());

  watchEffect(() => {
    layer.map((vLayer) => {
      vLayer.on("dragend", e => {
        dragend.value = e;
      });

      vLayer.on("dragstart", e => {
        dragstart.value = e;
      });

      vLayer.on("click", e => {
        click.value = e;
      });

      vLayer.on("tap", e => {
        tap.value = e;
      });

      vLayer.on("mouseenter", e => {
        mouseenter.value = e;
      });

      vLayer.on("mouseleave", e => {
        mouseleave.value = e;
      });

      vLayer.on("wheel", e => {
        wheel.value = e;
      });

      vLayer.on("transformend", e => {
        transformend.value = e;
      });
    });
  });

  return {
    dragend,
    dragstart,
    click,
    tap,
    mouseenter,
    mouseleave,
    wheel,
    transformend
  };
};
