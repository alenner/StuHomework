<template>
  <div class="editmsg">
        <h1 class="form-signin-heading">编辑老师信息</h1><hr>
      <div class="container" style="border:double;margin-top: 150px;padding-top:80px;height:440px;width: 900px;background-color:#fafafa">
            <div class="row" style="height: 80px;padding-left:80px">
                <div class="col-md-4" style="height: 80px"><span style="color: red">*</span>姓名：<input type="text" v-model="tchMsg.name" style="border-bottom-style:solid;width:100px" autofocus></div>
                <div class="col-md-4" style="height: 80px">工号：{{ tchMsg.id }}</div>
            <img :src="tchMsg.avatar" width="98px" height="148px" style="margin-left:80px;border:1px solid"/>
            </div>
            <div class="row" style="height: 80px;padding-left:80px">
            <div class="col-md-8" style="height: 80px">班级：<span v-for="(tchmsg,index) in tchMsg.class" :key="index"><span v-if="index !== tchMsg.class.length-1">{{ tchmsg.class }},</span><span v-else>{{ tchmsg.class }}</span></span></div>
            </div>
            <div class="row" style="height: 80px;padding-left:80px">
              <div class="col-md-2" style="height: 80px">科目：{{ tchMsg.subject }}</div>
              <div class="col-md-4" style="height: 80px"><span style="color: red">*</span>性别：
          <label class="radio-inline">
              <input type="radio" v-model="tchMsg.sex" value="男" style="top: 5px"> 男
            </label>
            <label class="radio-inline">
              <input type="radio" v-model="tchMsg.sex" value="女" style="top: 5px"> 女
            </label></div>
              <div class="col-md-2" style="height: 80px"><span style="color: red"></span>年龄：{{ parseInt((new Date().getTime() - new Date(tchMsg.birth).getTime()) / (365 * 24 * 60 * 60 * 1000)) }}</div>
            </div>
            <div class="row" style="height: 60px;padding-left:80px">
                <div class="col-md-5" style="height: 60px"><span style="color: red">*</span>出生日期：<input type="text" v-model="tchMsg.birth" style="border-bottom-style:solid;width:150px"></div>
                <div class="col-md-5" style="height: 60px"><span style="color: red">*</span>联系电话：<input type="text" v-model="tchMsg.phonenum" style="border-bottom-style:solid;width:150px"></div>
            </div>
      <button type="submit" class="btn btn-success" to="/stu/tchmsg" @click.prevent="updateTchmsg" style="margin-left: 80px">确认修改</button><span style="font-size: 13px;margin-left:450px">(若不可修改信息有误，请联系管理员)</span>
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
      tchMsg: {}
    }
  },
  mounted: function () {
    this.tchmsg()
  },
  methods: {
    tchmsg () {
      this.$http.post('/tch/tchmsg', {id: this.$store.getters.userId}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          this.tchMsg = res.result
        } else {
          alert('无此老师')
        }
      })
    },
    updateTchmsg () {
      if (isNaN(new Date(this.tchMsg.birth).getTime())) {
        alert('修改失败，请确认时间格式是否正确')
      } else {
        this.$http.post('/tch/updateTchmsg', {tchMsg: this.tchMsg}).then((response) => {
          var res = response.data
          if (res.status === 1) {
            alert('修改成功，点击确认返回老师信息界面')
            this.tchmsg()
          } else {
            this.errorTip = true
          }
        })
      }
    }}
}
</script>

<style scoped>
#top {
    width: 1980px;
}

.navbar {
    height: 50px;
}

.col-sm-9 {
     width: 100%;
}
</style>
