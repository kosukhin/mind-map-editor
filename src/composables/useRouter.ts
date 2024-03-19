import { AnyFn } from '@vueuse/core';
import { ref, watch } from 'vue';
import { isNotNull } from '@/utils/comparators';
import {
  cApply, cDebug, delayResetToNull, tap,
} from '@/utils/common';

const route = ref<string | null>(null);
const realEffect = { value: null as AnyFn | null };

watch(route, (newRoute) => {
  [newRoute]
    .filter(isNotNull)
    .map(tap(cDebug('router')))
    .forEach((v) => {
      [realEffect.value].filter(isNotNull).forEach(cApply(v));
    });
  delayResetToNull(route);
});

export const useRouter = () => ({
  realEffect,
  push(newUrl: string) {
    route.value = newUrl;
  },
});
