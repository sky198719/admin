<template>
	<div class="personal">
		<ul>
			<li>
				<label>真实姓名：</label>
				<input type="text" v-model="realname" />
			</li>
			<li>
				<label>账号：</label>
				<input type="text" disabled v-model="username" />
			</li>
			<li>
				<label>原密码：</label>
				<input type="password" v-model="oldpassword" />
			</li>
			<li>
				<label>新密码：</label>
				<input type="password" v-model="newpassword" />
			</li>
			<li>
				<label>上传头像：</label>
				<input type="file" @change="handleChange($event)" />
			</li>
		</ul>
		<button @click="uploadImg()">提交</button>
	</div>
</template>

<script>
import {localPath,getData} from './../../assets/js/global.js'

export default{
	data(){
		return{
			realname:this.$store.state.userinfo.realname,
			username:this.$store.state.userinfo.username,
			oldpassword:'',
			newpassword:'',
			upload:''
		}
	},
	methods:{
		updataUserinfo(){
			getData('post','/api/user/updataUserinfo',{id:this.$store.state.userinfo.id,realname:this.realname,oldpassword:this.oldpassword,newpassword:this.newpassword})
			.then((res) => {
				if(res.code == 0){
					alert('修改成功，请重新登录')
					window.location.href = localPath + 'login'
				}else{
					alert(res.message)
					return false
				}
			})
		},
		handleChange(e){
			this.upload = e.target.files[0]
		},
		uploadImg(){
			let data = new FormData()
			data.append('file',this.upload)
			getData('file','/api/upload/uploadImg',data)
			.then((res) => {
				if(res.code == 0){
					this.updataUserinfo()
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
.personal{
	width:1200px;
	margin:0 auto;
	ul{
		width:1200px;
		padding-top:50px;
		li{
			width:1000px;
			padding:0 100px;
			height:40px;
			margin-bottom:10px;
			label{
				width:300px;
				height:40px;
				line-height:40px;
				float:left;
				display:inline;
				text-align:right;
			}
			input{
				width:300px;
				height:40px;
				line-height:40px;
				float:left;
				display:inline;
				box-sizing:border-box;
				padding:0 10px;
			}
		}
	}
	button{
		width:100px;
		height:40px;
		line-height:40px;
		border:1px solid #dddddd;
		background:#eeeeee;
		text-align:center;
		cursor:pointer;
		margin-left:400px;
		display:block;
	}
}
</style>