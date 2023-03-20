import { useCurrentMap } from "~/composables/useCurrentMap";
import { createLayer } from "~/utils/konva/createLayer";
import { addObjectToLayer } from "~/utils/konva/addObjectToLayer";
import { Ref, watch } from "@vue/runtime-core";
import {Nullable} from '~/entities/types/Nullable';

export const useCurrentMapRenderer = (
  editorWrapper: Ref<Nullable<HTMLElement>>
) => {
  const {map} = useCurrentMap();

  watch([map, editorWrapper], async () => {
    if (!editorWrapper.value || !map.value) return;
    const layer = await createLayer(editorWrapper.value);

    if (map.value) {
      for (const object of Object.values(map.value.objects)) {
        addObjectToLayer(layer, object, map.value.types);
      }
    }
  });

  return {
    map,
  }
}