<template>
	<div class="managerment">
		<Header></Header>
		<router-view></router-view>
	</div>
</template>

<script>
import {getData} from './../../assets/js/global.js'
import Header from './../../components/header/index.vue'

export default{
	methods:{
		checkToken(){
			getData('post','/api/user/checkToken')
			.then((res) => {
				if(res.code == 0){
					this.$store.commit('setUserinfo',{id:res.data.id,username:res.data.username,realname:res.data.realname,usertype:res.data.usertype})
					this.$store.commit('setActive',0)
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