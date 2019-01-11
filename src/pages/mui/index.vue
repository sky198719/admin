<template>
	<Slider :sliderData="sliderData"></Slider>
</template>

<script>
import Slider from './mods/slider/index.vue'

export default{
	data(){
		return{
			sliderData:{
				obj:'slider', //对象
				singalSpeed:10, //单张切换速度，数字越大越快
				sliderSpeed:3000, //轮播速度，数字越大越慢
				width:1000, //应用宽度
				height:500, //应用高度
				ctrObj:{ //控制件
					width:20, //控制件宽度
					height:10, //控制件高度
					background:'#ff0000', //控制件背景色
					hoverbackground:'#0000ff', //当前轮播控制件背景色
					color:'#ffffff', //控制件颜色
					hovercolor:'#000000', //当前轮播控制件颜色
					showindex:true, //是否显示第几张
					margin:10, //控制件间隔
					bottom:10 //控制件上下位置
				},
				imgObj:[ //数据模型
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg',
						subtitle:''
					}
				]
			}
		}
	},
	components:{
		Slider:Slider
	}
}
</script>

<style lang="scss" type="text/css">

</style>