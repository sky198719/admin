<template>
	<div class="header">
		<ul v-if="$store.state.userinfo.usertype == 0">
			<li attr-id="0" :class="$store.state.active == 0 ? 'current' : ''" @click="getCurrentId($event)"><router-link to="/userlist">用户管理</router-link></li>
			<li attr-id="1" :class="$store.state.active == 1 ? 'current' : ''" @click="getCurrentId($event)"><router-link to="/projectlist">项目管理</router-link></li>
			<li attr-id="2" :class="$store.state.active == 2 ? 'current' : ''" @click="getCurrentId($event)"><router-link :to="'/mylist/' + $store.state.userinfo.id">我的项目</router-link></li>
			<li @click="insertUser()">新增用户</li>
			<li @click="insertProject()">新增项目</li>
		</ul>
		<ul v-if="$store.state.userinfo.usertype == 1">
			<li attr-id="2" :class="$store.state.active == 2 ? 'current' : ''" @click="getCurrentId($event)"><router-link :to="'/mylist/' + $store.state.userinfo.id">我的项目</router-link></li>
		</ul>
		<span>你好，<router-link to="/personal">{{$store.state.userinfo.realname}}</router-link><em @click="logout()">注销</em></span>
	</div>
</template>

<script>
import {getData} from './../../assets/js/global.js'

export default{
	methods:{
		getCurrentId(e){
			this.$store.commit('setActive',e.currentTarget.getAttribute('attr-id'))
		},
		insertUser(){
			let newUsername = prompt('请输入新增用户账号')
			if(!newUsername){
				alert('新增取消')
				return false
			}else{
				let newPassword = prompt('请输入新增用户密码')
				if(!newPassword){
					alert('新增取消')
					return false
				}else{
					let newRealname = prompt('请输入新增用户真实姓名')
					if(!newRealname){
						alert('新增取消')
						return false
					}else{
						let newUsertype = prompt('请输入新增用户权限类型')
						if(!newUsertype){
							alert('新增取消')
							return false
						}else{
							getData('post','/api/user/insertUser',{username:newUsername,password:newPassword,realname:newRealname,usertype:newUsertype})
							.then((res) => {
								if(res.code == 0){
									alert('新增成功')
									this.$store.commit('setRefresh',true)
								}else{
									alert(res.message)
									return false
								}
							})
						}
					}
				}
			}
		},
		insertProject(){
			let newProjectname = prompt('请输入新增项目名')
			if(!newProjectname){
				alert('新增取消')
				return false
			}else{
				getData('post','/api/project/insertProject',{projectname:newProjectname})
				.then((res) => {
					if(res.code == 0){
						alert('新增成功')
						this.$store.commit('setRefresh',true)
					}else{
						alert(res.message)
						return false
					}
				})
			}
		},
		logout(){
			if(confirm('是否登出？') == true){
				getData('post','/api/user/logout',{username:this.$store.state.userinfo.username})
				.then((res) => {
					if(res.code == 0){
						this.$store.commit('setActive',0)
						alert('登出成功')
						window.location.href = './../login'
					}else{
						alert(res.message)
						return false
					}
				})
			}
		}
	}
}
</script>

<style lang="scss" type="text/css">

</style>