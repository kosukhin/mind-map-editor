import {useLayerEvents} from "~/composables/useLayerEvents";
import {watch} from "@vue/runtime-core";
import {useCurrentMap} from "~/composables/useCurrentMap";
import {allSet, MapArrow} from "~/entities";
import {useLayer} from "~/composables/useLayer";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "~/constants";

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
      const canvas = document.getElementById('canvas');
      const canvasSize = {w: canvas?.clientWidth ?? CANVAS_WIDTH, h: canvas?.clientHeight ?? CANVAS_HEIGHT};
      const maxRight = CANVAS_WIDTH - canvasSize.w;
      const maxBottom = CANVAS_HEIGHT - canvasSize.h;

      vStage.dragBoundFunc((pos) => {
        const right = pos.x*-1;
        const bottom = pos.y*-1;

        if (maxBottom < 0 || maxRight < 0) {
          return {x: 0, y: 0}
        }

        return {
          x: pos.x > 0 ? 0 : right > maxRight ? maxRight * -1 : pos.x,
          y: pos.y > 0 ? 0 : bottom > maxBottom ? maxBottom * -1 : pos.y,
        };
      })

      let processed = false;
      vStage.on('dragmove', (e) => {
        // if (processed) return;
        // processed = true;
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
            (arrows as any[]).forEach(arrow => {
              if (arrow.attrs.toObjectId === object.id) {
                relatedArrows.push(arrow);
              }
            });
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
