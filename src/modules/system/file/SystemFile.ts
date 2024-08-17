import { Target } from '@/modules/system/target/Target';

export interface SystemFile {
  content(target: Target<string>): this;
  save(content: string): this;
}
