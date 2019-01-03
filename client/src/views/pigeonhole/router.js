import App from './App';
import detail from '../Blog/detail.vue';

export default [
    {
        path: '/pigeonhole',
        component: App,
        meta: {
            keepAlive: true
        }
    },
    {
		path: '/pigeonhole/:id',
		component: detail
	}
]