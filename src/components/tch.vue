<template>
  <div class="index">
      <div class="navbar navbar-inverse navbar-fixed-top" id="top">
        <div class="container-fluid">
          <div class="navbar-header">
            <p class="navbar-brand" style="font-size: 30px;margin-top:8px">欢迎使用中学生作业管理平台！</p>
          </div>
          <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right" style="margin-top: 10px">
            <li><router-link to="/Updatepsw">[<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>修改密码]</router-link></li>
            <li><a class="btn" @click.prevent="showTip=true">[<span class="glyphicon glyphicon-off" aria-hidden="true"></span>注销登录]</a></li>
          </ul>
        </div>
        </div>
      </div>
      <div class="main">
          <div class="lead" style="margin-bottom: 0px">
            <div class="col-md-2" style="padding-right: 0px;padding-left: 0px;width: 250px;height: 870px;background-color: #f4f4f4">
            <ul class="nav nav-sidebar nav-stacked">
              <li v-if="tchmsglead === false"><a class="btn" style="color: #595959;font-size:20px;letter-spacing:5px;padding-left:30px" @click="showmsglead">
              <span class="glyphicon glyphicon-user" style="margin-right:10px" aria-hidden="true"></span>
              信息管理<span class="glyphicon glyphicon-menu-right" style="margin-left:30px" aria-hidden="true"></span></a></li>
              <li v-if="tchmsglead === true"><a class="btn" style="color: #595959;font-size:20px;letter-spacing:5px;padding-left:30px" @click="showmsglead">
              <span class="glyphicon glyphicon-user" style="margin-right:10px" aria-hidden="true"></span>
              信息管理<span class="glyphicon glyphicon-menu-down" style="margin-left:30px" aria-hidden="true"></span></a>
              <ul class="nav nav-sidebar nav-stacked">
                <li><router-link to="/tch/tchmsg" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">个人信息</router-link></li>
                <li><router-link to="/tch/editmsg" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">修改信息</router-link></li>
              </ul>
              </li>
              <li v-if="stuFormlead === false"><a class="btn" style="color: #595959;font-size:20px;letter-spacing:5px;padding-left:30px" @click="showstuFormlead">
                <span class="glyphicon glyphicon-education" style="margin-right:10px" aria-hidden="true"></span>
                学生管理<span class="glyphicon glyphicon-menu-right" style="margin-left:30px" aria-hidden="true"></span></a></li>
              <li v-if="stuFormlead === true"><a class="btn" style="color: #595959;font-size:20px;letter-spacing:5px;padding-left:30px" @click="showstuFormlead">
                <span class="glyphicon glyphicon-education" style="margin-right:10px" aria-hidden="true"></span>
                学生管理<span class="glyphicon glyphicon-menu-down" style="margin-left:30px" aria-hidden="true"></span></a>
              <ul class="nav nav-sidebar nav-stacked">
                <li><router-link to="/tch/stuForm" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">学生名单</router-link></li>
                <li><router-link to="/tch/stustatus" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">作业情况</router-link></li>
              </ul>
              </li>
              <li v-if="homeworklead === false"><a class="btn" style="color: #595959;font-size:20px;letter-spacing:5px;padding-left:30px" @click="showhomeworklead">
                <span class="glyphicon glyphicon-th-list" style="margin-right:10px" aria-hidden="true"></span>
                作业管理<span class="glyphicon glyphicon-menu-right" style="margin-left:30px" aria-hidden="true"></span></a></li>
              <li v-if="homeworklead === true"><a class="btn" style="color: #595959;font-size:20px;letter-spacing:5px;padding-left:30px" @click="showhomeworklead">
                <span class="glyphicon glyphicon-th-list" style="margin-right:10px" aria-hidden="true"></span>
                作业管理<span class="glyphicon glyphicon-menu-down" style="margin-left:30px" aria-hidden="true"></span></a>
              <ul class="nav nav-sidebar nav-stacked">
                <li><router-link to="/tch/designHwork" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">设计作业</router-link></li>
                <li><router-link to="/tch/publishHomework" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">发布作业</router-link></li>
                <li><router-link to="/tch/checkHomework" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">批改作业</router-link></li>
              </ul>
              </li>
            </ul>
            </div>
            <div class="row">
              <router-view></router-view>
            </div>
        </div>
        <div v-show="showTip">
        <div class="bckg">
        </div>
          <div class="content">
            <div class="text">
              <h3>是否注销登录？</h3>
            </div>
            <div class="buttontype">
              <button id="btn" type="button" class="btn btn-default btn-xs" @click="outLogin">确认</button>
              <button type="button" class="btn btn-default btn-xs" @click="showTip=false">取消</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'stu',
  data () {
    return {
      showTip: false,
      tchmsglead: false,
      stuFormlead: false,
      homeworklead: false
    }
  },
  methods: {
    outLogin () {
      this.$store.commit('LoginOut')
      alert('注销登录成功，点击返回登录界面')
      this.$router.push('/')
    },
    showmsglead () {
      if (this.tchmsglead === false) {
        this.tchmsglead = true
        this.stuFormlead = false
        this.homeworklead = false
      } else {
        this.tchmsglead = false
      }
    },
    showstuFormlead () {
      if (this.stuFormlead === false) {
        this.stuFormlead = true
        this.homeworklead = false
        this.tchmsglead = false
      } else {
        this.stuFormlead = false
      }
    },
    showhomeworklead () {
      if (this.homeworklead === false) {
        this.homeworklead = true
        this.stuFormlead = false
        this.tchmsglead = false
      } else {
        this.homeworklead = false
      }
    }
  }
}
</script>

<style scoped>
.index {
  height: 870px;
}

#top {
  width: 100%;
  height: 70px;
  float: left;
}

.navbar {
    height: 50px;
}

.main {
  margin-top: 73px;
}

.col-sm-9 {
     width: 100%;
}

.row {
    padding-left: 300px;
    width: 1880px;
}

.navbar-brand {
  color: aliceblue
}

.content {
  background-color: #fff;
  position: fixed;
  top: 30%;
  left: 40%;
  width: 300px;
  height:200px;
  border: 1px solid red;
  border-radius: 5px;
  padding: 10px 5px;
  z-index: 2
}

.bckg {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1
}

.text {
  color: red;
  text-align: center;
  padding-top: 15px;
  height: 70%;
}

.buttontype {
  float: right;
  padding-right: 30px;
}

#btn {
  margin-right: 15px;
}

li {
  list-style-type: none;
}
</style>
