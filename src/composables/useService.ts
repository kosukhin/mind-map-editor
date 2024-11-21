import { FSHtmlContent } from '@/modules/FSHtmlContent';
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

const fsContent = new FileSystemContent(
  new BrowserLaunchQueue(),
  notification,
  factories,
);

const fileContent = new FirstPossibleFileContent([
  new UrlContent(notification, factories),
  new FSHtmlContent(fsContent),
  fsContent,
], factories);

const modules = {
  serviceFileContent: fileContent,
};

export const useService = () => modules;
