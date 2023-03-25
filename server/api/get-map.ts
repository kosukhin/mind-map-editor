import fs from 'fs';
import { BASE_HOST, MAP_PARAM_NAME } from "~/constants/server";
import { documentNormalize } from "~/utils";

const {existsSync, readFileSync} = fs;

export default defineEventHandler((event) => {
  const {req} = event.node;
  const url = new URL(BASE_HOST + req.url);
  let document = url.searchParams.get(MAP_PARAM_NAME);
  document = documentNormalize(document);
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
