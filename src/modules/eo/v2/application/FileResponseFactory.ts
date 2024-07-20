import { Factory } from '@/modules/eo/targets/system/Factory';
import { Optional } from '@/modules/eo/targets/system/Optional';
import { OptionalAsync } from '@/modules/eo/v2/system/OptionalAsync';

export class FileResponseFactory implements Factory<[File], Optional<string>> {
  create(file: File) {
    return new OptionalAsync(new Response(file).text());
  }
}
