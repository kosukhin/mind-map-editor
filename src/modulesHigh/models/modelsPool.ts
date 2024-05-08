import { ref, shallowRef, Ref } from 'vue';
import { MapStructure } from '@/entities/Map';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';

export const modelsPool = {
  map: ref<MapStructure>(),
  layer: shallowRef<Layer>(),
  stage: shallowRef<Stage>(),
  overlayName: ref<string>(),
  overlayNameToClose: ref<string>(),
} as const;
type ModelsPool = typeof modelsPool;

export const modelsPoolGet = <T>(key: keyof ModelsPool) => modelsPool[key].value as T;

export const modelsPoolGetRef = <T>(key: keyof ModelsPool) => modelsPool[key] as Ref<T>;

export const modelsPoolSet = (key: keyof typeof modelsPool, value: any) => {
  modelsPool[key].value = value;
};
