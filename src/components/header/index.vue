<template>
	<div class="header">
		<ul v-if="$store.state.userinfo.usertype == 0">
			<li attr-id="0" :class="$store.state.active == 0 ? 'current' : ''" @click="getCurrentId($event)"><router-link to="/userlist">用户管理</router-link></li>
			<li attr-id="1" :class="$store.state.active == 1 ? 'current' : ''" @click="getCurrentId($event)"><router-link to="/projectlist">项目管理</router-link></li>
			<li attr-id="2" :class="$store.state.active == 2 ? 'current' : ''" @click="getCurrentId($event)"><router-link :to="'/mylist/' + $store.state.userinfo.id">我的项目</router-link></li>
			<li @click="insertUser()">新增用户</li>
			<li @click="insertProject()">新增项目</li>
			<li @click="isSearch == false ? searchProject() : projectList()" v-if="$store.state.active == 1" v-text="isSearch == false ? '搜索项目' : '取消搜索'"></li>
		</ul>
		<ul v-if="$store.state.userinfo.usertype == 1">
			<li attr-id="2" :class="$store.state.active == 2 ? 'current' : ''" @click="getCurrentId($event)"><router-link :to="'/mylist/' + $store.state.userinfo.id">我的项目</router-link></li>
		</ul>
		<span><img v-if="$store.state.userinfo.img != '' && $store.state.userinfo.img != null && $store.state.userinfo.img != undefined" :src="'http://localhost:8001' + $store.state.userinfo.img" />你好，<router-link to="/personal">{{$store.state.userinfo.realname}}</router-link><em @click="logout()">注销</em></span>
	</div>
</template>

<script>
import {getData} from './../../assets/js/global.js'

export default{
	data(){
		return{
			isSearch:false
		}
	},
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
		searchProject(){
			let searchname = prompt('请输入搜索内容')
			if(!searchname){
				return false
			}else{
				getData('get','/api/project/searchProject?searchname=' + searchname)
				.then((res) => {
					if(res.code == 0){
						this.$store.commit('setProject',res.data)
						this.isSearch = true
					}else{
						alert(res.message)
						return false
					}
				})
			}
		},
		projectList(){
			getData('get','/api/project/projectList')
			.then((res) => {
				if(res.code == 0){
					this.$store.commit('setProject',res.data)
					this.isSearch = false
				}else{
					alert(res.message)
					return false
				}
			})
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
.header{
	width:1200px;
	height:50px;
	margin:0 auto;
	position:relative;
	ul{
		width:1000px;
		height:50px;
		li{
			width:150px;
			height:50px;
			line-height:50px;
			float:left;
			display:inline;
			cursor:pointer;
			a{
				color:#000000;
				display:block;
			}
		}
		.current{
			color:#0000ff;
			a{
				color:#0000ff;
			}
		}
	}
	span{
		width:200px;
		height:50px;
		line-height:50px;
		top:0;
		right:0;
		position:absolute;
		display:block;
		text-align:right;
		a{
			color:#0000ff;
		}
		em{
			font-style:normal;
			line-height:50px;
			margin-left:10px;
			cursor:pointer;
		}
		img{
			width:30px;
			height:30px;
			top:10px;
			left:10px;
			position:absolute;
			border-radius:50%;
		}
	}
}
</style>