<template>
  <a-layout style="position: absolute;
	width: 100%;
	overflow: hidden;
	height: 100%;">
    <a-layout-header class="layout-header">
<!--      <div class="header">-->
<!--        <span class="setting" style="margin-left: 10px">-->
<!--          <a-dropdown>-->
<!--&lt;!&ndash;            <span class="ant-dropdown-link" href="#">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-icon type="setting" />&ndash;&gt;-->
<!--&lt;!&ndash;              <span class="username">{{userName}}</span>&ndash;&gt;-->
<!--&lt;!&ndash;              <span style="font-size: 30px">Chat</span>&ndash;&gt;-->
<!--&lt;!&ndash;            </span>&ndash;&gt;-->
<!--&lt;!&ndash;            <a-menu slot="overlay">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-menu-item @click="recEmedia">&ndash;&gt;-->
<!--&lt;!&ndash;                <a href="javascript:;">音视频录制</a>&ndash;&gt;-->
<!--&lt;!&ndash;              </a-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <a-menu-item @click="GetFirendBlack">&ndash;&gt;-->
<!--&lt;!&ndash;                <a href="javascript:;">好友黑名单</a>&ndash;&gt;-->
<!--&lt;!&ndash;              </a-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <a-menu-item @click="toLogout">&ndash;&gt;-->
<!--&lt;!&ndash;                <a href="javascript:;">退出</a>&ndash;&gt;-->
<!--&lt;!&ndash;              </a-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-menu>&ndash;&gt;-->
<!--          </a-dropdown>-->
<!--        </span>-->

<!--        <span class="setting">-->
<!--&lt;!&ndash;          <a-dropdown>&ndash;&gt;-->
<!--&lt;!&ndash;            <span class="ant-dropdown-link" href="#">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-icon type="plus-circle" />&ndash;&gt;-->
<!--&lt;!&ndash;            </span>&ndash;&gt;-->
<!--&lt;!&ndash;            <a-menu slot="overlay">&ndash;&gt;-->
<!--&lt;!&ndash;              <a-menu-item @click="ulClick('1')">&ndash;&gt;-->
<!--&lt;!&ndash;                <a href="javascript:;">添加好友</a>&ndash;&gt;-->
<!--&lt;!&ndash;              </a-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <a-menu-item @click="ulClick('2')">&ndash;&gt;-->
<!--&lt;!&ndash;                <a href="javascript:;">申请入群</a>&ndash;&gt;-->
<!--&lt;!&ndash;              </a-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <a-menu-item @click="ulClick('3')">&ndash;&gt;-->
<!--&lt;!&ndash;                <a href="javascript:;">创建群组</a>&ndash;&gt;-->
<!--&lt;!&ndash;              </a-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;            </a-menu>&ndash;&gt;-->
<!--&lt;!&ndash;          </a-dropdown>&ndash;&gt;-->

<!--        </span>-->
<!--      </div>-->

      <a-menu
        v-model="current"
        mode="horizontal"
        :defaultSelectedKeys="['contact']"
        :style="{ lineHeight: '50px', background: '#333', color: '#fff', textAlign: 'left'}"
        @click="contactTypeChange"
      >
        <a-menu-item key="contact">
<!--          <a-icon type="user" class="navMenu-icon" />-->
          <span class="navMenu-text">好友列表</span>
          <!-- 信息提示 -->
          <div class="tip-style" v-if="getUnread('contact').contact">&nbsp;</div>

<!--          <span style="font-size: 30px;color: #e5e9f2;margin-left: 800px" >Chat</span>-->
          <span style="font-size: 30px;color: #e5e9f2;margin-left: 450px" >Chat</span>
        </a-menu-item>
<!--        <a-menu-item key="group">-->
<!--          <a-icon type="team" class="navMenu-icon" />-->
<!--          <span class="navMenu-text">群组</span>-->
<!--          <div class="tip-style" v-if="getUnread('group').group">&nbsp;</div>-->
<!--        </a-menu-item>-->
<!--        <a-menu-item key="chatroom">-->
<!--          <a-icon type="usergroup-add" class="navMenu-icon" />-->
<!--          <span class="navMenu-text">聊天室</span>-->
<!--        </a-menu-item>-->


        <!--        <el-button @click="clickReturn">返回</el-button>-->
        <el-button icon="el-icon-close" circle @click="clickReturn" style="float: right"></el-button>
      </a-menu>
    </a-layout-header>

    <a-layout>
      <a-layout-sider
        style="background: #fff"
        :width="broken ? '100%' : 350"
        breakpoint="lg"
        collapsedWidth="0"
        :trigger="null"
        v-model="collapsed"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
      >
        <MessageBox :type="activeKey" :select="select" ref="messageBox" />
        <!-- <MessageBox v-if="activeKey == 'chatroom'"  type="chatroom" />
        <MessageBox v-if="activeKey == 'group'" type="group" />-->
      </a-layout-sider>

      <a-layout-content style="overflow: visible">
        <Message
          :type="activeKey"
          :broken="broken"
          :hideUserList="hideUserList"
          :showUserList="showUserList"
          ref="messageList"
          @EmediaModalFun="EmediaModalFun"
          @show_add_member_modal="show_add_member_modal"
        />

        <AddFriend ref="addFriendMethods" />
        <GetFriendRequest />
        <FirendBlack ref="firendModel" />
        <AddGroupUser ref="addGroupModel" />
        <CreateGroup ref="createGroupModel" />
        <VidoeSetting ref="videoSetting" />
        <GroupRequest />
        <GroupInvite />

        <EmediaModal ref="emediaModal" @changeIsVideoState="changeIsVideoState"/>
        <MultiAVModal :to="activedType[activeKey]" />
        <Call ref="call" @show_add_member_modal="show_add_member_modal"/>

        <AddAVMemberModal ref="addAvMembertModal" @EmediaModalFun="EmediaModalFun"/>
      </a-layout-content>
    </a-layout>
  </a-layout>


</template>

<script>
import Vue from "vue";
import MessageBox from "../../components/chat/index.vue";
import Message from "../../components/chat/message.vue";
import AddFriend from "../../components/addModal/addFriend.vue";
import GetFriendRequest from "../../components/addModal/getFriendRequest.vue";
import FirendBlack from "../../components/addModal/firendBlack.vue";
import AddGroupUser from "../../components/group/addGroupUser.vue";
import CreateGroup from "../../components/group/createGroup.vue";
import VidoeSetting from "../../components/videoSetting/index";
import GroupRequest from "../../components/group/groupRequest.vue";
import GroupInvite from "../../components/group/groupInvite.vue";

import EmediaModal from "../../components/emediaModal/index";
import MultiAVModal from "../../components/emediaModal/multiAVModal";
import Call from "../../components/call/index"; // 多人实现 1v1 通话
import AddAVMemberModal from "../../components/emediaModal/addAVMemberModal";

import "./index.less";
import {mapState, mapActions, mapGetters} from "vuex";
export default {
  data() {
    return {
      activedType: {
        contact: "",
        group: "",
        chatroom: ""
      },
      groupRead: false,
      contactRead: false,
      showSettingOptions: false,
      activeKey: "contact",
      selectedItem: "",
      showAddOptions: false,
      nowIsVideo:false,
      addList: [
        {
          name: "添加好友",
          id: "1",
          icon: "chat"
        },
        {
          name: "申请入群",
          id: "2",
          icon: "friends"
        },
        {
          name: "创建群组",
          id: "3",
          icon: "comment"
        }
      ],
      userName:
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).userId,
      collapsed: false,
      broken: false,
      current: ["contact"]
    };
  },
  computed: {
    chatList() {
      return this.$store.state.chat.msgList;
    },
    noticeCallMsg () { // 监听call组件收到IM 消息
        return this.$store.state.chat.noticeCallMsg
    },

  },
  watch:{
    noticeCallMsg (msg) { // 监听call组件收到IM 消息
        this.$refs.call.receivedMsg(msg)
    }
  },
  methods: {
    ...mapActions(["onLogout", "onGetFirendBlack", "initChatState","addfirend","onLogin2","acceptSubscribe"]),
    toLogout() {
      this.onLogout();
      this.initChatState();
    },
    onCollapse(collapsed, type) {
      console.log('onCollapse' )
      if (type != "responsive") {
        this.$data.collapsed = true;
      } else {
        this.$data.collapsed = false;
      }
    },
    onBreakpoint(broken) {
      console.log('this.$data.activeKey' , this.$data.activeKey)
      console.log('onBreakpoint'  )
      this.$data.broken = broken;
    },
     changeIsVideoState(v) {
      v ? (this.$data.nowIsVideo = true) : (this.$data.nowIsVideo = false);
    },

    EmediaModalFun(tos, callType){ // 单聊 | 群聊 都走这里
        // callType: 0 1v1音频, 1 1v1视频, 2 多人
        this.$refs.call.invite(tos, callType);
    },
    show_add_member_modal() {
        this.$refs.addAvMembertModal.show()
    },
    hideUserList() {
      this.$data.collapsed = true;
    },
    showUserList() {
      this.$data.collapsed = false;
    },
    select(i) {
      console.log('this.$data.activeKey' , this.$data.activeKey)
      console.log('select' , i)
      this.$refs.messageList.select(i);
      if (this.broken) {
        this.$data.collapsed = true;
      }
    },
    GetFirendBlack() {
      this.onGetFirendBlack();
      this.$refs.firendModel.changModel();
    },
    optionsVisibleChange() {
      this.$data.showSettingOptions = !this.$data.showSettingOptions;
    },
    contactTypeChange(type) {
      console.log('type' , type)
      this.$data.activeKey = type.key;
      this.$router.push(`/${type.key}`);
      if (this.broken && this.collapsed) {
        this.$data.collapsed = false;
      }

      switch (type.key) {
        case "contact":
          this.$refs.messageBox.onGetContactUserList();
          break;
        case "group":
          this.$refs.messageBox.onGetGroupUserList();
          break;
        case "chatroom":
          this.$refs.messageBox.onGetChatroomUserList();
          break;
        default:
          break;
      }
      this.$refs.messageList.getCurrentMsg(type.key);
    },
    addModalChange() {
      this.$data.showAddOptions = !this.$data.showAddOptions;
    },
    ulClick(i) {
      // this.addModalChange();
      switch (i) {
        case "1":
          this.$refs.addFriendMethods.changeModal();
          break;
        case "2":
          this.$refs.addGroupModel.changeGroupModel();
          break;
        case "3":
          this.$refs.createGroupModel.changeCreateModel();
          break;
        default:
          break;
      }
    },
    recEmedia() {
      this.$refs.videoSetting.show();
    },
    getUnread(type) {

      console.log('ggg' )
      const chatList = this.chatList[type];
      let obj = {
        contact: false,
        group: false
      };
      if (JSON.stringify(chatList) != "{}") {
        for (const item in chatList) {
          chatList[item].map((v, k) => {
            if (v.status === "unread") {
              if (v.chatType === "group") {
                obj.group = true;
              }
              if (v.chatType === "contact") {
                obj.contact = true;
              }
            }
            return obj;
          });
        }
      }
      return {
        contact: obj.contact,
        group: obj.group
      };
    },
    clickReturn(){

      location.href=localStorage.getItem('return_url')
    }
  },
  components: {
    MessageBox,
    Message,
    AddFriend,
    GetFriendRequest,
    FirendBlack,
    AddGroupUser,
    CreateGroup,
    VidoeSetting,
    GroupRequest,
    GroupInvite,
    EmediaModal,
    MultiAVModal,
    Call,
    AddAVMemberModal
  },
  mounted: function(){


    if (localStorage.getItem('zhoustatus')==='tongguo'){
      this.acceptSubscribe(JSON.parse(localStorage.getItem("relation")).requester);
      localStorage.setItem('zhoustatus','')
      localStorage.setItem("userInfo", JSON.stringify({ userId: JSON.parse(localStorage.getItem("relation")).requester }));
      location.href=`${process.env.VUE_APP_BASE_API}/login`
      console.log('11111111111111111111' )
    }else if (localStorage.getItem('zhoustatus')==='qingqiu'){
      console.log('22222222222222222222' )
      const option = {
        id: JSON.parse(localStorage.getItem("relation")).receiver,
        // params: this.$route.query.username
        params: JSON.parse(localStorage.getItem("relation")).requester
      };
      console.log('发请求'  )
      this.addfirend(option);


      //接收请求
      console.log('开始接收请求'  )

      console.log('接受请求者登陆'  )
      // await this.onLogin2({
      //   username: 'changlong',
      //   password: '123456'
      // });
      localStorage.setItem("userInfo", JSON.stringify({ userId: JSON.parse(localStorage.getItem("relation")).receiver }));
      localStorage.setItem('zhoustatus','tongguo')
      location.href=`${process.env.VUE_APP_BASE_API}/login`

      console.log('同意建立关系'  )
      //await this.acceptSubscribe('xiaohua');
      console.log('结束'  )
    }else {//定位到好友
      console.log('3333333333333333' )
      //this.$router.push("/contact/waimaixiaozi")
      console.log('定位========='  )
      let i = {
        jid:{
          appKey:'',
          // clientResource:'',
          domain:''
        },
        name:'',
        subscription:''
      };
      i.jid.appKey = "修改成自己的";
      i.jid.domain = "easemob.com";
      i.jid.name = JSON.parse(localStorage.getItem("relation")).requester;
      i.name = JSON.parse(localStorage.getItem("relation")).receiver;
      i.subscription = "both";

      console.log('i' , i)
      // this.$refs.messageList.select(i);
      this.$refs.messageBox.select2(i,JSON.parse(localStorage.getItem("relation")).receiver)


    }
 // this.contactTypeChange()
    console.log('4444444444444444444'  )
  //this.$refs.messageBox.onGetContactUserList();


  }



};
</script>
