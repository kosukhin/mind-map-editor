import {useLayerEvents} from "~/composables/useLayerEvents";
import {watch} from "@vue/runtime-core";
import {useCurrentMap} from "~/composables/useCurrentMap";
import {allSet, MapArrow} from "~/entities";
import {useLayer} from "~/composables/useLayer";

export const useLayerListenerDrag = () => {
  const {firstMapLoad} = useCurrentMap();
  const {stage, layerObjects} = useLayer();
  const {map} = useCurrentMap();
  const {dragend} = useLayerEvents();

  watch(dragend, () => {
    allSet([dragend, map] as const).map(([vDrag, vMap]) => {
      if (!vDrag?.target) return;
      const currentObject = vMap.objects[vDrag.target.attrs.objectId];
      currentObject.position[0] = vDrag.target.attrs.x;
      currentObject.position[1] = vDrag.target.attrs.y;
    })
  });

  watch(firstMapLoad, () => {
    allSet([stage, map] as const).map(([vStage, vMap]) => {
      vStage.on('dragmove', (e) => {
        if (!e.target.attrs.image) {
          return;
        }

        const objectId = e.target.attrs.objectId;
        const object = vMap.objects[objectId];
        const labelWidth = object.name.length * 7;
        const type = vMap.types[object.type];
        const [img, text, ...arrows] = layerObjects.get(objectId);

        text.position({
          x: e.target.attrs.x + type.width / 2 - labelWidth / 2,
          y: e.target.attrs.y - 15,
        });
        (arrows as MapArrow[]).forEach(arrow => {
          const points = arrow.points();
          points[0] =  e.target.attrs.x + type.width / 2;
          points[1] =  e.target.attrs.y + type.height / 2;
          arrow.points(points);
        });
        const relatedArrows: MapArrow[] = [];
        Object.values(vMap.objects).forEach(relObject => {
          const hasRelation = relObject.arrows.find(relArrow => relArrow.id === object.id);
          if (hasRelation) {
            const [img, text, ...arrows] = layerObjects.get(relObject.id);
            relatedArrows.push(...arrows);
          }
        });
        relatedArrows.forEach(relArrow => {
          const points = relArrow.points();
          points[2] =  e.target.attrs.x + type.width / 2;
          points[3] =  e.target.attrs.y + type.height / 2;
          relArrow.points(points);
        })
      })
    })
  });
}
