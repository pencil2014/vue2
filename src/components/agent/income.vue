<template>
	<div class="ex-income">
		<div class="ex-header">
			<span class="logo">
				<img src="../../assets/images/logo.png" alt="">管理系统
			</span>
			<a href="javascript:;" class="logout" @click='logout'>退出登录</a>
		</div>
	</div>
</template>

<script>
	
</script>

<style scoped>
.ex-income{background-color: #fff;}
.ex-header {height: 5rem; background-color: #0470b6; color: #fff; position: fixed; top:0; left: 0; width: 100%;z-index: 2;  }
.ex-header .logo { display: block;height: 5rem; line-height: 5rem;  padding-left: 1rem; font-size: 2rem; float: left;}
.ex-header .logo img{ height: 3rem; vertical-align: middle; margin-right: 1rem; }
.ex-header .logout { float: right; height: 3rem; margin: 1rem; vertical-align: middle;background-color: #0d7ec7; color: #fff; border-radius: 0.4rem; padding: 0 1rem; line-height: 3rem; }
.ex-header .logout:active{background-color: #0c84d2;}	
</style>