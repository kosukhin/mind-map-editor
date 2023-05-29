export function useDom() {
  const findById = (elementId: string) => document.getElementById(elementId)

  return {
    findById,
  }
}
