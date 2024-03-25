import { ref } from 'vue';

const debugString = ref('initial');
const append = (step: string) => {
  debugString.value += `/${step}`;
};

export const useDebugString = () => ({ debugString, append });
