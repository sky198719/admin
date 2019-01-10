<template>
	<div :class="barTreeData.obj" :barTreeData="barTreeData"></div>
</template>

<script>
import * as echarts from 'echarts'

export default{
	data(){
		return{
			series:[]
		}
	},
	props:{
		barTreeData:''
	},
	methods:{
		seriesInit(obj){
			const _this = this
			for(let i = 0 ; i < obj.length ; i ++){
				if(obj[i].colortype){
					if(obj[i].colortype == 'line'){
						_this.series.push({
							type:'bar',
							name:obj[i].name ? obj[i].name : '',
							itemStyle:{
								normal:{
									color:obj[i].normalcolor[0]
								},
								emphasis:obj[i].emphasiscolor ? {
									color:obj[i].emphasiscolor[0]
								} : ''
							},
							data:obj[i].data
						})
					}else if(obj[i].colortype == 'transfer'){
						_this.series.push({
							type:'bar',
							name:obj[i].name ? obj[i].name : '',
							itemStyle:{
								normal:{
									color:new echarts.graphic.LinearGradient(
				                        0,0,0,1,
				                        [
				                            {offset:0,color:obj[i].normalcolor[0]},
				                            {offset:1,color:obj[i].normalcolor[1]}
				                        ]
				                    )
								},
								emphasis:obj[i].emphasiscolor ? {
									color:new echarts.graphic.LinearGradient(
				                        0,0,0,1,
				                        [
				                            {offset:0,color:obj[i].emphasiscolor[0]},
				                            {offset:1,color:obj[i].emphasiscolor[1]}
				                        ]
				                    )
								} : ''
							},
							data:obj[i].data
						})
					}
				}else{
					_this.series.push({
						type:'bar',
						colortype:'line',
						name:obj[i].name ? obj[i].name : '',
						itemStyle:{
							normal:{
								color:obj[i].normalcolor[0]
							},
							emphasis:obj[i].emphasiscolor ? {
								color:obj[i].emphasiscolor[0]
							} : ''
						},
						data:obj[i].data
					})
				}
			}
		},
		lineTree(params){
			const _this = this
			_this.seriesInit(_this.barTreeData.series)
			echarts.init(document.querySelector(params.obj)).setOption({
				title:{
			        text:params.title.text,
			        subtext:params.title.subtext
			    },
			    legend:{
			        data:params.legend.data,
			        align:params.legend.align,
			        top:params.legend.top,
			        left:params.legend.left
			    },
			    xAxis:{
			        data:params.xAxis.data,
			        axisLabel:{
			            textStyle:{
			                color:params.xAxis.textcolor
			            }
			        },
			        axisLine:{
			            show:params.xAxis.axisLine,
			            lineStyle:{
			            	color:params.xAxis.linecolor,
			            	width:params.xAxis.linewidth
			            }
			        },
			        axisTick:{
			            show:params.xAxis.axisTick
			        },
			        splitLine:{
			        	show:params.xAxis.splitLine
			        }
			    },
			    yAxis:{
			    	axisLabel:{
			            textStyle:{
			                color:params.yAxis.textcolor
			            }
			        },
			        axisLine:{
			            show:params.yAxis.axisLine,
			            lineStyle:{
			            	color:params.yAxis.linecolor,
			            	width:params.yAxis.linewidth
			            }
			        },
			        axisTick:{
			            show:params.yAxis.axisTick
			        },
			        splitLine:{
			        	show:params.yAxis.splitLine
			        }
			    },
			    series:_this.series
			})
		},
		linetreeInit(){
			const _this = this
			_this.lineTree({
				obj:'.' + _this.barTreeData.obj,
				title:_this.barTreeData.title != undefined ? {
					text:_this.barTreeData.title.text != undefined ? _this.barTreeData.title.text : '',
					subtext:_this.barTreeData.title.subtext != undefined ? _this.barTreeData.title.subtext : ''
				} : '',
				legend:_this.barTreeData.legend != undefined ? {
					align:_this.barTreeData.legend.align != undefined ? _this.barTreeData.legend.align : 'left',
					top:_this.barTreeData.legend.top != undefined ? _this.barTreeData.legend.top : 0,
					left:_this.barTreeData.legend.left != undefined ? _this.barTreeData.legend.left : 0
				} : '',
				xAxis:{
					data:_this.barTreeData.xAxis.data,
					textcolor:_this.barTreeData.xAxis.textcolor != undefined ? _this.barTreeData.xAxis.textcolor : '#000000',
					linecolor:_this.barTreeData.xAxis.linecolor != undefined ? _this.barTreeData.xAxis.linecolor : '#000000',
					linewidth:_this.barTreeData.xAxis.linewidth != undefined ? _this.barTreeData.xAxis.linewidth : 1,
					axisTick:_this.barTreeData.xAxis.axisTick != undefined ? _this.barTreeData.xAxis.axisTick : false,
					axisLine:_this.barTreeData.xAxis.axisLine != undefined ? _this.barTreeData.xAxis.axisLine : true,
					splitLine:_this.barTreeData.xAxis.splitLine != undefined ? _this.barTreeData.xAxis.splitLine : false
				},
				yAxis:_this.barTreeData.yAxis != undefined ? {
					textcolor:_this.barTreeData.yAxis.textcolor != undefined ? _this.barTreeData.yAxis.textcolor : '#000000',
					linecolor:_this.barTreeData.yAxis.linecolor != undefined ? _this.barTreeData.yAxis.linecolor : '#000000',
					linewidth:_this.barTreeData.yAxis.linewidth != undefined ? _this.barTreeData.yAxis.linewidth : 1,
					axisTick:_this.barTreeData.yAxis.axisTick != undefined ? _this.barTreeData.yAxis.axisTick : false,
					axisLine:_this.barTreeData.yAxis.axisLine != undefined ? _this.barTreeData.yAxis.axisLine : true,
					splitLine:_this.barTreeData.yAxis.splitLine != undefined ? _this.barTreeData.yAxis.splitLine : true
				} : {
					textcolor:'#000000',
					linecolor:'#000000',
					linewidth:1,
					axisTick:false,
					axisLine:true,
					splitLine:true
				},
				series:_this.barTreeData.series
			})
		}
	},
	mounted(){
		this.linetreeInit()
	},
	updated(){
		this.linetreeInit()
	}
}
</script>

<style lang="scss" type="text/css">

</style>