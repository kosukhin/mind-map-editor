import { FSHtmlContent } from '@/modules/FSHtmlContent';
import { FSJsonContent } from '@/modules/FSJsonContent';
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

const fileContent = new FirstPossibleFileContent([
  new UrlContent(notification, factories),
  new FSHtmlContent(fsContent, launchQueue),
  new FSJsonContent(fsContent, launchQueue),
], factories);

const modules = {
  serviceFileContent: fileContent,
};

export const useService = () => modules;
