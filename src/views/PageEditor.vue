<script setup lang="ts">
import { useApplication } from '@/composables/useApplication';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const canvas = ref<HTMLElement>();
const { mapFile, map } = useApplication(canvas);
const mapsCount = computed(() => Object.keys(mapFile.value ?? {}).length);
</script>

<template>
  <div>
    Всего карт в файле: {{  mapsCount }}
    <div v-if="map">
      <div>
        Название карты: {{ map.url }}
      </div>
      <div>
        Кол-во объектов: {{ Object.keys(map.objects).length }}
      </div>
      <div>
        Кол-во типов: {{ Object.keys(map.types).length }}
      </div>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>
