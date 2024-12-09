/**
 * @vitest-environment jsdom
 */
import { expect, test } from 'vitest';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { KonvaLayer as KonvaLayerType } from '@/modules/integration/konva/KonvaTypes';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { Guest } from 'patron-oop';
import Konva from 'konva';
import { useFactories } from '@/composables/useFactories';
import { StageDefaultSize } from '@/modules/application/l1/l2/l3/stage/StageDefaultSize';
import { StageMoveRestrictionTransfer } from '@/modules/application/l1/l2/l3/stage/StageMoveRestrictionTransfer';

test('konva layer', () => {
  const factories = useFactories();
  const canvasEL = document.createElement('canvas');
  const browserCanvas = new BrowserCanvas(factories);
  browserCanvas.give(canvasEL);
  const stageSize = new StageDefaultSize();
  const stageMoveRestriction = new StageMoveRestrictionTransfer();
  const layer = new KonvaLayer(browserCanvas, stageSize, stageMoveRestriction, factories);

  layer.layer(
    new Guest((latestLayer: KonvaLayerType) => {
      latestLayer.x(10);
      latestLayer.y(20);

      expect(latestLayer.x()).toBe(10);
      expect(latestLayer.y()).toBe(20);
    }),
  );
});
