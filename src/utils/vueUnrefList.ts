import { vueUnref } from '@/utils/vueUnref';

export const vueUnrefList = (refs: any[]) => refs.map(vueUnref);
