<template>
	<div class="projectlist">
		<table>
			<tr>
				<th width=450>项目名称</th>
				<th width=150>开始时间</th>
				<th width=150>截止时间</th>
				<th width=150>完成时间</th>
				<th width=150>负责人</th>
				<th width=150>操作</th>
			</tr>
			<tr v-for="(item,index) in projectlist" :key="index">
				<td width=450><input type="text" :value="item.projectname" disabled /></td>
				<td width=150><input type="text" :value="item.opentime" disabled /></td>
				<td width=150><input type="text" :value="item.limittime" disabled /></td>
				<td width=150><input type="text" :value="item.endtime" disabled /></td>
				<td width=150>
					<strong class="">{{item.realname}}</strong>
					<select class="hide">
						<option v-for="(item2,index2) in userlist" :key="index2" :attr-id="item2.id">{{item2.realname}}</option>
					</select>
				</td>
				<td width=150>
					<span :attr-id="item.id" @click="deleteProject($event)">删除</span>
					<span :attr-id="item.id" class="" @click="editStatus($event)">修改</span>
					<span :attr-id="item.id" class="hide" @click="updateProject($event)">保存</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import {getData} from './../../../../assets/js/global.js'

export default{
	data(){
		return{
			projectlist:[],
			userlist:[]
		}
	},
	methods:{
		projectList(){
			getData('get','/api/project/projectList')
			.then((res) => {
				if(res.code == 0){
					this.projectlist = res.data
				}else{
					alert(res.message)
					return false
				}
			})
		},
		userList(){
			getData('get','/api/user/userList')
			.then((res) => {
				if(res.code == 0){
					this.userlist = res.data
				}else{
					alert(res.message)
					return false
				}
			})
		},
		deleteProject(e){
			if(confirm('是否确认删除？') == true){
				getData('post','/api/project/deleteProject',{id:e.currentTarget.getAttribute('attr-id')})
				.then((res) => {
					if(res.code == 0){
						alert('删除成功')
						this.projectList()
					}else{
						alert(res.message)
						return false
					}
				})	
			}
		},
		editStatus(e){
			for(let i = 0 ; i < e.currentTarget.parentNode.parentNode.children.length - 1 ; i++){
				if(i != 4){
					e.currentTarget.parentNode.parentNode.querySelectorAll('td')[i].querySelector('input').removeAttribute('disabled')
				}
			}
			e.currentTarget.parentNode.parentNode.querySelectorAll('td')[4].querySelector('strong').setAttribute('class','hide')
			e.currentTarget.parentNode.parentNode.querySelectorAll('td')[4].querySelector('select').setAttribute('class','')
			e.currentTarget.setAttribute('class','hide')
			e.currentTarget.parentNode.querySelectorAll('span')[2].setAttribute('class','')
		},
		updateProject(e){
			getData('post','/api/project/updateProject',{
				id:e.currentTarget.getAttribute('attr-id'),
				projectname:e.currentTarget.parentNode.parentNode.querySelectorAll('td')[0].querySelector('input').value,
				opentime:e.currentTarget.parentNode.parentNode.querySelectorAll('td')[1].querySelector('input').value,
				limittime:e.currentTarget.parentNode.parentNode.querySelectorAll('td')[2].querySelector('input').value,
				ownerid:e.currentTarget.parentNode.parentNode.querySelectorAll('td')[4].querySelector('select').options[e.currentTarget.parentNode.parentNode.querySelectorAll('td')[4].querySelector('select').selectedIndex].getAttribute('attr-id'),
				endtime:e.currentTarget.parentNode.parentNode.querySelectorAll('td')[3].querySelector('input').value
			})
			.then((res) => {
				if(res.code == 0){
					for(let i = 0 ; i < e.target.parentNode.parentNode.children.length - 1 ; i++){
						if(i != 4){
							e.target.parentNode.parentNode.querySelectorAll('td')[i].querySelector('input').setAttribute('disabled','disabled')
						}
					}
					e.target.parentNode.parentNode.querySelectorAll('td')[4].querySelector('strong').setAttribute('class','')
					e.target.parentNode.parentNode.querySelectorAll('td')[4].querySelector('select').setAttribute('class','hide')
					e.target.setAttribute('class','hide')
					e.target.parentNode.querySelectorAll('span')[1].setAttribute('class','')
					alert('修改成功')
					this.projectList()
				}else{
					alert(res.message)
					return false
				}
			})
		}
	},
	mounted(){
		this.projectList()
		this.userList()
		this.$store.commit('setActive',1)
	},
	computed:{
		refresh(){
			return this.$store.state.refresh
		},
		project(){
			return this.$store.state.project
		}
	},
	watch:{
		refresh(newVal,oldVal){
			this.projectList()
			this.$store.commit('setRefresh',false)
		},
		project(newVal,oldVal){
			this.projectlist = this.$store.state.project
		}
	}
}
</script>

<style lang="scss" type="text/css">
.projectlist{
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