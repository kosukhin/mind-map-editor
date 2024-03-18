import { createSharedComposable } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { findRelationsToRemove } from '@/application';
import { useSharedLayer } from '@/composables/useSharedLayer';
import { useSharedMap } from '@/composables/useSharedMap';
import { useSharedMapObject } from '@/composables/useSharedMapObject';
import { useSharedOverlay } from '@/composables/useSharedOverlay';
import { removeObjectOnLayer, updateObjectOnLayer } from '@/utils/konva';

export const useObjectActions = createSharedComposable((needConfirm = true) => {
  const i18n = useI18n();
  const { layer, layerObjects } = useSharedLayer();
  const { map } = useSharedMap();
  const { currentObject } = useSharedMapObject();
  const { close } = useSharedOverlay();

  const removeCurrentObject = () => {
    if (
      needConfirm
      // eslint-disable-next-line no-restricted-globals
      && !confirm(i18n.t('formObject.notifications.sureDelete'))
    ) {
      return;
    }

    close();
    if (currentObject.value && map.value && layer.value) {
      const relations = findRelationsToRemove(currentObject.value, map.value);
      relations?.map((relations: any) => {
        relations.forEach((relation: any) => {
          relation.indexes.forEach((indexToRemove: any) => {
            map.value?.objects[relation.objectId].arrows.splice(
              indexToRemove,
              1,
            );
          });

          if (map.value && layer.value) {
            updateObjectOnLayer(
              layerObjects,
              layer.value,
              map.value.objects[relation.objectId],
              map.value,
            );
          }
        });
      });
      delete map.value.objects[currentObject.value.id];
      removeObjectOnLayer(layerObjects, currentObject.value);
    }
  };

  return {
    removeCurrentObject,
  };
});
