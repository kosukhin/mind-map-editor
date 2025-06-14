import { useSharing } from '@/composables/useSharing';
import { FSHtmlContent } from '@/modules/FSHtmlContent';
import { FSJsonContent } from '@/modules/FSJsonContent';
import baseHtmlTemplate from '@/modules/html/baseHtmlTemplate';
import { HtmlTemplate } from '@/modules/html/HtmlTemplate';
import { ShareConflict } from '@/modules/share/ShareConflict';
import { ShareContent } from '@/modules/share/ShareContent';
import { SharedFileFromWorker } from '@/modules/share/SharedFileFromWorker';
import { Source } from 'patron-oop';
import {
  BrowserLaunchQueue,
  FileSystemContent,
  FirstPossibleFileContent,
  UrlContent,
  useApplication,
  useFactories,
} from 'patron-scheme-editor';

const factories = useFactories();
const { notification, mapCurrentID } = useApplication();

const launchQueue = new BrowserLaunchQueue();
const fsContent = new FileSystemContent(
  launchQueue,
  notification,
  factories,
);

const htmlTemplate = new HtmlTemplate(baseHtmlTemplate);

const { sharedStorageRecord } = useSharing();
const sharedFromWorker = new SharedFileFromWorker();
sharedFromWorker.do();

const sharingStorageChanged = new Source(false);

const fileContent = new FirstPossibleFileContent([
  new UrlContent(notification, factories),
  new FSJsonContent(fsContent, launchQueue),
  new FSHtmlContent(fsContent, launchQueue, htmlTemplate),
  new ShareContent(
    sharedStorageRecord,
    sharedFromWorker,
    htmlTemplate,
    mapCurrentID,
    sharingStorageChanged,
  ),
], factories);

const shareConflict = new ShareConflict(sharedStorageRecord, sharedFromWorker);

const modules = {
  serviceFileContent: fileContent,
  sharingStorageChanged,
  shareConflict,
  sharedFromWorker,
  htmlTemplate,
};

export const useService = () => modules;
