export function generateUniqString(length = 10) {
  return (Math.random() + 1).toString(36).substring(length)
}
