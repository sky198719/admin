import Vue from 'vue'

import './../../assets/css/global.scss'

import Login from './index.vue'

new Vue({
	el:'#index',
	render:h=>h(Login)
})