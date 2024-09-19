<script lang="ts" setup>
import BaseDrawer from '@/components/BaseDrawer/BaseDrawer.vue';
import { useApplication } from '@/composables/useApplication';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

const { mapObjectCurrent } = useApplication();

const objectId = mapObjectCurrent.objectId(new VueRefPatron<string>()).ref();

const close = () => {
  mapObjectCurrent.receive('');
};
</script>

<template>
  <BaseDrawer name="object" @close="close">
    <template #header>
      <h2 class="text-lg font-bold">Редактируем объект</h2>

    </template>
    <div>
      Тело формы объекта {{ objectId }}
    </div>
    <template #footer>
      кнопочки
    </template>
  </BaseDrawer>
</template>
