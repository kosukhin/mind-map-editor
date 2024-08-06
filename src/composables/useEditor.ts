import { ChannelOf } from '@/objects/system/channel/ChannelOf';

export const useEditor = () => {
  const canvasChannel = new ChannelOf();

  return {
    canvasChannel,
  };
};
