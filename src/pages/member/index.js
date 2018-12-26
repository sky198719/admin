import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VuexAlong from 'vuex-along'

import './../../assets/css/global.scss'

import Member from './index.vue'
import Mylist from './../../components/mylist/index.vue'
import Personal from './../../components/personal/index.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
	{
		path:'/mylist/:id',
		name:'mylist',
		component:Mylist
	},
	{
		path:'/personal',
		name:'personal',
		component:Personal
	}
]

const router = new VueRouter({
	routes
})

const store = new Vuex.Store({
	state:{
		active:0,
		refresh:false,
		userinfo:''
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
		}
	},
	plugins:[VuexAlong]
})

new Vue({
	el:'#index',
	router,
	store,
	render:h=>h(Member)
})