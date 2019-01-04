import App from './App.vue'

export default [
  {
    path: '/edit',
    name: "edit",
    component: App,
  },
  {
		path: '/edit/:id',
		component: App
	}
]