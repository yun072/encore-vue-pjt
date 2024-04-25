import {createRouter, createWebHistory} from 'vue-router';
import Home from '../pages/WorkIndexPage.vue';
import Works from '../pages/works/WorkIndex.vue';
import Work from '../pages/works/WorkView.vue';



export const router = createRouter({
    history: createWebHistory(),
    routes: [
        // router 1개를 의미한다. 
        //< href="">
        
        //localhost:8080/ -> WorkIndexPage.vue
        {
            path: '/',
            name:   'Home' ,
            component: Home
        },
        //localhost:8080/works ->  WorkIndex.vue
        {
            path: '/works',
            name: 'Works',
            component: Works
        },
        {
            path: '/works/:id',
            name: 'Work',
            component: Work
        }
    ]
});

export default router ;

