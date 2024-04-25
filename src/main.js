// 서버기동 npm run serve
import { createApp } from 'vue';
import router from './router';

//import App from './AppSecond.vue'
//createApp(App).mount('#app')

//import App from './AppHome.vue'
//createApp(App).mount('#app')

//import App from './AppIntro.vue'
//import {} from xxx
//createApp(App).mount('#app')

//import App from './AppContext.vue'
//import {} from xxx
//createApp(App).mount('#app')

//import App from './AppServer.vue'
//createApp(App).mount('#app')

//import App from './AppRouter.vue'
//createApp(App).use(router).mount('#app')


//import App from './AppRead.vue'
//createApp(App).use(router).mount('#app')

import App from './AppToast.vue'
createApp(App).use(router).mount('#app')




