<template>

    <div style="height: 600px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>变更日志</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-steps direction="vertical" :active="1">
            <el-step title="步骤 1" icon="el-icon-edit"></el-step>
            <el-step title="步骤 2" icon="el-icon-upload"></el-step>
            <el-step title="步骤 3" icon="el-icon-picture" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="步骤 4" icon="el-icon-picture" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="步骤 5" icon="el-icon-picture" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="项目上线" icon="el-icon-picture" description="上线时间:2019-01-01"></el-step>
        </el-steps>
    </div>
</template>


<script>
    export default {
        layout: 'main',
        name:'change',
        data() {

        }
    }
</script>