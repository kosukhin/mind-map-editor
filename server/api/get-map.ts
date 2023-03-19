import fs from 'fs';
import { baseHost, mapParamName } from "~/constants/server";

const {existsSync, readFileSync} = fs;

export default defineEventHandler((event) => {
  const {req} = event.node;
  const url = new URL(baseHost + req.url);
  const document = url.searchParams.get(mapParamName);
  const filePath = `./maps/${document}.json`;
  const fileExists = existsSync(filePath);
  let data = {};

  if (fileExists) {
    data = JSON.parse(readFileSync(filePath).toString());
  }

  return {
    ok: fileExists,
    data,
    parentTypes: [],
  }
});
