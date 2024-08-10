import { Result } from '@/modules/system/result/Result';

export interface FileHandlerSource {
  fileHandler(): Result<FileSystemFileHandle>
}
