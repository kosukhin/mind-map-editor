import fs from 'fs'
import flow from 'lodash/flow.js'
import get from 'lodash/get.js'
import set from 'lodash/set.js'
import { createFilePathByName } from '~/utils/server'
import { Step, createStepper } from '~/libraries/stepper'
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

const { entryPoint: ep1, step: s1 } = createStepper(['day'], [])
export const getProgressByDay = flow(
  ep1,
  s1(parseFileByName, ['__progress']),
  s1(get, ['prevResult', 'day', 1])
)

const { entryPoint: ep2, step: s2 } = createStepper(
  ['fileName', 'property'],
  ['object', 'filePath']
)
export const incrementProgress = flow(
  ep2,
  s2(createFilePathByName, ['fileName'], 'filePath'),
  s2(readFile, ['filePath']),
  s2(parse, ['prevResult'], 'object'),
  s2(get, ['object', 'property', 1]),
  s2(increment, ['prevResult'], 'incremented'),
  s2(set, ['object', 'property', 'incremented']),
  s2(saveDocument, ['filePath', 'object'])
)

function increment(value: string) {
  return +value + 1
}

export function currentDate() {
  return new Date().toISOString().replace(/T.+/, '')
}
