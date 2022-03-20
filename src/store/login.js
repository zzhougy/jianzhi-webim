import { Message } from "element-ui";
const Login = {
	state: {
		isRegister: false,
		username: ""
	},
	mutations: {
		setUserName(state, username) {
			state.username = username;
		},
		setRegisterFlag(state, flag) {
			state.isRegister = flag;
		}
	},
	actions: {
		onLogin: function (context, payload) {
      console.log('payload.username' , payload.username)
      console.log('payload.password' , payload.password)
      //睡眠5s
      // var now = new Date();
      // var exitTime = now.getTime() + 5000;
      // while (true) {
      //   now = new Date();
      //   if (now.getTime() > exitTime){
      //     return;
      //   }
      // }

      console.log('0' )
			context.commit("setUserName", payload.username);

      var options = {
          user: payload.username,
          pwd: payload.password,
          appKey: WebIM.config.appkey
        };

			console.log('1' )

			WebIM.conn.open(options);
      console.log('2' )


      //localStorage.setItem("userInfo", JSON.stringify({ userId: payload.username}));
		},
    onLogin2: function (context, payload) {
      console.log('payload.username' , payload.username)
      console.log('payload.password' , payload.password)
      //睡眠5s
      // var now = new Date();
      // var exitTime = now.getTime() + 5000;
      // while (true) {
      //   now = new Date();
      //   if (now.getTime() > exitTime){
      //     return;
      //   }
      // }

      console.log('0' )
      context.commit("setUserName", payload.username);
      var options = {
        user: payload.username,
        pwd: payload.password,
        appKey: WebIM.config.appkey
      };
      console.log('1' )

     // WebIM.conn.open(options);
      console.log('2' )


      //localStorage.setItem("userInfo", JSON.stringify({ userId: payload.username}));
    },
		onLogout: function (context) {
      console.log('1111111111' )
			context.commit("setUserName", "");
			// localStorage.setItem("userInfo", "");
			// WebIM.conn.close();
      console.log('1111111111[[[' )

    },
		onRegister: function (context, payload) {
			const _this = this;
			// context.commit('setUserName', payload.username)
      console.log('信息' , payload)
			var options = {
				username: payload.username,
				password: payload.password,
				nickname: payload.nickname,
				appKey: WebIM.config.appkey,
				success: () => {
					Message({
						type: "success",
						message: "注册成功"
					});
					context.commit("setRegisterFlag", false);
				},
				error: (err) => {
					if (JSON.parse(err.data).error == "duplicate_unique_property_exists") {
						Message.error("用户已存在！")
					} else if (JSON.parse(err.data).error == "illegal_argument") {
						if (JSON.parse(err.data).error_description === 'USERNAME_TOO_LONG') {
                            return message.error('用户名超过64个字节！')
                        }
						Message.error("用户名不合法！")
					} else if (JSON.parse(err.data).error == "unauthorized") {
						Message.error("注册失败，无权限！")
					} else if (JSON.parse(err.data).error == "resource_limited") {
						Message.error("您的App用户注册数量已达上限,请升级至企业版！")
					}
				}
			};
			WebIM.conn.registerUser(options);
		},
		setRegisterFlag: function (context, flag) {
			const path = flag ? "/register" : "/login";
			Vue.$router.push(path);
			context.commit("setRegisterFlag", flag);
		}


	},
	getters: {

	}
};
export default Login;
