<template>
    <div class="chat" v-show="this.shows">
        <div class="chat-left">
            <div class="chat-left-main"
            :class="{'active' : activeIndex == index}"
            v-for="(item,index) in userList"
            :key="index"
            @click="handleUserList(index)">
                <img :src="'https://st.elongtian.com' + item.headimg" alt="">
                <div class="user-info">
                    <div class="title">
                        <span v-if="item.realname" class="tit">{{item.realname}}</span>
                        <span class="time">{{item.send_time}}</span>
                    </div>
                    <div class="info">{{item.content}}</div>
                </div>
            </div>
        </div>
        <div class="chat-right">
            <div class="chat-top">
                <span v-if="userList[activeIndex]" class="chat-top-title">{{userList[activeIndex].realname}}</span>
                <i class="el-icon-close chat-top-close" @click="close"></i>
            </div>
            <div class="chat-content" ref="chat-content">
                <!-- 左侧聊天气泡 -->
                <div :class="item.is_my == 1 ? 'chat-content-right' : 'chat-content-left'"  v-for="(item,index) in chatLeftData"
                    :key="index">
                    <div class="chat-list-left" :class="item.is_my == 1 ? 'chat-list-right' : ''">
                        <img v-if="item.is_my == 0" :src="'https://st.elongtian.com' +  item.headimg" alt="">
                        <div :class="item.is_my == 1 ? 'chatBox2' : 'chatBox'">{{item.content}}</div>
                        <img v-if="item.is_my == 1" :src="'https://st.elongtian.com' +  item.headimg" alt="">
                    </div>
                </div>

            </div>
            <div class="chat-send">
                <el-input v-model="textarea" type="textarea" @keyup.enter.native="send" :rows="5" placeholder="请说明情况"></el-input>
                <el-button type="" class="send" @click="send">发送</el-button>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name:"chat",
    components: {
    },
    props: {
        shows: {
            type: Boolean,
            default: true
        },
        userList: {
            type: Array,
            default: []
        },
        activeIndex: {
            type: String
        },
        chatLeftData: {
            type: Array,
            default: []
        }
    },
    data () {
      return {
          textarea:'',
          chatTitle: '',
          index: this.activeIndex
      }
    },
    computed: {
    },
    watch: {
        shows(){
            this.$utils.setloc('showFlage',this.shows)
            if (this.shows == true) {
                this.scrollBottm()
            }
        },
        chatLeftData(){
             this.scrollBottm()
        },
        activeIndex(){
            this.index = this.activeIndex
        }
    },
    created(){

    },
    methods: {
        //点击左侧用户
        handleUserList(index){
             let self = this
             self.index = index
             let index_i = index.toString()
            self.$store.commit('setActiveIndex', index_i)
            self.getContList()
        },
        scrollBottm() {
            let el = this.$refs["chat-content"];
            this.$nextTick(() => {
                el.scrollTop = el.scrollHeight
            })
        },
        //点击关闭弹窗
        close(){
			 let self = this
            self.$store.commit("yincang")

        },
        //发送
        send(){
           let self = this
           if (self.textarea.replace(/\s*/g,"") == '') {
               self.textarea = ''
               return false
           }
           self.$api.postTall(
               '/sendmessage',
               {
                   to_member_id: self.userList[self.index].another_id,
                   content: self.textarea
               },
               r =>{
                   self.textarea = ''
                   self.getContList()
                   self.scrollBottm()
               }
           )
        },
        getContList(){
            let self = this

            self.$api.getTall(
                '/getChatMessage',
                {
                chat_id:self.userList[self.index].chat_id,
                page: 1
                },
                r =>{
                self.$store.commit('setChatLeftData', r.data.list)
            })
        }
    },
    created () {
    },
    mounted () {
    },
  }
</script>
<style lang="less" scoped>
.active{
    background:rgba(215,215,215,1);
}
.chat{
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
    display: flex;
    width:750px;
    height:650px;
    background:rgba(252,252,252,1);
    border:2px solid rgba(237,235,235,1);
    box-shadow:-1px 3px 16px 0px rgba(0, 0, 0, 0.25);
    border-radius:3px;
    overflow: hidden;
    // 左侧
    .chat-left{
        box-sizing: border-box;
        width:200px;
        height:650px;
        background:rgba(239,236,236,1);
        border-radius:3px;
        padding-top: 52px;
        overflow: auto;
        .chat-left-main{
            display: flex;
            padding: 10px;
            img{
                width:56px;
                height:53px;
                border-radius:3px;
                margin-right: 5px;
                border-radius: 50%;
            }
            .user-info{
                .title{
                    .tit{
                        font-size:16px;
                        font-weight:bold;
                        color:rgba(102,102,102,1);
                        line-height:26px;
                    }
                    .time{
                        font-size:14px;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                        line-height:26px;
                    }
                }
                .info{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    line-height:26px;
                }
            }
        }
    }

    // 右侧
    .chat-right{
        flex: 1;
        position: relative;
        box-sizing: border-box;
        .chat-top{
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height:52px;
            background:rgba(255,255,255,1);
            border-bottom:1px solid rgba(229,229,229,1);
            border-radius:3px;
            padding: 0 15px;
            .chat-top-title{
                font-size:18px;
                font-weight:bold;
                color:rgba(102,102,102,1);
                line-height:26px;
            }
            .chat-top-close{
                font-size: 26px;
                font-weight: bold;
                color: rgba(233,233,233,1);
                cursor: pointer;
            }
        }
        // 聊天内容区域
        .chat-content{
            overflow-y: auto;
            height: 450px;
            // display: flex;
            .chat-list-right{
                justify-content: flex-end;
            }
            .chat-list-left{
                display: flex;
                padding: 20px;
                img{
                    width:44px;
                    height:43px;
                    border-radius:3px;
                    box-shadow: 0 0 2px #ccc;
                    border-radius: 50%;
                }
                .chatBox{
                    position: relative;
                    top:0px;
                    left:20px;
                    width:220px;
                    // height:54px;
                    background: #fff;
                    -moz-border-radius: 3px;
                    -webkit-border-radius: 3px;
                    border-radius: 3px;
                    color: #666666;
                    padding: 5px;
                    text-align: justify;
                    box-shadow: 0 0 2px #ccc;
                }
                .chatBox2{
                    position: relative;
                    top:0px;
                    right:20px;
                    width:220px;
                    // height:54px;
                    background: #12E567;
                    -moz-border-radius: 3px;
                    -webkit-border-radius: 3px;
                    border-radius: 3px;
                    color: #666666;
                    padding: 5px;
                    text-align: justify;
                    box-shadow: 0 0 2px #ccc;
                }
                .chatBox:before{
                    position: absolute;
                    content: "";
                    width: 0;
                    height: 0;
                    right: 100%;
                    top: 20px;
                    border-top: 6px solid transparent;
                    border-right: 15px solid #ccc;
                    border-bottom: 6px solid transparent;
                }
                .chatBox2:before{
                    position: absolute;
                    content: "";
                    width: 0;
                    height: 0;
                    left: 100%;
                    top: 20px;
                    border-top: 6px solid transparent;
                    border-right: 13px solid #12E567;
                    border-bottom: 6px solid transparent;
                    transform: rotate(180deg); /*顺时针旋转90°*/
                }
                .chatBox:after{
                    position: absolute;
                    content: "";
                    width: 0;
                    height: 0;
                    right: 100%;
                    top: 20px;
                    border-top: 6px solid transparent;
                    border-right: 13px solid #fff;
                    border-bottom: 6px solid transparent;
                    // border-width: 10px;
                    // border-style: solid;
                    // border-color: transparent #fff transparent transparent;
                    // transform: rotate(90deg); /*顺时针旋转90°*/


                }
            }
        }

        // 输入框发送区域
        .chat-send{
            position: absolute;
            bottom:0px;
            width: 100%;
            .el-input--small {
                height: auto;
            }
            .send{
                position: absolute;
                bottom:15px;
                right: 30px;
                width: 20%;
            }
        }
    }
}
</style>
<style lang="less">
    .chat-send{
        .el-textarea__inner{
                resize: none!important;
            }
    }
</style>
