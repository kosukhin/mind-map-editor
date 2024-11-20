<template>
  <div class="rounded-main p-2 border border-solid border-body-dark">
    <editor-content :editor="editor" />
    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor"
    >
      <div class="flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main">
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'font-bold': editor.isActive('bold') }">
          bold
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'font-bold': editor.isActive('italic') }">
          italic
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'font-bold': editor.isActive('strike') }">
          strike
        </button>
      </div>
    </bubble-menu>
  </div>
</template>

<script lang="ts" setup>
import { EditorContent, BubbleMenu, useEditor } from '@tiptap/vue-3';
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
