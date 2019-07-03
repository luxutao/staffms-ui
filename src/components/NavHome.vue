<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
      	<img :src="collapsed?'':'https://blog.animekid.cn/img/logo.png'" >
			</el-col>
			<el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
			</el-col>
        <el-col :span="10" class="logout">
          <el-button size="small" @click.prevent="logout">退出</el-button>
        </el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu class="el-menu-vertical-demo el-menu" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls" style="margin-right: 10px;"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls" style="margin-right: 10px;"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<el-page-header @back="goBack" :content="$route.name" style="width: 50%;float: left;"></el-page-header>
						<!-- <strong class="title">{{$route.name}}</strong> -->
						<el-breadcrumb separator="/" class="breadcrumb-inner" style="line-height: 24px">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	import Cookie from '@/common/js/utils/cookie';
	export default {
		data() {
			return {
				sysName:'VUEADMIN',
				collapsed:false
			}
		},
		methods: {
			goBack() {
				this.$router.back(-1);
			},
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				console.log('handleopen');
			},
			handleclose() {
				console.log('handleclose');
			},
			handleselect: function (a, b) {
            },
            //退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					Cookie.set('token','',0)
					_this.$router.push('/login');
				}).catch(() => {
				});
			},
			//折叠导航栏
			collapse: function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
      }
		},
    mounted() {
      // var user = sessionStorage.getItem('user');
      // if (user) {
      //   user = JSON.parse(user);
      // }
		},
		computed: {
			routes() {
				return this.$router.options.routes
			}
		}
	}
</script>

<style scoped lang="scss">
    @import '../style/vars.scss';
	
	
</style>