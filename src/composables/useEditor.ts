import { BaseChannelOf } from '@/objects/base/BaseChannelOf';

export const useEditor = () => {
  const canvasChannel = new BaseChannelOf();

  return {
    canvasChannel,
  };
};
