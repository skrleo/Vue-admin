<template>
  <div>
    <div class="banner">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>快捷方式</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>代办事件</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>网站配置</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>网站访问量</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <ve-line :data="chartData"></ve-line>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>日均PV量</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <ve-line :data="chartData"></ve-line>
          </el-card>
        </el-col>
      </el-row>
    </div>
</div>
</template>
<script>
  export default {
    layout: 'main',
    data() {
      return {
        chartData: {
          columns: ['日期', '访问用户', '注册用户', '下单率'],
          rows: [
            { '日期': '星期日', '访问用户': 393, '注册用户': 43, '下单率': 78 },
            { '日期': '星期一', '访问用户': 193, '注册用户': 13, '下单率': 32 },
            { '日期': '星期二', '访问用户': 330, '注册用户': 30, '下单率': 26 },
            { '日期': '星期三', '访问用户': 223, '注册用户': 23, '下单率': 76 },
            { '日期': '星期四', '访问用户': 123, '注册用户': 13, '下单率': 49 },
            { '日期': '星期五', '访问用户': 392, '注册用户': 32, '下单率': 323 },
            { '日期': '星期六', '访问用户': 153, '注册用户': 42, '下单率': 508 },
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>