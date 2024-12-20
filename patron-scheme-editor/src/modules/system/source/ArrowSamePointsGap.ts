import { ArrowPoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { GuestAwareType, GuestType } from "patron-oop";

export class ArrowSamePointsGap implements GuestAwareType<ArrowPoints> {
  value(guest: GuestType<ArrowPoints>): unknown {
    throw new Error("Method not implemented.");
  }
}
