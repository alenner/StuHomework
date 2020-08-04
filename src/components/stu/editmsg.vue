<template>
  <div class="editmsg">
        <h1 class="form-signin-heading">编辑学生信息</h1><hr>
      <div class="container" style="border:double;margin-top: 150px;margin-left: 300px;padding-top:100px;height:450px;width: 900px;background-color:#fafafa">
            <div class="row" style="height: 100px;padding-left:100px">
                <div class="col-md-4" style="height: 100px"><span style="color: red">*</span>姓名：<input type="text" v-model="stuMsg.name" style="border-bottom-style:solid;width:100px" autofocus></div>
                <div class="col-md-4" style="height: 100px">学号：{{ stuMsg.id }}</div>
                <img :src="stuMsg.avatar" width="98px" height="148px" style="margin-left:80px"/>
            </div>
            <div class="row" style="height: 100px;padding-left:100px">
                <div class="col-md-3" style="height: 100px"><span style="color: red">*</span>班级：<input type="text" v-model="stuMsg.class" style="border-bottom-style:solid;width:80px"></div>
                <div class="col-md-4" style="height: 100px"><span style="color: red">*</span>性别：
          <label class="radio-inline">
              <input type="radio" v-model="stuMsg.sex" style="top: 4px" value="男">男
            </label>
            <label class="radio-inline">
              <input type="radio" v-model="stuMsg.sex" style="top: 4px" value="女"> 女
            </label>
            </div>
                <div class="col-md-2" style="height: 50px">年龄：{{ parseInt((new Date().getTime() - new Date(stuMsg.birth).getTime()) / (365 * 24 * 60 * 60 * 1000)) }}</div>
            </div>
            <div class="row" style="height: 50px;padding-left:100px">
                <div class="col-md-5" style="height: 50px"><span style="color: red">*</span>出生日期：<input type="text" v-model="stuMsg.birth" style="border-bottom-style:solid;width:150px"></div>
                <div class="col-md-5" style="height: 50px"><span style="color: red">*</span>联系电话：<input type="text" v-model="stuMsg.phonenum" style="border-bottom-style:solid;width:180px"></div>
            </div>
          <div class="btnShow" style="margin-top: 30px">
            <button type="submit" class="btn btn-success" to="/stu/stumsg" @click.prevent="updateStumsg" style="margin-left: 80px">确认修改</button>
            <span style="font-size: 13px;margin-left:450px">(若不可修改信息有误，请联系管理员)</span>
          </div>
      </div>
      <div class="error-wrap">
        <span class="error error-show" v-show="errorTip" style="float: left;color: red">修改失败，请确认数据是否完整</span>
      </div><br>
      </div>
</template>

<script>
export default {
  name: 'editmsg',
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
      if (isNaN(new Date(this.stuMsg.birth).getTime())) {
        alert('修改失败，请确认时间格式是否正确')
      } else {
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
}
</script>

<style scoped>
#top {
    width: 1980px;
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

</style>
