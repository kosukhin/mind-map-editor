import { useSharing } from '@/composables/useSharing';
import { FSHtmlContent } from '@/modules/FSHtmlContent';
import { FSJsonContent } from '@/modules/FSJsonContent';
import baseHtmlTemplate from '@/modules/html/baseHtmlTemplate';
import { HtmlTemplate } from '@/modules/html/HtmlTemplate';
import { SharedFileFromWorker } from '@/modules/share/SharedFileFromWorker';
import { ShareContent } from '@/modules/ShareContent';
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

const modules = {
  serviceFileContent: fileContent,
  sharingStorageChanged,
};

export const useService = () => modules;
