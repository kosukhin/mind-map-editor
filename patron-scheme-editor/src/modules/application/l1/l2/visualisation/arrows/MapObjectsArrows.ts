import { ArrowPathType } from '@/modules/application/l1/l2/l3/l4/types/arrow/ArrowPathType';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { ArrowExtremePoints } from '@/modules/application/l1/l2/visualisation/arrows/ArrowExtremePoints';
import { ArrowThreeBreaksPath } from '@/modules/application/l1/l2/visualisation/arrows/ArrowThreeBreaksPath';
import { ArrowTwoBreaksPath } from '@/modules/application/l1/l2/visualisation/arrows/ArrowTwoBreaksPath';
import { ArrowDepsDocument, ArrowPoints, ArrowType } from '@/modules/application/l1/l2/visualisation/arrows/ArrowType';
import { KonvaLayer } from '@/modules/integration/konva/KonvaTypes';
import { ArrowSamePointsGap } from '@/modules/system/source/ArrowSamePointsGap';
import { GuestAwareFirst } from '@/modules/system/source/GuestAwareFirst';
import { GuestAwareSequence } from '@/modules/system/source/GuestAwareSequence';
import { Module } from '@/modules/system/source/Module';
import { debug } from 'debug';
import Konva from 'konva';
import throttle from 'lodash/throttle';
import { ChainType, FactoryType, give, GuestAware, GuestAwareType, GuestObjectType, SourceType } from 'patron-oop';

const { Arrow } = Konva;

const localDebug = debug('MapObjectsArrows');

type ChainParamsType = { layer: KonvaLayer; map: MapDocument; objects: MapObjectDocument[] };

/**
 * Объект для отрисовки стрелок на конве
 */
export class MapObjectsArrows {
  private previouslyRenderedArrows = new Map();

  public constructor(
    private konvaLayer: LayerBase,
    private mapFile: MapFileType,
    private mapDep: MapType,
    private arrowPath: ArrowPathType,
    private factories: {
      patron: FactoryType<GuestObjectType>;
      guest: FactoryType<GuestObjectType>;
      chain: FactoryType<ChainType>;
      cache: FactoryType<SourceType>;
    },
  ) {
    localDebug('draw arrows on canvas');
    const chain = this.factories.chain.create();

    this.konvaLayer.layer(this.factories.patron.create(chain.receiveKey('layer')));
    this.mapFile.currentMap(this.factories.patron.create(chain.receiveKey('map')));
    this.mapDep.objects(this.factories.patron.create(chain.receiveKey('objects')));

    chain.result(
      this.factories.patron.create(
        this.factories.guest.create(
          throttle(({ layer, map, objects }: ChainParamsType) => {
            this.previouslyRenderedArrows.forEach(prevArrow => {
              prevArrow.arrow.hide();
            });

            const objectsMap = objects.reduce((acc: Record<string, any>, item) => {
              acc[item.id] = item;
              return acc;
            }, {});
            const extremePoints = new ArrowSamePointsGap(new GuestAwareSequence<ArrowDepsDocument, ArrowPoints>(new ArrowExtremePoints(
              new GuestAware((guest) => give(objects, guest)),
              new GuestAware((guest) => give(objectsMap, guest))
            ), new Module((dep: GuestAwareType<ArrowDepsDocument>) => {
              const arrowType = new ArrowType(dep);
              return new GuestAwareFirst([new ArrowTwoBreaksPath(arrowType), new ArrowThreeBreaksPath(arrowType)])
            })));

            extremePoints.value((pointsCoords) => {
              pointsCoords.forEach((arrowPoints) => {
                const arrowId = arrowPoints.key

                if (this.previouslyRenderedArrows.has(arrowId)) {
                  const savedArrow = this.previouslyRenderedArrows.get(arrowId);

                  savedArrow.arrow.show();
                  savedArrow.arrow.points(arrowPoints.points);
                  return;
                }

                const arrow = new Arrow({
                  x: 0,
                  y: 0,
                  points: arrowPoints.points,
                  pointerLength: 20,
                  pointerWidth: 10,
                  fill: '#ccc',
                  stroke: '#bbb',
                  strokeWidth: 2,
                  zIndex: 2,
                });
                this.previouslyRenderedArrows.set(arrowId, {
                  arrow,
                });
                layer.add(arrow);
              })
            })
          }, 50),
        ),
      ),
    );
  }

  public introduction() {
    return 'patron' as const;
  }
}
