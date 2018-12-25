<template>
	<div class="header">
		<span>你好，{{$store.state.userinfo.realname}}<em @click="logout()">注销</em></span>
	</div>
</template>

<script>
import {getData} from './../../../../assets/js/global.js'

export default{
	methods:{
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