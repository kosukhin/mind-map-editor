import fs from "fs";
import {BASE_HOST, MAP_PARAM_NAME} from "~/constants";

const {writeFileSync, existsSync} = fs;

export default defineEventHandler(async (event) => {
  const {req} = event.node;
  const url = new URL(BASE_HOST + req.url);
  const document = url.searchParams.get(MAP_PARAM_NAME);
  const filePath = `./maps/${document}.json`;
  const fileExists = existsSync(filePath);

  if (fileExists) {
    const body = await readBody(event);
    writeFileSync(filePath, JSON.stringify(body));
  }

  return {
    ok: true
  }
})
