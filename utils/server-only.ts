import fs from 'fs'
import flow from 'lodash/flow.js'
import get from 'lodash/get.js'
import set from 'lodash/set.js'
import { createFilePathByName } from '~/utils/server'
import { stateStepper } from '~/libraries/stateStepper'
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

export const getProgressByDay = stateStepper(
  ['day'],
  {
    fileName: '__progress',
    defaultValue: 1,
  },
  (step) =>
    flow(
      step(parseFileByName, ['fileName']),
      step(get, ['prevResult', 'day', 'defaultValue'])
    )
)

export const incrementProgress = stateStepper(
  ['fileName', 'property'],
  {
    object: {},
    filePath: null,
    defaultValue: 1,
  },
  (step) =>
    flow(
      step(createFilePathByName, ['fileName'], 'filePath'),
      step(readFile, ['filePath']),
      step(parse, ['prevResult'], 'object'),
      step(get, ['object', 'property', 'defaultValue']),
      step(increment, ['prevResult'], 'incremented'),
      step(set, ['object', 'property', 'incremented']),
      step(saveDocument, ['filePath', 'object'])
    )
)

function increment(value: string) {
  return +value + 1
}

export function currentDate() {
  return new Date().toISOString().replace(/T.+/, '')
}
