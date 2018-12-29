import Vue from 'vue'

import './../../assets/css/global.scss'

import Test from './index.vue'

new Vue({
	el:'#index',
	render:h=>h(Test)
})