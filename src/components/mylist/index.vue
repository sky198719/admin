<template>
	<div class="mylist">
		<table>
			<tr>
				<th width=600>项目名称</th>
				<th width=200>开始时间</th>
				<th width=200>截止时间</th>
				<th width=200>完成时间</th>
			</tr>
			<tr v-for="(item,index) in mylist" :key="index">
				<td width=450><input type="text" :value="item.projectname" disabled /></td>
				<td width=150><input type="text" :value="item.opentime" disabled /></td>
				<td width=150><input type="text" :value="item.limittime" disabled /></td>
				<td width=150><input type="text" :value="item.endtime" disabled /></td>
			</tr>
		</table>
	</div>
</template>

<script>
import {getData} from './../../assets/js/global.js'

export default{
	data(){
		return{
			mylist:[]
		}
	},
	methods:{
		myList(){
			getData('get','/api/project/projectList?ownerid=' + this.$route.params.id)
			.then((res) => {
				if(res.code == 0){
					this.mylist = res.data
				}else{
					alert(res.message)
					return false
				}
			})
		}
	},
	mounted(){
		this.myList()
		this.$store.commit('setActive',2)
	}
}
</script>

<style lang="scss" type="text/css">
.mylist{
	width:1200px;
	margin:0 auto;
	table{
		width:1200px;
		border:1px solid #666666;
		border-left:none;
		border-top:none;
		border-collapse:collapse;
		tr{
			width:1200px;
			height:40px;
			th{
				box-sizing:border-box;
				height:40px;
				border:1px solid #666666;
				border-right:none;
				border-bottom:none;
			}
			td{
				box-sizing:border-box;
				height:40px;
				border:1px solid #666666;
				border-right:none;
				border-bottom:none;
				text-align:center;
				input{
					width:90%;
					box-sizing:border-box;
					height:30px;
					line-height:30px;
					border:1px solid #dddddd;
					background:none;
					font-size:16px;
					padding:0 5px;
					color:#000000;
					text-align:left;
				}
				input:disabled{	
					border:none;
					background:none;
					text-align:center;
					padding:0;
				}
				select{
					width:90%;
					box-sizing:border-box;
					height:30px;
					line-height:30px;
					border:1px solid #dddddd;
					background:none;
					font-size:14px;
					padding:0 5px;
					color:#000000;
					text-align:left;
				}
				select:disabled{	
					border:none;
					background:none;
					text-align:center;
					padding:0;
					appearance:none;
					-webkit-appearance:none;
					-moz-appearance:none;
					padding-left:20px;
				}
				span{
					color:#0000ff;
					line-height:40px;
					margin:0 5px;
					cursor:pointer;
				}
				strong{
					font-weight:normal;
				}
				.hide{
					display:none;
				}
			}
			.current{
				color:#ff0000;
			}
		}
	}
}
</style>