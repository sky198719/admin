<template>
	<LineTree :lineTreeData="lineTreeData"></LineTree>
</template>

<script>
import LineTree from './mods/lineTree.vue'

export default{
	data(){
		return{
			lineTreeData:{
				obj:'linetree', //对象class类
				title:{ //标题 非必传
					text:'柱状图', //主标题 非必传
					subtext:'linetree' //副标题 非必传
				},
				legend:{ //图例 非必传
					align:'left', //图例文字位置 默认值为left 非必传
					top:10, //图例上下位置 默认值为0 非必传
					left:100 //图例左右位置 默认值为0 非必传
				},
				xAxis:{ //x轴
					textcolor:'#ff0000', //x轴文字颜色 默认值为#000000 非必传
					linecolor:'#ff0000', //x轴坐标颜色 默认值为#000000 非必传
					linewidth:1, //x轴坐标宽度 默认值为1 非必传
					axisTick:false, //x轴坐标下钩显示 默认值为false 非必传
					axisLine:true, //x轴坐标显示 默认值为true 非必传
					splitLine:false, //x轴网格显示 默认值为false 非必传
					data:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'] //x轴坐标
				},
				yAxis:{ //y轴 非必传
					textcolor:'#0000ff', //y轴文字颜色 默认值为#000000 非必传
					linecolor:'#0000ff', //y轴坐标颜色 默认值为#000000 非必传
					linewidth:1, //y轴坐标宽度 默认值为1 非必传
					axisTick:false, //y轴坐标下钩显示 默认值为false 非必传
					axisLine:true, //y轴坐标显示 默认值为true 非必传
					splitLine:true //y轴网格显示 默认值为false 非必传
				},
				series:[ //系列 支持单个或者多个系列
			        {
			            name:'1月', //图例名称 非必传
			            colortype:'line', // 颜色类型 默认值为line 参数line:纯色 transfer:渐变 非必传
			            emphasiscolor:['#ff0000'], //鼠标滑动颜色 非必传
			            normalcolor:['#0000ff'], //默认颜色
			            data:[100,200,300,400,500,600,700] //数据
			        },
			        {
			            name:'2月',
			            colortype:'transfer',
			            emphasiscolor:['#0000ff','#ff0000'],
			            normalcolor:['#ff0000','#0000ff'], //渐变颜色 不支持多段渐变
			            data:[100,200,300,400,500,600,700]
			        }
			    ]
			}
		}
	},
	components:{
		LineTree:LineTree
	}
}
</script>

<style lang="scss" type="text/css">
.linetree{
	width:500px;
	height:300px;
}
</style>