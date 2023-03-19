import fs from 'fs';
import { baseHost, mapParamName } from "~/constants/server";

export default defineEventHandler((event) => {
  const {req} = event.node;
  const url = new URL(baseHost + req.url);
  const document = url.searchParams.get(mapParamName);

  return {
    ok: true,
  }
})