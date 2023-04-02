import fs from 'fs'
import path from 'path'
import { MapStructure } from '~/entities'
import { urlTrim } from '~/utils'

const { readdirSync, readFileSync } = fs

export default defineEventHandler(() => {
  const files = readdirSync(path.join('.', '/maps/'))
    .filter((file) => {
      return file[0] !== '_' && !['README.md'].includes(file)
    })
    .map((file) => {
      let content = {}
      let url = ''

      try {
        content = JSON.parse(
          readFileSync(path.join('.', `/maps/${file}`)).toString()
        ) as MapStructure
        const structure = (content as any).structure as MapStructure

        if (structure.settings) {
          file = structure.settings.title
        }

        url = urlTrim(structure.url)
      } catch (e) {}

      return {
        name: file,
        url,
      }
    })

  return {
    ok: true,
    files,
  }
})
