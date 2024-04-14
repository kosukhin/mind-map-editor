import { gridGap } from '@/constants/grid';

export const gridFitSize = (size: number) => Math.round(size / gridGap) * gridGap;
