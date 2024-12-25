import { FSHtmlContent } from '@/modules/FSHtmlContent';
import { FSJsonContent } from '@/modules/FSJsonContent';
import baseHtmlTemplate from '@/modules/html/baseHtmlTemplate';
import { HtmlTemplate } from '@/modules/html/HtmlTemplate';
import { ShareContent } from '@/modules/ShareContent';
import {
  useApplication,
  useFactories,
  FileSystemContent,
  FirstPossibleFileContent,
  UrlContent,
  BrowserLaunchQueue,
} from 'patron-scheme-editor';

const factories = useFactories();
const { notification } = useApplication();

const launchQueue = new BrowserLaunchQueue();
const fsContent = new FileSystemContent(
  launchQueue,
  notification,
  factories,
);

const htmlTemplate = new HtmlTemplate(baseHtmlTemplate);

const fileContent = new FirstPossibleFileContent([
  new UrlContent(notification, factories),
  new FSJsonContent(fsContent, launchQueue),
  new FSHtmlContent(fsContent, launchQueue, htmlTemplate),
  new ShareContent(notification),
], factories);

const modules = {
  serviceFileContent: fileContent,
};

export const useService = () => modules;
