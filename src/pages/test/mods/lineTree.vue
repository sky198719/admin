<template>
	<div :class="lineTreeData.obj" :lineTreeData="lineTreeData"></div>
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
		lineTreeData:''
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
			_this.seriesInit(_this.lineTreeData.series)
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
				obj:'.' + _this.lineTreeData.obj,
				title:_this.lineTreeData.title != undefined ? {
					text:_this.lineTreeData.title.text != undefined ? _this.lineTreeData.title.text : '',
					subtext:_this.lineTreeData.title.subtext != undefined ? _this.lineTreeData.title.subtext : ''
				} : '',
				legend:_this.lineTreeData.legend != undefined ? {
					align:_this.lineTreeData.legend.align != undefined ? _this.lineTreeData.legend.align : 'left',
					top:_this.lineTreeData.legend.top != undefined ? _this.lineTreeData.legend.top : 0,
					left:_this.lineTreeData.legend.left != undefined ? _this.lineTreeData.legend.left : 0
				} : '',
				xAxis:{
					data:_this.lineTreeData.xAxis.data,
					textcolor:_this.lineTreeData.xAxis.textcolor != undefined ? _this.lineTreeData.xAxis.textcolor : '#000000',
					linecolor:_this.lineTreeData.xAxis.linecolor != undefined ? _this.lineTreeData.xAxis.linecolor : '#000000',
					linewidth:_this.lineTreeData.xAxis.linewidth != undefined ? _this.lineTreeData.xAxis.linewidth : 1,
					axisTick:_this.lineTreeData.xAxis.axisTick != undefined ? _this.lineTreeData.xAxis.axisTick : false,
					axisLine:_this.lineTreeData.xAxis.axisLine != undefined ? _this.lineTreeData.xAxis.axisLine : true,
					splitLine:_this.lineTreeData.xAxis.splitLine != undefined ? _this.lineTreeData.xAxis.splitLine : false
				},
				yAxis:_this.lineTreeData.yAxis != undefined ? {
					textcolor:_this.lineTreeData.yAxis.textcolor != undefined ? _this.lineTreeData.yAxis.textcolor : '#000000',
					linecolor:_this.lineTreeData.yAxis.linecolor != undefined ? _this.lineTreeData.yAxis.linecolor : '#000000',
					linewidth:_this.lineTreeData.yAxis.linewidth != undefined ? _this.lineTreeData.yAxis.linewidth : 1,
					axisTick:_this.lineTreeData.yAxis.axisTick != undefined ? _this.lineTreeData.yAxis.axisTick : false,
					axisLine:_this.lineTreeData.yAxis.axisLine != undefined ? _this.lineTreeData.yAxis.axisLine : true,
					splitLine:_this.lineTreeData.yAxis.splitLine != undefined ? _this.lineTreeData.yAxis.splitLine : true
				} : {
					textcolor:'#000000',
					linecolor:'#000000',
					linewidth:1,
					axisTick:false,
					axisLine:true,
					splitLine:true
				},
				series:_this.lineTreeData.series
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