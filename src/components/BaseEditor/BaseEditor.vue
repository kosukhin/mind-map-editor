<template>
  <div class="rounded-main p-2 border border-solid border-body-dark">
    <editor-content :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { EditorContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
  ],
  onUpdate: () => {
    if (!editor.value) {
      return;
    }
    emit('update:modelValue', editor.value.getHTML());
  },
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

watch(() => props.modelValue, (value) => {
  if (!editor.value) {
    return;
  }

  const isSame = editor.value.getHTML() === value;
  if (isSame) {
    return;
  }

  editor.value.commands.setContent(value, false);
});
</script>
