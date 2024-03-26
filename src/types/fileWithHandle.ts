import { AnyFn } from '@vueuse/core';

export type FileWithHandle = File & {
  handle: FileSystemFileHandle & {
    remove: AnyFn
  },
}
