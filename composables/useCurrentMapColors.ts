import { computed } from '@vue/reactivity'
import { useCurrentMap } from '~/composables'
import { Dictionary } from '~/entities'

export const useCurrentMapColors = () => {
  const { map } = useCurrentMap()

  const colorsHash = computed<Dictionary<string>>(() => {
    return map.map((vMap) => {
      if (!vMap.settings.colored) {
        return {}
      }

      const clicks = Object.values(vMap.objects).map((obj) => {
        return obj.lastClick
      })
      clicks.sort((a, b) => a - b)

      const chunk = Math.ceil(clicks.length / 3)
      let groups = {}
      const colorsMap = ['darkred', 'darkorange', 'darkgreen']

      for (let i = 0; i < clicks.length; i += chunk) {
        const color = colorsMap.shift()
        groups = {
          ...groups,
          ...clicks
            .slice(i, i + chunk)
            .reduce((acc: Dictionary<string>, time) => {
              acc[time] = String(color)
              return acc
            }, {}),
        }
      }

      return groups
    }) as Dictionary<string>
  })

  return {
    colorsHash,
  }
}
