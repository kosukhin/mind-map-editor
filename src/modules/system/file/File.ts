import { Result } from '@/modules/system/result/Result';

export interface File {
  content(): Result<string>;
  save(content: string): this;
}
