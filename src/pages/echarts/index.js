import Vue from 'vue'

import './../../assets/css/global.scss'

import Echarts from './index.vue'

new Vue({
	el:'#index',
	render:h=>h(Echarts)
})