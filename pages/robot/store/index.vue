<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>媒体管理</el-breadcrumb-item>
        <el-breadcrumb-item>发单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <div class="robot-card">
            <div class="robot-setting">
                <div class="home-card">
                    <div class="info">
                        <img class="qrcode"  v-if="loginInfo.HeadUrl" :src="loginInfo.HeadUrl" :alt="loginInfo.Uuid">
                        <img class="qrcode" v-else :src="robotInfo.QrBase64" :alt="robotInfo.Uuid">
                    </div>
                    <span class="qrcode-tip" v-if="loginInfo.HeadUrl">
                        <el-button type="primary" size="mini" style="margin-left:28px;"  @click="loginOut(loginInfo.WxId)">退出登录</el-button>
                    </span>
                    <span class="qrcode-tip" style="margin-left:28px;font-size:13px;" v-else-if="robotInfo.QrBase64">等待扫描登陆···</span>
                    <span class="qrcode-tip" v-else>
                        <el-button type="primary" size="mini" @click="getQrCode()">二维码过期,重新获取</el-button>
                    </span>
                </div>
                <div class="robot-info">
                    <span style="line-height:38px;">昵称：<el-link type="primary">{{loginInfo.NickName}}</el-link></span>
                    <span style="line-height:38px;">性别：
                        <span v-if="loginInfo.Sex === 1">男</span>
                        <span v-else-if="loginInfo.Sex === 2">女</span>
                        <span v-else>保密</span>
                    </span>
                    <span style="line-height:38px;">微信号: 
                        <el-link type="primary" v-if="loginInfo.Alias">{{loginInfo.Alias}}</el-link>
                        <el-link type="primary" v-else>设置微信号</el-link>
                    </span>
                    <span style="line-height:38px;">心跳状态:
                        <el-link type="primary" @click="closeHeartBeat(loginInfo.WxId)" v-if="loginInfo.HeartBeatState === 1">已启动</el-link>
                        <el-link type="primary" @click="startHeartBeat(loginInfo.WxId)" v-else>关闭</el-link>
                    </span>
                    <span style="line-height:38px;">抢红包状态: 
                        <el-link type="primary" @click="startRedEnvelopes(loginInfo.WxId)" v-if="loginInfo.RedEnvelopesState === 1">开启</el-link>
                        <el-link type="primary" @click="closeEnvelopes(loginInfo.WxId)" v-else>关闭</el-link>
                    </span>
                    <br/>
                    <span style="line-height:38px;">个性签名: <span style="font-size:14px;">{{loginInfo.Signature}}</span></span><br/>
                    <span><el-button type="text" @click="dialog62Login = true">62登录</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >修改密码</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >摇一摇</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >绑定邮箱</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >修改资料</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >批量添加好友</el-button></span>
                    <br/>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >上传通讯录</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >附近的人</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >修改头像</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >创建转账</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >获取银行卡信息</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >收款二维码</el-button></span>
                    <span><el-button type="text" @click="waitInface(loginInfo.WxId)" >生成自定义收款二维码</el-button></span>
                </div>
            </div>
        </div>
        <!--62登录弹窗-->
        <el-dialog
            title="微信62登录"
            :visible.sync="dialog62Login"
            width="23%"
            :before-close="handle62Login"
            center>
            <el-form :inline="true" style="float:left;" size="small">
                <el-form-item label="微信账号">
                    <el-input placeholder="请输入微信账号" clearable></el-input>
                </el-form-item>
                <el-form-item label="微信密码">
                    <el-input placeholder="请输入微信密码" show-password></el-input>
                </el-form-item>
                <el-form-item label="登录数据">
                    <el-input placeholder="请输入登录的62数据" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog62Login = false" size="medium">取 消</el-button>
                <el-button type="primary" @click="dialog62Login = false" size="medium">登 录</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  import Cookie from 'js-cookie'

  export default {
    layout: 'frame',
    data() {
      return {
        dialog62Login:false,
        shortcuts:[],
        qrCode:'',
        robotInfo:[],
        loginInfo:[]
      }
    },
    methods: {
        handle62Login(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        getQrCode(){
            var _this = this;
            axios.get('/admin/robot/login/getQrCode')
                .then(res => {
                    _this.robotInfo = res.data.data || [];
                    _this.checkLogin(_this.robotInfo.Uuid);
                });
        },
        checkLogin(uuid){
            var _this = this;
            axios.post('/admin/robot/login/checkLogin',qs.stringify({
                uuid: uuid,
            }))
            .then(res => {
                if(res.data.code === "402"){
                    setTimeout(function()  {
                        _this.checkLogin(uuid);
                    }, 10000);
                }
                _this.loginInfo = res.data.data || [];
            })
        },
        startHeartBeat(wxId){
            var _this = this;
            axios.post('/admin/robot/heartBeat/start',qs.stringify({
                wxId: wxId,
            }))
            .then(res => {
                if(res.data.errorId === 'OK'){
                    _this.$message({
                        message: '启动心跳成功！',
                        type: 'success'
                    });  
                    _this.loginInfo.HeartBeatState = 1;
                }
            })
        },
        closeHeartBeat(wxId){
            var _this = this;
            axios.post('/admin/robot/heartBeat/close',qs.stringify({
                wxId: wxId,
            }))
            .then(res => {
                if(res.data.errorId === 'OK'){
                    _this.$message({
                        message: '关闭心跳成功！',
                        type: 'success'
                    });  
                    _this.loginInfo.HeartBeatState = 0;
                }
            })
        },
        startRedEnvelopes(wxId){
            var _this = this;
            axios.post('/admin/robot/pay/startRedEnvelopes',qs.stringify({
                wxId: wxId,
            }))
            .then(res => {
                if(res.data.errorId === 'OK'){
                    _this.$message({
                        message: '启动自动抢红包！',
                        type: 'success'
                    });  
                    _this.loginInfo.RedEnvelopesState = 1;
                }
            })
        },
        closeRedEnvelopes(wxId){
            var _this = this;
            axios.post('/admin/robot/pay/closeRedEnvelopes',qs.stringify({
                wxId: wxId,
            }))
            .then(res => {
                if(res.data.errorId === 'OK'){
                    _this.$message({
                        message: '关闭自动抢红包！',
                        type: 'success'
                    });  
                    _this.loginInfo.RedEnvelopesState = 0;
                }
            })
        },
        loginOut(wxId) {
            var _this = this;
            axios.post('/admin/robot/login/loginOut',qs.stringify({
                wxId: wxId,
            }))
            .then(res => {
                if(res.data.errorId === 'OK'){
                    _this.$message({
                        message: '退出成功！',
                        type: 'success'
                    });  
                    _this.loginInfo = '';  
                }
            });
        },
        updateHeadImage(wxId,headImageUrl) {
            var _this = this;
            axios.post('/admin/robot/user/updateHeadImage',qs.stringify({
                wxId: wxId,
                headImageUrl:headImageUrl
            }))
            .then(res => {
                if(res.data.errorId === 'OK'){
                    _this.$message({
                        message: '修改头像成功！',
                        type: 'success'
                    });  
                }
            });
        },
        waitInface(wxId) {
            var _this = this;
            _this.$message({
                message: '接口待对接！',
                type: 'success'
            });  
        }
    }
  }
</script>

<style  scoped lang="scss">

    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .robot-card{
        border: 1px solid #E4E4E4;
        margin-bottom: 12px;
    }

    .robot-setting{
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        .home-card {
            color: #414040;
            padding: 8px 8px;
            width: 160px;
            .info{
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 4px 7px;
                align-items: flex-start;
                border-style: solid;
                border-width: 1px;
                border-color: #E4E4E4;
                .qrcode {
                    display: inline-block;
                    width: 144px;
                    height: 144px;
                    margin: 0;
                    padding: 0;
                }
                
            }
            .qrcode-tip{
                display: inline-block;
                font-size: 12px;
                color: #414040;
                text-align: center;
                padding: 12px 8px;
            }
            
        } 
        .robot-info{
            display: inline-block;
            padding: 21px 3px; 
            color: #414040;
            span{
                margin-right: 18px;
            }
        }
    }

</style>