<template>
  <div class="index">
    <div class="navbar navbar-inverse navbar-fixed-top" id="top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" style="font-size: 30px;margin-top:8px">欢迎使用中学生作业管理平台！</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li style="margin-top: 10px"><router-link to="/">返回操作请点此处>>></router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container" id="login">
      <div class="loginForm"></div>
      <div class="welcomeshow">
        <h2 style="font-weight: 700">欢迎登录</h2>
        <h5>中学生作业管理系统</h5>
      </div>
      <form class="form-signin" action="/" method="POST" style="color: black">
        <input type="text" id="inputid" placeholder="账号" v-model="loginForm.id" style="border-style:none; border-bottom: #999999 2px solid; width: 200px;height: 50px;font-size: 17px" autofocus>
        <input type="password" id="inputPassword" style="border-style:none; border-bottom: #999999 2px solid; width: 200px;height: 50px;font-size: 17px" placeholder="密码" v-model="loginForm.password"><br><br>
          <div class="error-wrap">
            <span class="error error-show" v-show="errorTip" style="float: left;color: red">用户名或者密码错误</span>
          </div>
          <button class="btn btn-ms btn-primary btn-block" type="submit" style="background-color: rgb(79, 107, 85); width: 70px; margin: 20px 0 0 120px" @click.prevent="admlogin" :loading="loading">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminlog',
  data () {
    return {
      loading: false,
      errorTip: false,
      loginForm: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    admlogin () {
      this.loading = true
      this.$http.post('/adminLogin', {loginForm: this.loginForm}).then((response) => {
        var res = response.data
        console.log('res' + res.result.id)
        if (res.status === 1) {
          this.errorTip = false
          alert('管理员登录成功' + res.result.id)
          this.$router.push('/admin')
        } else {
          this.errorTip = true
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
.index {
  height: 944px;
}

#top {
  width: 100%;
  height: 7%;
  float: left;
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
  left: 58%;
  top: 360px;
}

.row {
    padding-left: 330px;
    width: 1880px;
}

.navbar-brand {
  color: aliceblue
}

#login {
  background-image: url('../assets/images/loginbg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 93%;
  margin-top: 3.4%;
  float: left;
}

.loginForm {
  background-color: rgb(255, 254, 254);
  position: absolute;
  top: 37.2%;
  left: 36.2%;
  width: 36%;
  height: 30%;
  z-index: 0;
}

.welcomeshow {
  background-color: rgb(79, 107, 85);
  color: aliceblue;
  position: absolute;
  top: 37.2%;
  left: 36.2%;
  width: 18%;
  height: 30%;
  padding-top: 80px;
  padding-left: 30px;
}

</style>
