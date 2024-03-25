import { ref } from 'vue';

const debugString = ref('');
const append = (step: string) => {
  debugString.value += `/${step}`;
};

export const useDebugString = () => ({ debugString, append });
