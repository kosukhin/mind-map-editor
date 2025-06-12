<script setup lang="ts">
import { onMounted, watch } from 'vue';

document.title = 'Нет данных!';

// eslint-disable-next-line no-undef
const model = defineModel();

let fileTree: any;

watch(model, (newModel) => {
  if (fileTree) {
    fileTree.saveFile(newModel);
  }
});

onMounted(() => {
  fileTree = document.querySelector('file-tree') as any;

  if (fileTree) {
    fileTree.filesToIndex = ['json'];
    fileTree.addEventListener('file-selected', (e: any) => {
      const content = e.detail?.file?.contents ?? '';
      if (content) {
        model.value = content;
      }
    });
    const style = document.createElement('style');
    style.innerHTML = '#file-container { overflow: visible }';
    fileTree?.shadowRoot?.appendChild(style);
  }
});
</script>

<template>
  <div class="flex h-full w-full justify-center">
    <div class="flex flex-col text-center justify-center">
      <h3 class="text-h3 font-bold m-lg">
        Нет данных для отображения
      </h3>
      <p>
        Чтобы открыть схему установите приложение
      </p>
      <p>
        или откройте по ссылке.
      </p>
      <file-tree class="file-tree" filesToIndex="['json']">
        <button class="open-dir" type="button" slot="browse-button">Открыть директорию</button>
      </file-tree>
    </div>
  </div>
</template>

<style lang="scss">
.file-tree #file-container {
  overflow: visible;
}

.file-tree {
  overflow: visible;
}

.open-dir {
  padding: 10px;
  background: lightblue;
  border-radius: 10px;
  margin-top: 10px;
}
</style>
