import fs from 'fs'
// @ts-ignore
import lunr from 'lunr'
// @ts-ignore
import lunrLanguagesStemmer from 'lunr-languages/lunr.stemmer.support'
// @ts-ignore
import lunrLanguagesMulti from 'lunr-languages/lunr.multi'
// @ts-ignore
import lunrLanguagesRu from 'lunr-languages/lunr.ru'
import { MapStructure } from '~/entities'

lunrLanguagesStemmer(lunr)
lunrLanguagesMulti(lunr)
lunrLanguagesRu(lunr)

const { readFileSync, readdirSync } = fs

export default defineEventHandler((event) => {
  const dirs = readdirSync('./maps/').filter((file) => {
    return !['README.md'].includes(file)
  })
  const documents: any[] = []
  dirs.forEach((dir) => {
    const data = readFileSync('./maps/' + dir)
    const document = JSON.parse(data.toString()) as { structure: MapStructure }

    Object.values(document.structure.objects).forEach((object) => {
      documents.push({
        name: object.name + '|' + (document.structure.url ?? 'no'),
        text: object.description + ' ' + object.name,
      })
    })
  })
  const idx = lunr(function () {
    // @ts-ignore
    this.use(lunr.multiLanguage('en', 'ru'))
    // @ts-ignore
    this.ref('name')
    // @ts-ignore
    this.field('text')

    documents.forEach(function (doc) {
      // @ts-ignore
      this.add(doc)
      // @ts-ignore
    }, this)
  })
  const serializedIdx = JSON.stringify(idx)
  fs.writeFileSync('./search-index/idx.json', serializedIdx)

  return {
    result: true,
    action: 'index',
    // documents,
    response: 'Записано документов: ' + documents.length,
  }
})
