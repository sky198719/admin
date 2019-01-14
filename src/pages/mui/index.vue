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
				singalSpeed:15, //单张切换速度，数字越大越快
				sliderSpeed:3000, //轮播速度，数字越大越慢
				width:300, //应用宽度
				height:150, //应用高度
				openWindow:true, //是否打开新窗口
				ctrObj:{ //控制件
					width:10, //控制件宽度
					height:10, //控制件高度
					background:'#ff0000', //控制件背景色
					hoverbackground:'#0000ff', //当前轮播控制件背景色
					color:'#ffffff', //控制件颜色
					hovercolor:'#000000', //当前轮播控制件颜色
					showindex:false, //是否显示第几张
					margin:5, //控制件间隔
					bottom:10 //控制件上下位置
				},
				titleObj:{ //标题控件
					show:true, //是否显示标题
					height:20, //标题高度
					top:0, //标题上下位置
					color:'#ffffff', //标题颜色
					background:'#000000', //标题背景色
					opacity:'0.5', //标题透明度
					align:'left', //标题文字位置
					fontsize:12 //字体大小
				},
				imgObj:[ //数据模型
					{
						title:'图片1', //标题
						href:'http://www.baidu.com', //链接地址
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg' //图片地址
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
					},
					{
						title:'图片1',
						href:'http://www.baidu.com',
						imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3392708410,2971454294&fm=26&gp=0.jpg'
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