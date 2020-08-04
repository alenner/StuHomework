<template>
  <div>
      <div class="tchmsg">
      <h1>老师个人信息</h1><hr>
      <div class="container" style="border:double;margin-top: 150px;padding-top:80px;height:440px;width: 900px;background-color:#fafafa">
            <div class="row" style="height: 80px;padding-left:80px">
                <div class="col-md-4" style="height: 80px">姓名：{{ tchMsg.name }}</div>
                <div class="col-md-4" style="height: 80px">工号：{{ tchMsg.id }}</div>
            <img :src="tchMsg.avatar" width="98px" height="148px" style="margin-left:80px;border:1px solid"/>
            </div>
            <div class="row" style="height: 80px;padding-left:80px">
            <div class="col-md-8" style="height: 80px">班级：<span v-for="(tchmsg,index) in tchMsg.class" :key="index"><span v-if="index !== tchMsg.class.length-1">{{ tchmsg.class }},</span><span v-else>{{ tchmsg.class }}</span></span></div>
            </div>
            <div class="row" style="height: 80px;padding-left:80px">
              <div class="col-md-3" style="height: 80px">科目：{{ tchMsg.subject }}</div>
              <div class="col-md-3" style="height: 80px">性别：{{ tchMsg.sex }}</div>
              <div class="col-md-2" style="height: 80px">年龄：{{ parseInt((new Date().getTime() - new Date(tchMsg.birth).getTime()) / (365 * 24 * 60 * 60 * 1000)) }}</div>
            </div>
            <div class="row" style="height: 80px;padding-left:80px">
                <div class="col-md-5" style="height: 80px">出生年月：{{ tchMsg.birth }}</div>
                <div class="col-md-4" style="height: 80px">联系电话：{{ tchMsg.phonenum }}</div>
            </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'tchmsg',
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
          console.log(this.tchMsg.avatar)
        } else {
          alert('无此老师')
        }
      })
    }
  }
}
</script>

<style>
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
