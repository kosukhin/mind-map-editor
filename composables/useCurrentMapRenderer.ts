import { useCurrentMap } from "~/composables/useCurrentMap";
import { addObjectToLayer } from "~/utils/konva/addObjectToLayer";
import { Ref, watch } from "@vue/runtime-core";
import {Nullable} from '~/entities/types/Nullable';
import { useLayer } from "~/composables/useLayer";

export const useCurrentMapRenderer = (
  editorWrapper: Ref<Nullable<HTMLElement>>
) => {
  const {layer, createLayer} = useLayer();
  const {map} = useCurrentMap();

  // Тут должна быть зависимость от layer и map
  watch([map, editorWrapper], async () => {
    if (!editorWrapper.value || !map.value) return;
    // TODO вынести createLayer в компонент Edtiro.vue
    createLayer(editorWrapper.value);

    if (layer.value) {
      for (const object of Object.values(map.value.objects)) {
        addObjectToLayer(layer.value, object, map.value.types);
      }
    }
  });

  return {
    map,
  }
}
