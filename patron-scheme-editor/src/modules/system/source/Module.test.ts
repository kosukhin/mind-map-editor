import { Module } from "@/modules/system/source/Module";
import { expect, test } from "vitest";

test('Module.test', () => {
  const module = new Module((val) => {
    return {
      num: val,
    }
  });

  expect(JSON.stringify(module.create(11))).toBe('{"num":11}');
});
