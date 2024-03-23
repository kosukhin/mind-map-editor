import { useRequestGetMap } from '@/composables/useRequestGetMap';
import { useRequestSaveMap } from '@/composables/useRequestSaveMap';
import { useRouter } from '@/composables/useRouter';
import { isNullish } from '@/utils/isNullish';
import { mapUrlToName } from '@/utils/mapUrlToName';
import { partial } from 'lodash';
import { unref } from 'vue';

const { getMap } = useRequestGetMap();
const { saveMap } = useRequestSaveMap();
const { push } = useRouter();

const transferMap = async (mapUrl: string, payload: any) => {
  const mapName = mapUrlToName(mapUrl);
  getMap(mapName).then(([map]) => {
    [map].forEach((v) => {
      v.objects[Date.now()] = unref(payload.object);

      [v.types[payload.type.name]].filter(isNullish).forEach(() => {
        v.types[payload.type.name] = payload.type;
      });

      saveMap(v, mapName).then(partial(push, mapUrl));
    });
  });
};

export function useRequestTransfer() {
  return {
    transferMap,
  };
}
