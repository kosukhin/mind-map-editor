import { SharedFile } from '@/modules/share/SharedFile';
import { SharingPossible } from '@/modules/share/SharingPossible';
import { ShareFileDocument } from '@/modules/share/ShareContent';
import { StorageRecord } from 'patron-scheme-editor';
import { Patron } from 'patron-oop';

const sharedLastTimestamp = new StorageRecord<{ name: string, timestamp: number }>('shared-last-timestamp');
const sharedStorageRecord = new StorageRecord<ShareFileDocument>('shared-map');
const sharedFile = new SharedFile(sharedStorageRecord, sharedLastTimestamp);
const sharePossible = new SharingPossible();

sharedStorageRecord.value(new Patron((storedFile) => {
  sharedLastTimestamp.value((lastTimestamp) => {
    if (storedFile.name !== lastTimestamp.name) {
      sharedLastTimestamp.do('empty');
    }
  });
}));

const module = {
  sharedStorageRecord,
  sharedLastTimestamp,
  sharedFile,
  sharePossible,
};

export const useSharing = () => module;
