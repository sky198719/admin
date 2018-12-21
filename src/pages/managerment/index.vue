<template>
	<div class="managerment">
		<Header></Header>
		<router-view></router-view>
	</div>
</template>

<script>
import {getData} from './../../assets/js/global.js'
import Header from './mods/header/index.vue'

export default{
	methods:{
		getCookie(name){
			var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		    if(arr = document.cookie.match(reg)){
		    	return unescape(arr[2]);
		    }else{
		        return null; 
		    }
		},
		checkToken(){
			getData('post','/api/user/checkToken',{token:this.getCookie('token')})
			.then((res) => {
				if(res.code == 0){
					if(res.data.usertype == 1){
						this.$store.commit('setActive',0)
						alert('权限不足')
						window.location.href = './../login'
					}else{
						this.$store.commit('setUserinfo',{username:res.data.username,realname:res.data.realname,usertype:res.data.usertype})
					}
				}else{
					this.$store.commit('setActive',0)
					alert(res.message)
					window.location.href = './../login'
				}
			})
		}
	},
	mounted(){
		this.checkToken()
	},
	components:{
		Header:Header
	}
}
</script>

<style lang="scss" type="text/css">

</style>