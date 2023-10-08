import { createFilePathByUrl } from '~/utils'
import {
  currentDate,
  incrementProgress,
  saveDocument,
  saveToFavorite,
} from '~/utils/server-only'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.isDemo) {
    return {
      ok: false,
    }
  }

  const { req } = event.node
  const filePath = createFilePathByUrl(String(req.url))

  let body = await readBody(event)
  body = JSON.parse(body)

  if (body.structure.settings.favoriteGroup) {
    const { favoriteGroup, prevFavoriteGroup } = body.structure.settings
    saveToFavorite(favoriteGroup, prevFavoriteGroup, body.structure)
  }

  saveDocument(filePath, body)

  const date = currentDate()
  incrementProgress('__progress', date)

  return {
    ok: true,
  }
})
