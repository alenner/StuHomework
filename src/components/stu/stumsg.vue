<template>
  <div>
      <div class="stumsg">
      <h1>学生个人信息</h1><hr>
      <div class="container" style="border:double;margin-top: 150px;margin-left: 300px;padding-top:100px;height:450px;width: 900px;background-color:#fafafa">
            <div class="row" style="height: 100px;padding-left:100px">
                <div class="col-md-4" style="height: 100px">姓名：{{ stuMsg.name }}</div>
                <div class="col-md-4" style="height: 100px">学号：{{ stuMsg.id }}</div>
            <img :src="stuMsg.avatar" width="98px" height="148px" style="margin-left:80px"/>
            </div>
            <div class="row" style="height: 100px;padding-left:100px">
                <div class="col-md-3" style="height: 100px">班级：{{ stuMsg.class }}</div>
                <div class="col-md-2" style="height: 100px">性别：{{ stuMsg.sex }}</div>
                <div class="col-md-2" style="height: 100px">年龄：{{ parseInt((new Date().getTime() - new Date(stuMsg.birth).getTime()) / (365 * 24 * 60 * 60 * 1000)) }}</div>
            </div>
            <div class="row" style="height: 100px;padding-left:100px">
                <div class="col-md-5" style="height: 100px">出生年月：{{ stuMsg.birth }}</div>
                <div class="col-md-4" style="height: 100px">联系电话：{{ stuMsg.phonenum }}</div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stumsg',
  data () {
    return {
      errorTip: false,
      stuMsg: []
    }
  },
  mounted: function () {
    this.stumsg()
  },
  methods: {
    stumsg () {
      this.$http.post('/stu/stumsg', {id: this.$store.getters.userId}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          this.stuMsg = res.result
        } else {
          alert('无此学生')
        }
      })
    },
    updateStumsg () {
      this.$http.post('/stu/updateStumsg', {stuMsg: this.stuMsg}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          alert('修改成功，点击确认返回学生信息界面')
          this.stumsg()
        } else {
          this.errorTip = true
        }
      })
    }
  }
}
</script>

<style scoped>
#top {
    width: 100%;
}

.navbar {
    height: 50px;
}

.main {
    padding-top: 50px;
}
</style>
