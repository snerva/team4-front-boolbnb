import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faStar, faBath, faBed, faAnglesUp, faMagnifyingGlass, faBars, faAnglesDown, faStreetView, faHouse, faDoorOpen, faArrowRight, faMapLocationDot, faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faStar, faBath, faBed, faAnglesUp, faMagnifyingGlass, faUser, faBars, faAnglesDown, faStreetView, faHouse, faDoorOpen, faArrowRight, faMapLocationDot, faHouseUser)


createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')