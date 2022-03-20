
<template>
  <el-container>
<!--	<div class="login">-->
<!--		<div class="login-panel">-->
<!--			<div class="logo">Web IM</div>-->
<!--			<van-cell-group>-->
<!--				<van-field v-model="username" equired placeholder="用户名"/>-->
<!--				<van-field v-model="password"  v-on:keyup.13="toLogin" type="password" placeholder="密码" required/>-->
<!--				<van-field v-model="nickname" placeholder="昵称" v-show="this.isRegister == true"/>-->
<!--			</van-cell-group>-->
<!--			<van-button type="default" @click="toRegister" v-if="this.isRegister == true">注册</van-button>-->
<!--			<van-button type="default" @click="toLogin" v-else>登录</van-button>-->
<!--		</div>-->
<!--		<p class="tip" v-if="this.isRegister == true">-->
<!--			已有账号?-->
<!--			<span class="green" v-on:click="changeType">去登录</span>-->
<!--		</p>-->
<!--		<p class="tip" v-else>-->
<!--			没有账号?-->
<!--			<span class="green" v-on:click="changeType">注册</span>-->
<!--		</p>-->
<!--	</div>-->
    稍等加载中*****************************
  </el-container>
</template>

<script>
import "./index.less";
import { mapState, mapActions } from "vuex";
// const userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"));
export default{
	data(){
		return {
      // username: userInfo.userId || "",
      username: "",
			password: "123456",
			nickname: ""
		};
	},
	mounted: function(){
    // var integrityurl = window.location.href;
    // console.log('integrityurl' , integrityurl)
		// const path = this.isRegister ? "/register" : "/login";
    //
		// if(path !== location.pathname){
		// 	this.$router.push(path);
		// }
    //console.log('this.$store.getters' , this.$store.getters)

    if (window.location.pathname === '/register'){
      console.log('rrrrr')
      this.toLogout2()


    }else if(window.location.pathname === '/login'){
      console.log('window.location.pathname' , this.$route.query)

      console.log('ggggg')
      this.toLogin();
    }


	},
	components: {},
	computed: {
		isRegister(){
			return this.$store.state.login.isRegister;
		},
	},
	methods: {
	  ...mapActions(["onLogin", "setRegisterFlag", "onRegister","onLogout", "onGetFirendBlack", "initChatState","addfirend","acceptSubscribe"]),
    async toLogout2() {

      await this.onLogout();

      console.log('444444444'  )
      await this.initChatState();

      await this.toRegister();
    },
    toLogin(){
      //getParams()
      //console.log('this.username.toLowerCase()' , this.username.toLowerCase())

			// this.onLogin({
			// 	username: this.username.toLowerCase(),
			// 	password: this.password
			// });
      console.log('登陆-----' )
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log('userInfouserInfouserInfouserInfouserInfo' , userInfo)
       console.log('通过好友请求--------------'  )

        this.onLogin({
          username: userInfo.userId.toLowerCase(),
          password: '123456'
        });


      console.log('rrrrrrrrrrVVV'  )

		},
    getParams(url){
      //获取？后面第一个字符串的索引
      var index = url.indexOf('?')+1;
      //取得url后面的字符串name=zs&age=18&b=2
      var params = url.substr(index);
      //使用&切割字符串，返回一个数组
      var arr = params.split('&');
      console.log(arr);
    },
		async toRegister(){
			// this.onRegister({
			// 	username: this.username.toLowerCase(),
			// 	password: this.password,
			// 	nickname: this.nickname.toLowerCase(),
			// });
      console.log('开始注册！！！！！' + JSON.parse(localStorage.getItem("userInfo")).userId)
      await this.onRegister({
      	username: JSON.parse(localStorage.getItem("userInfo")).userId,
      	password: '123456',
      	nickname: JSON.parse(localStorage.getItem("userInfo")).userId,
      });
      console.log('注册完登陆-----' )
     // setTimeout(function(){
     //    location.href=`http://localhost:8082/login`
     //  }, 5000);
      //this.$router.push('/login')
		},
		changeType(){
			this.setRegisterFlag(!this.isRegister);
		}
	}
};
</script>
