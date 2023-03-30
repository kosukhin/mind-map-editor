import fs from 'fs'
import { MapStructure } from '~/entities'
import { urlTrim } from '~/utils'

const { readdirSync, readFileSync } = fs

export default defineEventHandler(() => {
  const files = readdirSync('./maps/')
    .filter((file) => {
      return file[0] !== '_' && !['README.md'].includes(file)
    })
    .map((file) => {
      let content = {}
      let url = ''

      try {
        content = JSON.parse(
          readFileSync(`./maps/${file}`).toString()
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
