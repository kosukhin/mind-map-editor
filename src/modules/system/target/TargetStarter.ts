import { Target } from "@/modules/system/target/Target";

export class TargetStarter<T> implements Target<T> {
  receive(value: T): this {
    console.log('starter received',);
    return this;
  }
}
