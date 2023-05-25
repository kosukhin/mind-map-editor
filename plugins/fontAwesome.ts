import { library, config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(fas)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})
