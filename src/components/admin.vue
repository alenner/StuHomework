<template>
  <div>
      <div class="navbar navbar-inverse navbar-fixed-top" id="top">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" style="font-size: 30px;margin-top:8px">欢迎使用中学生作业管理平台！</a>
          </div>
          <div class="navbar-collapse collapse" style="margin-top: 10px">
          <ul class="nav navbar-nav navbar-right">
            <li><a class="btn" @click.prevent="showTip=true">[<span class="glyphicon glyphicon-off" aria-hidden="true"></span>注销登录]</a></li>
          </ul>
        </div>
        </div>
      </div>
          <div class="main" id="admin">
          <div class="lead" style="margin: 0px">
            <div class="col-md-2" style="padding-right: 0px;padding-left: 0px;width: 250px;height: 870px;background-color: #f4f4f4">
            <ul class="nav nav-sidebar nav-stacked">
              <li v-if="addlead === false"><a class="btn" style="color: #595959;font-size:20px;letter-spacing:5px;padding-left:30px" @click="showaddlead">
              <span class="glyphicon glyphicon-user" style="margin-right:10px" aria-hidden="true"></span>
              添加师生<span class="glyphicon glyphicon-menu-right" style="margin-left:30px" aria-hidden="true"></span></a></li>
              <li v-if="addlead === true"><a class="btn" style="color: #595959;font-size:20px;letter-spacing:5px;padding-left:30px" @click="showaddlead">
              <span class="glyphicon glyphicon-user" style="margin-right:10px" aria-hidden="true"></span>
              添加师生<span class="glyphicon glyphicon-menu-down" style="margin-left:30px" aria-hidden="true"></span></a>
              <ul class="nav nav-sidebar nav-stacked">
                <li><router-link to="/admin/addstu" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">添加学生</router-link></li>
                <li><router-link to="/admin/addtch" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">添加教师</router-link></li>
              </ul>
              </li>
              <li v-if="editlead === false"><a class="btn" style="color: #595959;font-size:20px;letter-spacing:5px;padding-left:30px" @click="showeditlead">
                <span class="glyphicon glyphicon-th-list" style="margin-right:10px" aria-hidden="true"></span>
                师生管理<span class="glyphicon glyphicon-menu-right" style="margin-left:30px" aria-hidden="true"></span></a></li>
              <li v-if="editlead === true"><a class="btn" style="color: #595959;font-size:20px;letter-spacing:5px;padding-left:30px" @click="showeditlead">
                <span class="glyphicon glyphicon-th-list" style="margin-right:10px" aria-hidden="true"></span>
                师生管理<span class="glyphicon glyphicon-menu-down" style="margin-left:30px" aria-hidden="true"></span></a>
              <ul class="nav nav-sidebar nav-stacked">
                <li><router-link to="/admin/csxs" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">查删学生</router-link></li>
                <li><router-link to="/admin/csjs" style="color: #595959;font-size:15px;letter-spacing:5px;padding-left:30px">查删教师</router-link></li>
              </ul>
              </li>
            </ul>
            </div>
            <div class="row" style="margin: 0px">
              <router-view></router-view>
            </div>
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
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
      showTip: false,
      addlead: false,
      editlead: false
    }
  },
  methods: {
    outLogin () {
      this.$store.commit('LoginOut')
      alert('注销登录成功，点击返回登录界面')
      this.$router.push('/')
    },
    showaddlead () {
      if (this.addlead === false) {
        this.addlead = true
        this.editlead = false
      } else {
        this.addlead = false
      }
    },
    showeditlead () {
      if (this.editlead === false) {
        this.addlead = false
        this.editlead = true
      } else {
        this.editlead = false
      }
    }
  }
}
</script>

<style scoped>
#top {
  width: 100%;
  height: 70px;
  float: left;
}

.navbar {
    height: 50px;
}

.main {
    padding-top: 70px;
}
.col-sm-9 {
     width: 100%;
}

.row {
    padding-left: 300px;
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
</style>
