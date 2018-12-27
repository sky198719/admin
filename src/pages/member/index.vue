<template>
	<div class="member">
		<Header></Header>
		<router-view></router-view>
	</div>
</template>

<script>
import {getData} from './../../assets/js/global.js'
import Header from './../../components/header/index.vue'

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
			getData('post','/api/user/checkToken')
			.then((res) => {
				if(res.code == 0){
					this.$store.commit('setUserinfo',{id:res.data.id,username:res.data.username,realname:res.data.realname,usertype:res.data.usertype,img:res.data.img})
					this.$store.commit('setActive',2)
				}else{
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