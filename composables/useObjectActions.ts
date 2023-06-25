import { useI18n } from 'vue-i18n'
import { all } from '~/utils'
import { findRelationsToRemove } from '~/application'
import { removeObjectOnLayer, updateObjectOnLayer } from '~/utils/konva'
import { useSharedLayer } from '~/composables/useSharedLayer'
import { useSharedMap } from '~/composables/useSharedMap'
import { useSharedMapObject } from '~/composables/useSharedMapObject'
import { useSharedOverlay } from '~/composables/useSharedOverlay'

export function useObjectActions(needConfirm = true) {
  const i18n = useI18n()
  const { layer, layerObjects } = useSharedLayer()
  const { map } = useSharedMap()
  const { currentObject } = useSharedMapObject()
  const { close } = useSharedOverlay()

  const removeCurrentObject = () => {
    if (
      needConfirm &&
      !confirm(i18n.t('formObject.notifications.sureDelete'))
    ) {
      return
    }

    close()
    all([currentObject, map, layer] as const).map(([vObj, vMap, vLayer]) => {
      findRelationsToRemove(vObj, vMap).map((relations) => {
        relations.forEach((relation) => {
          relation.indexes.forEach((indexToRemove) => {
            vMap.objects[relation.objectId].arrows.splice(indexToRemove, 1)
          })
          updateObjectOnLayer(
            layerObjects,
            vLayer,
            vMap.objects[relation.objectId],
            vMap
          )
        })
      })
      delete vMap.objects[vObj.id]
      removeObjectOnLayer(layerObjects, vObj)
    })
  }

  return {
    removeCurrentObject,
  }
}
