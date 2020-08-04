<template>
  <div class="Updatepsw">
      <div class="navbar navbar-inverse navbar-fixed-top" id="top">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand">欢迎使用中学生作业管理平台！</a>
          </div>
        </div>
      </div>
    <div class="form-signin" id="login">
        当前密码：<input type="text" id="inputid" class="form-control" v-model="Updpsw.Oldpsw" autofocus><br>
        新的密码：<input type="password" id="inputPassword" class="form-control" v-model="Updpsw.Newpsw"><br>
        请再次输入新密码：<input type="password" id="inputPassword" class="form-control" v-model="Updpsw.NewpswAgain">
        <input type="hidden" v-model="Updpsw.jobId">
        <input type="hidden" v-model="Updpsw.Id">
          <div class="error-wrap">
            <span class="error error-show" v-show="errorTip1" style="float: left;color: red">修改失败，请确认当前密码是否正确</span>
            <span class="error error-show" v-show="errorTip2" style="float: left;color: red">修改失败，请确认新的密码是否一致</span>
          </div><br><br>
          <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="Updatepsw">确认修改</button>
          <router-link v-if="Updpsw.jobId === '0'" class="btn btn-lg btn-primary btn-block" to="/stu">返回个人主页</router-link>
          <router-link v-if="Updpsw.jobId === '1'" class="btn btn-lg btn-primary btn-block" to="/tch">返回个人主页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Updatepsw',
  data () {
    return {
      Updpsw: {
        Oldpsw: '',
        Newpsw: '',
        NewpswAgain: '',
        jobId: this.$store.getters.userJobid,
        Id: this.$store.getters.userId
      },
      errorTip1: false,
      errorTip2: false
    }
  },
  methods: {
    Updatepsw () {
      if (this.Updpsw.Newpsw === this.Updpsw.NewpswAgain) {
        this.$http.post('/Updatepsw', { Updpsw: this.Updpsw }).then((Response) => {
          var res = Response.data
          if (res.status === 1) {
            alert('修改成功，请点击回到登录界面')
            this.$router.push('/')
            this.errorTip1 = false
            this.errorTip2 = false
          } else {
            this.errorTip1 = true
            this.errorTip2 = false
          }
        })
      } else {
        this.errorTip1 = false
        this.errorTip2 = true
      }
    }
  }
}
</script>

<style scoped>
#top {
    width: 1880px;
}

.navbar {
    height: 50px;
}

.main {
    padding-top: 50px;
}
.col-sm-9 {
     width: 100%;
}

.form-signin {
    width: 200px;
    position: relative;
    left: 40%;
    top:300px;
}

.row {
    padding-left: 330px;
    width: 1880px;
}

.navbar-brand {
  color: aliceblue
}
</style>
