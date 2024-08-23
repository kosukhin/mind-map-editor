<script setup lang="ts">
import { useApplication } from '@/composables/useApplication';
import { computed } from '@vue/reactivity';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { onMounted, ref } from 'vue';

const {
  mapFile, map, mapSettings, mapSettingsGuest, canvasGuest, notification,
} = useApplication();
const mapsCount = computed(() => Object.keys(mapFile.value ?? {}).length);

const canvas = ref();

onMounted((() => {
  console.log('mounted', canvas.value);
  canvasGuest.receive(canvas.value);
}));
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
    <div>
      <div>настройки</div>
      <pre>
        {{mapSettings}}
      </pre>
      <div v-if="mapSettings">
        <BaseInput v-model="mapSettings.title" />
        <hr />
        <BaseButton @click="mapSettingsGuest.receive(mapSettings)">Сохранить</BaseButton>
      </div>
    </div>
    <div>
      {{ notification }}
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>
