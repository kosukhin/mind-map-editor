import { ApplicationBase } from '@/objects/application/ApplicationBase';

export const useApplication = () => {
  new ApplicationBase().setup();
};
