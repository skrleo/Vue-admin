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
                        <img class="qrcode"  v-if="robotInfo.HeadUrl" :src="robotInfo.HeadUrl" :alt="robotInfo.Uuid">
                        <img class="qrcode" v-else :src="robotInfo.QrBase64" :alt="robotInfo.Uuid">
                    </div>
                    <span class="qrcode-tip" v-if="robotInfo.HeadUrl">
                        <el-button type="primary" size="mini" style="margin-left:28px;"  @click="loginOut(robotInfo.WxId)">退出登录</el-button>
                    </span>
                    <span class="qrcode-tip" style="margin-left:28px;font-size:13px;" v-else-if="robotInfo.QrBase64">等待扫描登陆···</span>
                    <span class="qrcode-tip" v-else>
                        <el-button type="primary" size="mini" @click="getQrCode()">二维码过期,重新获取</el-button>
                    </span>
                </div>
                <div class="robot-info">
                    <span style="line-height:38px;">昵称：<el-link type="primary">{{robotInfo.NickName}}</el-link></span>
                    <span style="line-height:38px;">性别：<el-link type="primary">保密</el-link></span>
                    <span style="line-height:38px;">微信号: 
                        <el-link type="primary" v-if="robotInfo.Alias">{{robotInfo.Alias}}</el-link>
                        <el-link type="primary" v-else>设置微信号</el-link>
                    </span>
                    <span style="line-height:38px;">心跳状态: 
                        <el-link type="primary" v-if="robotInfo.Alias">开启</el-link>
                        <el-link type="primary" v-else>关闭</el-link>
                    </span>
                    <span style="line-height:38px;">抢红包状态: 
                        <el-link type="primary" v-if="robotInfo.Alias">开启</el-link>
                        <el-link type="primary" v-else>关闭</el-link>
                    </span>
                    <br/>
                    <span style="line-height:38px;">个性签名:</span><br/>
                    <span><el-button type="text">62登录</el-button></span>
                    <span><el-button type="text">修改密码</el-button></span>
                    <span><el-button type="text">摇一摇</el-button></span>
                    <span><el-button type="text">添加好友</el-button></span>
                    <span><el-button type="text">绑定邮箱</el-button></span>
                    <span><el-button type="text">修改资料</el-button></span>
                    <span><el-button type="text">批量添加好友</el-button></span>
                    <br/>
                    <span><el-button type="text">上传通讯录</el-button></span>
                    <span><el-button type="text">附近的人</el-button></span>
                    <span><el-button type="text">修改头像</el-button></span>
                    <span><el-button type="text">创建转账</el-button></span>
                    <span><el-button type="text">获取银行卡信息</el-button></span>
                    <span><el-button type="text">收款二维码</el-button></span>
                    <span><el-button type="text">生成自定义收款二维码</el-button></span>
                </div>
            </div>
        </div>
        
        <el-tabs type="border-card" style="margin-bottom:52px;">
            <el-tab-pane label="消息收发">
                <div>
                    <!--搜索框-->
                    <el-form :inline="true" style="float:left;" size="mini">
                        <el-form-item>
                            <el-button type="primary">初始化消息</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">获取用户信息</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">同步微信消息</el-button>
                        </el-form-item>
                        <el-form-item label="搜索好友">
                            <el-input placeholder="搜索好友"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="所属店铺">
                                <span>{{ props.row.shop }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.shopId }}</span>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="消息 ID"
                        prop="id">
                    </el-table-column>
                    <el-table-column
                        label="消息类型"
                        prop="id">
                    </el-table-column>
                    <el-table-column
                        label="接收人"
                        prop="id">
                    </el-table-column>
                    <el-table-column
                        label="消息内容"
                        prop="desc">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="好友与标签">
                <!--搜索框-->
                <el-form :inline="true" style="float:left;" size="mini">
                    <el-form-item>
                        <el-button type="primary">添加好友</el-button>
                    </el-form-item>
                    <el-form-item label="搜索好友">
                        <el-input placeholder="搜索好友"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="所属店铺">
                                <span>{{ props.row.shop }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.shopId }}</span>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="消息 ID"
                    prop="id">
                    </el-table-column>
                    <el-table-column
                    label="消息类型"
                    prop="id">
                    </el-table-column>
                    <el-table-column
                    label="接收人"
                    prop="id">
                    </el-table-column>
                    <el-table-column
                    label="消息内容"
                    prop="desc">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="微信群管理">
                <!--搜索框-->
                <el-form :inline="true" style="float:left;" size="mini">
                    <el-form-item>
                        <el-button type="primary">微信群发</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="所属店铺">
                                <span>{{ props.row.shop }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.shopId }}</span>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="消息 ID"
                        prop="id">
                    </el-table-column>
                    <el-table-column
                        label="消息类型"
                        prop="id">
                    </el-table-column>
                    <el-table-column
                        label="接收人"
                        prop="id">
                    </el-table-column>
                    <el-table-column
                        label="消息内容"
                        prop="desc">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="朋友圈管理">
                朋友圈管理
            </el-tab-pane>
            <el-tab-pane label="发单设置">
                <section>
                    <el-row class="panel panel-flat">
                        <el-row class="panel-body clearfix">
                            <el-form ref="role" :model="task" label-width="80px" size="medium">
                            <el-form-item label="任务名称" prop="name">
                                <el-input v-model="task.name" style="width:280px;"></el-input>
                            </el-form-item>
                            <el-form-item label="类型" prop="state">
                                <el-radio-group v-model="task.type">
                                <el-radio label="0">执行一次</el-radio>
                                <el-radio label="1">循环执行</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="时间间隔">
                                    <el-input placeholder="请输入间隔时间" v-model="task.interval" class="input-with-select" style="width:280px;">
                                        <el-select v-model="task.intervalType" slot="append" placeholder="秒">
                                        <el-option label="秒" value="0"></el-option>
                                        <el-option label="分" value="1"></el-option>
                                        <el-option label="时" value="2"></el-option>
                                        </el-select>
                                    </el-input>
                            </el-form-item>
                            <el-form-item label="起止时间" prop="state">
                                <el-date-picker
                                    v-model="task.beginTime"
                                    type="daterange"
                                    value-format="timestamp"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="执行任务" style="width:600px" prop="description">
                                <el-input v-model="task.action" style="width:280px;"></el-input>
                            </el-form-item>
                            <el-form-item label="备注" style="width:600px" prop="description">
                                <el-input type="textarea" v-model="task.description"></el-input>
                            </el-form-item>
                            <el-form-item size="mini">
                                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                            </el-form>
                        </el-row>
                    </el-row>
                </section>
            </el-tab-pane>
        </el-tabs>
    </div>
    
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  import Cookie from 'js-cookie'

  export default {
    layout: 'frame',
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
        const {data} = await axios.get(`/admin/robot/${params.id}`);
        return {
            robotInfo: data.data,
        }
    },
    data() {
      return {
        shortcuts:[],
        qrCode:'',
        robotInfo:[],
        robotInfo:[],
        desc:'荷兰优质淡奶，奶香浓而不腻',
        isCollapse:false,
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        task:{
          name: '',
          type: 0,
          interval: 0,
          intervaltype: 0,
          beginTime: 0,
          endTime: 0,
          action: '',
          description:''
        },
      }
    },
    methods: {
        getQrCode(){
            var _this = this
            var _this = this;
            axios.post('/admin/robot/login/getQrCode')
                .then(res => {
                    _this.robotInfo = res.data.data || [];
                    _this.checkLogin(_this.robotInfo.Uuid);
                });
        },
        checkLogin(uuid){
            var _this = this
            axios.post('/admin/robot/login/checkLogin',qs.stringify({
                uuid: uuid,
            }))
            .then(res => {
                if(res.data.code !== '0'){
                    setTimeout(function()  {
                        _this.checkLogin(uuid);
                    }, 30000);
                }
                _this.robotInfo = res.data.data || [];
            })
        },
        loginOut(wxId) {
            var _this = this
            axios.post('/admin/robot/login/loginOut',qs.stringify({
                wxId: wxId,
            }))
            .then(res => {
                if(res.data.errorId === 'OK'){
                    _this.$message({
                        message: '退出成功！',
                        type: 'success'
                    });  
                    _this.robotInfo = '';  
                }
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