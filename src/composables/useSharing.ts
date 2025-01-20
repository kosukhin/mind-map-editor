import { SharedFile } from '@/modules/share/SharedFile';
import { SharingPossible } from '@/modules/share/SharingPossible';
import { ShareFileDocument } from '@/modules/share/ShareContent';
import { StorageRecord } from 'patron-scheme-editor';

const sharedStorageRecord = new StorageRecord<ShareFileDocument>('shared-map');
const sharedFile = new SharedFile(sharedStorageRecord);
const sharePossible = new SharingPossible();

const module = {
  sharedStorageRecord,
  sharedFile,
  sharePossible,
};

export const useSharing = () => module;
