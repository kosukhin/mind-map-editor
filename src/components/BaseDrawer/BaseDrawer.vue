<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    default: 'ltr',
    validator: (value: string) => ['ltr', 'rtl', 'ttb', 'btt'].includes(value),
  },
});

const emit = defineEmits(['close']);

const classes = computed(() => (['e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50']));
const positions = {
  ltr: 'top-0 left-0 w-[50%] max-w-[900px] ',
  rtl: 'top-0 right-0 w-[50%] max-w-[900px] ',
  ttb: 'top-0 right-0 left-0',
  btt: 'top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0',
};

const { drawer } = useApplication();

const close = () => {
  drawer.give('');
  emit('close');
};
const isOpened = drawer.isOpenedByName(props.name, new VueRefPatron<boolean>()).ref();
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpened" :class="classes" @click="close">
      <div class="absolute bg-white h-full p-3 flex flex-col overflow-hidden" :class="positions[direction]" @click.stop>
        <div v-if="$slots.header">
          <slot name="header" class="BaseDrawer-Header" />
        </div>
        <div class="flex-grow overflow-y-auto">
          <slot />
        </div>
        <div v-if="$slots.footer" class="flex gap-1">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>
