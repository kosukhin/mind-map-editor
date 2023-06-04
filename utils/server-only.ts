import fs from 'fs'
import flow from 'lodash/flow.js'
import get from 'lodash/get.js'
import set from 'lodash/set.js'
import { createFilePathByName } from '~/utils/server'
import { stepper } from '~/libraries/stepper'
import { apply, average, objectToValues } from '~/utils/common'

const { writeFileSync, readFileSync } = fs
export function saveDocument(filePath: string, body: any) {
  writeFileSync(filePath, JSON.stringify(body))
}

export function parse(data: string) {
  return JSON.parse(data)
}

export function readFile(filePath: string): string {
  const defaultValue = '{}'
  try {
    return readFileSync(filePath).toString() ?? defaultValue
  } catch {
    return defaultValue
  }
}

export const parseFileByName = flow(createFilePathByName, readFile, parse)

export const calculateAverageProgress = () =>
  apply(['__progress'], flow(parseFileByName, objectToValues, average))

export const getProgressByDay = stepper(['day'], [], (s) =>
  flow(s(parseFileByName, ['__progress']), s(get, ['prevResult', 'day', 1]))
)

export const incrementProgress = stepper(
  ['fileName', 'property'],
  ['object', 'filePath'],
  (s) =>
    flow(
      s(createFilePathByName, ['fileName'], 'filePath'),
      s(readFile, ['filePath']),
      s(parse, ['prevResult'], 'object'),
      s(get, ['object', 'property', 1]),
      s(increment, ['prevResult'], 'incremented'),
      s(set, ['object', 'property', 'incremented']),
      s(saveDocument, ['filePath', 'object'])
    )
)

function increment(value: string) {
  return +value + 1
}

export function currentDate() {
  return new Date().toISOString().replace(/T.+/, '')
}
