<template>
  <div id="app">
    <el-row :gutter="16" v-for="item in array" :key="item.url">
      <el-col :span="6">
        <div class="list-item" style="font-size: xx-large">{{ item.name }}</div>
      </el-col>
      <el-col :span="6">
        <div class="list-item">
          <el-button type="primary" plain @click="startVPN(item)">启动VPN</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="list-item">
          <el-button type="success" plain @click="gotoWebSite(item)">打开网站</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="list-item" :style="{'background-color': item.status ? '#67C23A':'#F56C6C'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let BASE_URL = 'http://192.168.233.100'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      array: [
        {
          name: '天坛',
          vpn: ':50000/tt',
          url: ':51000',
          ping: ':51000',
          status: false
        },
        {
          name: '天坛本地',
          vpn: ':50000/ttbd',
          url: ':52000/ETLReportServer',
          ping: ':52000',
          status: false
        },
        {
          name: '颐和园',
          vpn: ':50000/yhy',
          url: ':53000',
          ping: ':53000',
          status: false
        },
        {
          name: '颐和园本地',
          vpn: ':50000/yhybd',
          url: ':54000/YHYReport',
          ping: ':54000',
          status: false
        },
        {
          name: '香山',
          vpn: ':50000/xs',
          url: ':55000',
          ping: ':55000',
          status: false
        },
        {
          name: '动物园',
          vpn: ':50000/dwy',
          url: ':56000',
          ping: ':56000',
          status: false
        }
      ]
    }
  },
  created() {
    if (process.env.NODE_ENV === 'development') {
      BASE_URL = 'http://127.0.0.1'
    }
  },
  mounted() {
    this.checkStatus()
  },
  methods: {
    startVPN(item) {
      this.$http.get(BASE_URL + item.vpn).then(response => {
        console.log(response)
      }).catch(error => {
        this.$alert(error.response.data, '启动失败', {
          confirmButtonText: '确定',
          type: 'error',
          showClose: false
        });
      })
    },
    gotoWebSite(item) {
      window.open(BASE_URL + item.url, "_blank");
    },
    checkStatus() {
      for (let item of this.array) {
        this.$http.get(BASE_URL + item.ping).then(response => {
          if (response) {
            item.status = true
          }
        }).catch(error => {
          if (error) {
            item.status = false
          }
        })
      }
    }
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#app {
  margin: 64px;
}

.list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  margin: 16px 0;
}
</style>
