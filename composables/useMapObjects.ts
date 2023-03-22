import {useCurrentMap} from "~/composables/useCurrentMap";
import {ref, computed} from "@vue/reactivity";
import {Nullable} from "~/entities";
import {createSharedComposable} from "@vueuse/core";

export const useMapObjects = createSharedComposable(() => {
    const {map} = useCurrentMap();
    const currentObjectId = ref<Nullable<number>>(null);
    const currentObject = computed(() => {
        if (!(map.value && currentObjectId.value)) return null;
        return map.value.objects[currentObjectId.value];
    });
    const objects = computed(() => {
        if (!map.value) return null;
        return map.value.objects;
    })

    return {
        currentObjectId,
        currentObject,
        objects,
    }
});