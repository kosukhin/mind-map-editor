import {ref, computed} from "@vue/reactivity";
import {Nullable} from '~/entities';
import {useCurrentMap} from "~/composables";
import {createSharedComposable} from "@vueuse/core";

export const useMapTypes = createSharedComposable(() => {
    const {map} = useCurrentMap();
    const currentTypeId = ref<Nullable<string | number>>(null);
    const currentType = computed(() => {
        if (!(map.value && currentTypeId.value)) return null;
        return map.value.types[currentTypeId.value];
    });
    const types = computed(() => {
        if (!map.value) return null;
        return map.value.types;
    })

    return {
        currentTypeId,
        currentType,
        types,
    }
})