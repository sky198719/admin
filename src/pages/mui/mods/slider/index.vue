<template>
	<div :class="sliderData.obj" :sliderData="sliderData" :style="{width:sliderData.width + 'px',height:sliderData.height + 'px'}" @mouseover="handleMouseover()" @mouseout="handleMouseout()">
		<ul :style="{width:sliderData.width * sliderData.imgObj.length + 'px',height:sliderData.height + 'px'}">
			<li v-for="(item,index) in sliderData.imgObj" :key="index" :style="{width:sliderData.width + 'px',height:sliderData.height + 'px'}">
				<a :href="item.href">
					<img :src="item.imgUrl" :style="{width:sliderData.width + 'px',height:sliderData.height + 'px'}" />
				</a>
			</li>
		</ul>
		<ol :style="{marginLeft:-((sliderData.ctrObj.width + sliderData.ctrObj.margin) * sliderData.imgObj.length)/2 + 'px',height:sliderData.ctrObj.height + 'px',bottom:sliderData.ctrObj.bottom + 'px'}">
			<li v-for="(item,index) in sliderData.imgObj" :key="index" :style="{
				width:sliderData.ctrObj.width +'px',
				height:sliderData.ctrObj.height + 'px',
				lineHeight:sliderData.ctrObj.height + 'px',
				marginLeft:sliderData.ctrObj.margin/2 + 'px',
				marginRight:sliderData.ctrObj.margin/2 + 'px',
				background:currentSlider == index ? sliderData.ctrObj.hoverbackground : sliderData.ctrObj.background,
				color:currentSlider == index ? sliderData.ctrObj.hovercolor : sliderData.ctrObj.color
			}" v-text="sliderData.ctrObj.showindex == true ? index : ''" :attr-current="index" @click="handleClick($event)"></li>
		</ol>
	</div>
</template>

<script>
export default{
	data(){
		return{
			currentSlider:0,
			t1:'',
			t2:'',
			t3:'',
			moveRange:0
		}
	},
	props:{
		sliderData:''
	},
	methods:{
		slider(){
			const _this = this
			clearInterval(_this.t1)
			_this.t1 = setInterval(function(){
				clearInterval(_this.t2)
				_this.currentSlider ++;
				if(_this.currentSlider >= _this.sliderData.imgObj.length){
					_this.currentSlider = 0
				}
				_this.t2 = setInterval(function(){
					if(_this.currentSlider > 0){
						_this.moveRange -= _this.sliderData.singalSpeed
						document.querySelector('.' + _this.sliderData.obj).getElementsByTagName('ul')[0].style.marginLeft = _this.moveRange + 'px'
						if(parseInt(document.querySelector('.' + _this.sliderData.obj).getElementsByTagName('ul')[0].style.marginLeft) <= -_this.sliderData.width * _this.currentSlider){
							clearInterval(_this.t2)
						}
					}else{
						_this.moveRange += (_this.sliderData.singalSpeed * (_this.sliderData.imgObj.length - 1))
						document.querySelector('.' + _this.sliderData.obj).getElementsByTagName('ul')[0].style.marginLeft = _this.moveRange + 'px'
						if(parseInt(document.querySelector('.' + _this.sliderData.obj).getElementsByTagName('ul')[0].style.marginLeft) >= 0){
							clearInterval(_this.t2)
						}
					}
				},1)
			},_this.sliderData.sliderSpeed)
		},
		handleMouseover(){
			const _this = this
			clearInterval(_this.t1)
			clearInterval(_this.t3)
		},
		handleMouseout(){
			const _this = this
			_this.slider()
		},
		handleClick(e){
			const _this = this
			const tempSlider = _this.currentSlider
			clearInterval(_this.t3)
			_this.currentSlider = e.target.getAttribute('attr-current')
			_this.t3 = setInterval(function(){
				if(parseInt(_this.currentSlider) > parseInt(tempSlider)){
					_this.moveRange -= (_this.sliderData.singalSpeed * (_this.currentSlider - tempSlider))
					document.querySelector('.' + _this.sliderData.obj).getElementsByTagName('ul')[0].style.marginLeft = _this.moveRange + 'px'
					if(parseInt(document.querySelector('.' + _this.sliderData.obj).getElementsByTagName('ul')[0].style.marginLeft) <= -_this.sliderData.width * _this.currentSlider){ 
						document.querySelector('.' + _this.sliderData.obj).getElementsByTagName('ul')[0].style.marginLeft = -_this.sliderData.width * _this.currentSlider
						clearInterval(_this.t3)
					}
				}else if(parseInt(_this.currentSlider) < parseInt(tempSlider)){
					_this.moveRange += (_this.sliderData.singalSpeed * (tempSlider - _this.currentSlider))
					document.querySelector('.' + _this.sliderData.obj).getElementsByTagName('ul')[0].style.marginLeft = _this.moveRange + 'px'
					if(parseInt(document.querySelector('.' + _this.sliderData.obj).getElementsByTagName('ul')[0].style.marginLeft) >= -_this.sliderData.width * _this.currentSlider){
						document.querySelector('.' + _this.sliderData.obj).getElementsByTagName('ul')[0].style.marginLeft = -_this.sliderData.width * _this.currentSlider
						clearInterval(_this.t3)
					}
				}else{
					clearInterval(_this.t3)
				}
			},1)
		}
	},
	mounted(){
		this.slider()
	}
}
</script>

<style lang="scss" type="text/css">
.slider{
	overflow:hidden;
	position:relative;
	ul{
		li{
			float:left;
			display:inline;
			img{
				display:block;
				border:none;
			}
		}
	}
	ol{
		position:absolute;
		left:50%;
		li{
			float:left;
			display:inline;
			text-align:center;
			font-size:12px;
			line-height:20px;
			cursor:pointer;
		}
		.current{
			
		}
	}
}
</style>