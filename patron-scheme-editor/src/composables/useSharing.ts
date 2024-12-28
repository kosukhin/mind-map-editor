import { SharedFile, ShareFileDocument } from "@/modules/application/l1/l2/visualisation/sharing/SharedFile";
import { StorageRecord } from "@/modules/integration/browser/storage/StorageRecord";

const sharedStorageRecord = new StorageRecord<ShareFileDocument>('shared-map');
const sharedFile = new SharedFile(sharedStorageRecord)

const module = {
  sharedStorageRecord,
  sharedFile
};

export const useSharing = () => module
