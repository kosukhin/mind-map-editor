import { useFactories } from '@/composables/useFactories';
import { FileSystemContent } from '@/modules/application/l1/fileSystem/FileSystemContent';
import { FirstPossibleFileContent } from '@/modules/application/l1/l2/l3/map/mapFile/FirstPossibleFileContent';
import { UrlContent } from '@/modules/application/l1/url/UrlContent';
import { BrowserLaunchQueue } from '@/modules/integration/browser/launchQueue/BrowserLaunchQueue';
import { Notification } from '@/modules/application/l1/l2/visualisation/notification/Notification';

const factories = useFactories();
const notification = new Notification(factories);

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
