import { Arrow } from '~/entities'

export const applyArrowPoints = (
  arrows: [arrow: Arrow, points: number[]][]
) => {
  arrows.forEach(([arrow, points]) => arrow.points(points))
}
