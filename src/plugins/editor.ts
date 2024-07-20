import { BrowserLaunchParams } from '@/modules/eo/v2/application/BrowserLaunchParams';
import { BrowserMapFile } from '@/modules/eo/v2/application/BrowserMapFile';
import { App } from 'vue';
import { MemoryCache } from '@/modules/eo/v2/system/MemoryCache';
import { JSONObjectFromString } from '@/modules/eo/v2/application/JSONObjectFromString';
import { MapFile } from '@/entities/Map';
import { JSONStringFromObject } from '@/modules/eo/v2/application/JSONStringFromObject';
import { OptionalSync } from '@/modules/eo/v2/system/OptionalSync';
import { Logger } from '@/modules/eo/v2/system/Logger';
import { FileResponseFactory } from '@/modules/eo/v2/application/FileResponseFactory';
import { PropertyPath } from '../modules/eo/v2/system/PropertyPath';

const logger = new Logger(new OptionalSync(true));

const editor = {
  logger,
  optionalMapFile: new BrowserMapFile(
    new PropertyPath('files[0]', new BrowserLaunchParams()),
    new MemoryCache<FileSystemFileHandle, MapFile>(),
    new JSONObjectFromString(),
    new JSONStringFromObject(),
    logger,
    new FileResponseFactory(),
  ),

};

export const useEditor = () => editor;

export default {
  install: (app: App<unknown>) => {
    app.provide('editor', editor);
  },
};
