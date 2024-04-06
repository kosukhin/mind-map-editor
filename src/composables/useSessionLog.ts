import { ref } from 'vue';

const sessionMessages = ref<string[]>([]);
const sessionLog = (...sessionMessage: string[]) => {
  sessionMessage.unshift(new Date().toLocaleString());
  sessionMessages.value.unshift(sessionMessage.join(' '));
};

// Системный журнал, храниться только в памяти, только для отладки текущей сессии
export const useSessionLog = () => ({
  sessionMessages,
  sessionLog,
});
