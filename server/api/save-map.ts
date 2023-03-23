import fs from "fs";
import {BASE_HOST, MAP_PARAM_NAME} from "~/constants";

const {writeFileSync, existsSync} = fs;

export default defineEventHandler((event) => {
  const {req} = event.node;
  const url = new URL(BASE_HOST + req.url);
  const document = url.searchParams.get(MAP_PARAM_NAME);
  const filePath = `./maps/${document}.json`;
  const fileExists = existsSync(filePath);
  let body = '';

  if (fileExists) {
    req.on('readable', function() {
      const chunk = req.read();
      body += chunk ? chunk : '';
    });
    req.on('end', function() {
      writeFileSync(filePath, body);
    });
  }

  return {
    ok: true
  }
})
