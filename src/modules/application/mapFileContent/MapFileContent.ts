import { Target } from '@/modules/system/target/Target';
import { TargetPool } from '@/modules/system/target/TargetPool';

export interface MapFileContent {
  content(target: Target<string>): this;
  contentPool(): TargetPool<string>;
}
