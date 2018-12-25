<template>
	<div class="loginBox">
		<ul>
			<li>
				<label>用户名：</label>
				<input type="text" placeholder="请输入用户名" v-model="username" />
			</li>
			<li>
				<label>密码：</label>
				<input type="password" placeholder="请输入密码" v-model="password" />
			</li>
		</ul>
		<button @click="login()">登录</button>
	</div>
</template>

<script>
import {getData} from './../../assets/js/global.js'

export default{
	data(){
		return{
			username:'',
			password:''
		}
	},
	methods:{
		login(){
			getData('post','/api/user/login',{username:this.username,password:this.password})
			.then((res) => {
				if(res.code == 0){
					if(res.data.usertype == 0){
						window.location.href = '/managerment#/userlist'
					}else{
						window.location.href = '/member#/mylist/' + res.data.id
					}
				}else{
					alert(res.message)
					return false
				}
			})
		}
	}
}
</script>

<style lang="scss" type="text/css">
.loginBox{
	width:300px;
	height:200px;
	top:50%;
	left:50%;
	position:absolute;
	margin:-100px 0 0 -150px;
	border:1px solid #666666;
	ul{
		width:250px;
		margin:0 auto;
		padding-top:30px;
		li{
			width:250px;
			height:50px;
			label{
				width:60px;
				height:30px;
				line-height:30px;
				text-align:right;
				float:left;
				display:inline;
				font-size:14px;
			}
			input{
				width:160px;
				height:28px;
				line-height:28px;
				border:1px solid #dddddd;
				padding:0 10px;
				float:left;
				display:inline;
			}
		}
	}
	button{
		width:100px;
		height:40px;
		line-height:40px;
		background:#cccccc;
		border:1px solid #dddddd;
		cursor:pointer;
		text-align:center;
		margin:0 auto;
		display:block;
	}
}
</style>