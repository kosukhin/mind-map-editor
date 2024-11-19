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

const fileContent = new FirstPossibleFileContent([
  new UrlContent(notification, factories),
  new FileSystemContent(
    new BrowserLaunchQueue(),
    notification,
    factories,
  ),
], factories);

const modules = {
  serviceFileContent: fileContent,
};

export const useService = () => modules;
