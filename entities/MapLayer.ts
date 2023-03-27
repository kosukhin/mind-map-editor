import Konva from "konva";

const { Layer, Stage, Arrow } = Konva;

export type MapLayer = InstanceType<typeof Layer>;
export type MapStage = InstanceType<typeof Stage>;
export type MapArrow = InstanceType<typeof Arrow>;
