import {
  cApply,
  delayResetToNull,
} from '@/utils/common';
import { isNotNull } from '@/utils/comparators';
import { AnyFn } from '@vueuse/core';
import { ref, watch } from 'vue';

const route = ref<string | null>(null);
const realEffect = { value: null as AnyFn | null };

watch(route, (newRoute) => {
  [newRoute]
    .filter(isNotNull)
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
