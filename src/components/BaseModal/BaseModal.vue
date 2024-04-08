<script setup lang="ts">
import { watch } from '@vue/runtime-core';
import { ref } from '@vue/reactivity';
import { useMagicKeys } from '@vueuse/core';
import { useOverlay } from '@/composables/useOverlay';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const isOpened = ref(false);
const { overlayName, tryToClose, history } = useOverlay();
const close = () => {
  tryToClose.value = props.name as string;
};
watch(overlayName, () => {
  if (overlayName.value) {
    isOpened.value = overlayName.value === props.name;
  }
});
const { current } = useMagicKeys();
watch(current, () => {
  if (!isOpened.value) {
    return;
  }

  if (current.has('escape')) {
    close();
  }
});
const back = () => {
  history.value.pop();
  overlayName.value = String(history.value.pop());
};
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpened" class="absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full" @click="close">
      <div class="w-full relative max-w-[800px] bg-white p-3" @click.stop>
        <div
          v-if="history.length > 1"
          title="Назад"
          class="absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 cursor-pointer w-5"
          @click="back"
        >
          &lt;
        </div>
        <div title="Закрыть" class="absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 cursor-pointer w-5" @click="close">
          &times;
        </div>
        <div v-if="$slots.header" class="BaseModal-Header">
          <slot name="header" />
        </div>
        <div class="BaseModal-Content">
          <slot />
        </div>
        <div v-if="$slots.footer" class="BaseModal-Footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>
