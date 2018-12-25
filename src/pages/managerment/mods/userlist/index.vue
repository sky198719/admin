<template>
	<div class="userlist">
		<table>
			<tr>
				<th width=200>姓名</th>
				<th width=200>账号</th>
				<th width=250>密码</th>
				<th width=250>最后登录</th>
				<th width=300>操作</th>
			</tr>
			<tr v-for="(item,index) in userlist" :key="index">
				<td :class="item.usertype == 0 ? 'current' : ''">{{item.realname}}</td>
				<td>{{item.username}}</td>
				<td>{{item.password}}</td>
				<td>{{item.lastlogin}}</td>
				<td>
					<span :attr-id="item.id" @click="deleteUser($event)">删除</span>
					<span :attr-id="item.id" @click="updatePassword($event)">修改密码</span>
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
			userlist:[]
		}
	},
	methods:{
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
		deleteUser(e){
			if(confirm('是否删除？') == true){
				getData('post','/api/user/deleteUser',{id:e.currentTarget.getAttribute('attr-id')})
				.then((res) => {
					if(res.code == 0){
						alert('删除成功')
						this.userList()
					}else{
						alert(res.message)
						return false
					}
				})
			}
		},
		updatePassword(e){
			let updatePassword = prompt('请输入新密码')
			if(!updatePassword){
				alert('修改取消')
				return false
			}else{
				getData('post','/api/user/updatePassword',{id:e.currentTarget.getAttribute('attr-id'),password:updatePassword})
				.then((res) => {
					if(res.code == 0){
						alert('修改成功')
						this.userList()
					}else{
						alert(res.message)
						return false
					}
				})
			}
		}
	},
	mounted(){
		this.userList()
	},
	computed:{
		refresh(){
			return this.$store.state.refresh
		}
	},
	watch:{
		refresh(newVal,oldVal){
			this.userList()
			this.$store.commit('setRefresh',false)
		}
	}
}
</script>

<style lang="scss" type="text/css">
.userlist{
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
				span{
					color:#0000ff;
					line-height:40px;
					margin:0 5px;
					cursor:pointer;
				}
			}
			.current{
				color:#ff0000;
			}
		}
	}
}
</style>