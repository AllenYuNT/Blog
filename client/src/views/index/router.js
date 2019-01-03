import App from './App.vue'
import detail from '../Blog/detail.vue';

export default [
	{
    	path: '/index',
    	name: "index",
    	component: App
	},
	{
		path: '/index/:id',
		name: detail,
		component: detail
	}
]