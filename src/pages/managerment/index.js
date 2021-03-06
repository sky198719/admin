import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VuexAlong from 'vuex-along'

import './../../assets/css/global.scss'

import Managerment from './index.vue'
import Userlist from './mods/userlist/index.vue'
import Projectlist from './mods/projectlist/index.vue'
import Personal from './../../components/personal/index.vue'
import Mylist from './../../components/mylist/index.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
	{
		path:'/userlist',
		name:'userlist',
		component:Userlist
	},
	{
		path:'/projectlist',
		name:'projectlist',
		component:Projectlist
	},
	{
		path:'/personal',
		name:'personal',
		component:Personal
	},
	{
		path:'/mylist/:id',
		name:'mylist',
		component:Mylist
	}
]

const router = new VueRouter({
	routes
})

const store = new Vuex.Store({
	state:{
		active:0,
		refresh:false,
		userinfo:'',
		project:[]
	},
	mutations:{
		setActive(state,active){
			state.active = active
		},
		setRefresh(state,refresh){
			state.refresh = refresh
		},
		setUserinfo(state,userinfo){
			state.userinfo = userinfo
		},
		setProject(state,project){
			state.project = project
		}
	},
	plugins:[VuexAlong]
})

new Vue({
	el:'#index',
	router,
	store,
	render:h=>h(Managerment)
})