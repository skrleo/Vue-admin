<template>
    <div id="app">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <!--搜索框-->
        <el-form :inline="true" :model="formInline" style="float:left;" size="small">
            <el-form-item label="审批人">
                <el-input placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!--表格数据及操作-->
        <el-table :data="tableData" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
            <!--勾选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引-->
            <el-table-column prop="name" label="用户账号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="备注信息">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt | d('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <nuxt-link :to="{name:'artcle-id',params:{ id: scope.row.artcleId }}">
                        <el-button type="info" icon="el-icon-edit" size="mini">详情</el-button>
                    </nuxt-link>
                    <nuxt-link :to="{name:'artcle-id',params:{ id: scope.row.artcleId }}">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    </nuxt-link>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <!--分页条-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNow"
            :page-sizes="[10, 50, 100, 150]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageCount">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        layout: 'main',
        name:'artcle',
        data() {
            return {
                //表格数据
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                //查询输入框数据
                input: '',
                //导航条默认选项
                activeIndex: '1',
                activeIndex2: '1'
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            indexMethod(index) {
                return index;
            },
            addUser() {
                this.$prompt('请输入邮箱', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                this.$message({
                    type: 'success',
                    message: '你的邮箱是: ' + value
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
                });
            }
        }
    }
</script>
<style>
    #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }
</style>