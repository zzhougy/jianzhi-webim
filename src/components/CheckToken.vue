<template>
  <div>正在检测用户信息..</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      headers: {
        Authorization: sessionStorage.getItem("JWT_TOKEN"),
      },
      to:'',//记录接收者
      send:'',//记录发送者者
    }
  },
  methods: {
    ...mapActions(["acceptSubscribe", "declineSubscribe","onLogin2", "setRegisterFlag",
      "onRegister","onLogout", "onGetFirendBlack", "initChatState","addfirend"]),
   // async acceptSubmit(tousername) {
      //登陆
      // console.log('接受请求者登陆'  )
      // await this.onLogin({
      //   username: tousername,
      //   password: '123456'
      // });
      // console.log('同意建立关系'  )
      // await this.acceptSubscribe(tousername);

      //this.changeModal();
   // },
    //建立好友关系
    async zhou(){
      //建立好友关系
      console.log('开始建立好友关系'  )
      //发请求
      //登陆
      console.log('发请求者登陆'  )
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log('userInfouserInfouserInfouserInfouserInfo' , userInfo)
      await this.onLogin2({
        username: userInfo.userId.toLowerCase(),
        password: '123456'
      });
      let blackList = this.$store.state.friendModule.blackList;
      await this.$store.commit("changeUserList", blackList);

      const option = {
        id: this.to,
        // params: this.$route.query.username
        params: this.send
      };
      console.log('发请求'  )

      await this.addfirend(option);
      //接收请求
      console.log('开始接收请求'  )

      console.log('接受请求者登陆'  )
      await this.onLogin({
        username: this.to,
        password: '123456'
      });
      console.log('同意建立关系'  )
      await this.acceptSubscribe(this.to);
    }
    // ...mapActions(["onLogin", "setRegisterFlag", "onRegister"]),
    // toLogin(){console.log('vvvvvvvvvv' )
    //   //getParams()
    //
    //   this.onLogin({
    //     // username: this.username.toLowerCase(),
    //     // password: this.password
    //     username: localStorage.getItem("username"),
    //     password: localStorage.getItem("password")
    //   });
    // },
  },
  mounted() {


    console.log('token' )
    if (this.$route.query.t !== undefined && this.$route.query.t !== null && this.$route.query.t !== ""
      && this.$route.query.to !== undefined && this.$route.query.to !== null && this.$route.query.to !== ""
    && this.$route.query.return_url !== undefined && this.$route.query.return_url !== null && this.$route.query.return_url !== "") {

      sessionStorage.setItem("JWT_TOKEN", this.$route.query.t);
      var token = this.$route.query.t;
      //sessionStorage.setItem("YBHL_USER_JWT_TOKEN", token)
      this.$store.dispatch("user/setToken", token)
      console.log('fffff' )
      var data = {};
        data["headers"] = this.headers;
      // let data = {
			// 	headers:{
			// 		Authorization: token,
			// 	}
			// }
      let res = this.$axios.get("/user/info", data).then(res=>{
        console.log('res' , res)
				//拿到用户信息
        if( res.code==200 ){
          //保存用户
          this.$store.commit("SET_USER_INFO", res.data);
          console.log('this.$store.getters.userInfo' , this.$store.getters.userInfo)
          localStorage.setItem("userInfo", JSON.stringify({ userId: this.$store.getters.userInfo.username }));
         // this.toLogin()

          this.send=this.$store.getters.userInfo.username
          this.to = this.$route.query.to
          //this.zhou()
          localStorage.setItem("relation", JSON.stringify({ requester: this.send ,receiver:this.to}));

          localStorage.setItem('zhoustatus','qingqiu')
          localStorage.setItem('return_url',this.$route.query.return_url)
         this.$router.push('/login')
        }else{
          this.$alert('检验服务请求失败！请联系管理员',{
            callback: action => {
              this.$router.push("/forbidden");
            }
          })
        }
			}).catch(err=>{
        this.$router.push("/forbidden?st=403");
      })

      //this.getParams();
      //this.getUserInfo();
    } else {
			this.$store.dispatch('user/resetToken')
      this.$router.push("/forbidden")
    }
  },
}
</script>
