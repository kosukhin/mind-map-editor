export const useDom = () => {
  const findById = (elementId: string) => document.getElementById(elementId)
  return {
    findById,
  }
}
