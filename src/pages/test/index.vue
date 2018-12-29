<template>
<div>
    <input id="sendTxt" type="text" v-model="txt" />
</div>
</template>

<script>
export default{
	data(){
		return{
			WebSocket:null,
			txt:''
		}
	},
	methods:{
		init(){
			const _this = this
			this.WebSocket = new WebSocket("ws://localhost:5003/")
			this.WebSocket.onopen = function(e){
			    console.log('websocket open')
			    _this.WebSocket.send('supply')
			}
			this.WebSocket.onclose = function(e){
			    console.log('websocket close')
			}
			this.WebSocket.onmessage = function(e){
			    console.log(e.data)
			}
		}
	},
	created(){
		this.init()
	}
}

</script>

<style lang="scss" type="text/css">

</style>