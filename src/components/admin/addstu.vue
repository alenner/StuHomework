<template>
  <div><h1>添加学生信息</h1><hr>
      <form class="addstu" action="/admin/addstu" method="POST">
      <ul class="nav" style="height: 450px;margin-left: 20px">
        <li>学号：<input type="text" v-model="stuForm.id" style="margin-bottom: 20px;margin-top: 14px" autofocus></li>
        <li>姓名：<input type="text" v-model="stuForm.name" style="margin-bottom: 20px"></li>
        <li style="margin-bottom: 20px">班级：<input type="text" v-model="stuForm.class" style="width: 120px"></li>
        <li style="margin-bottom: 20px">年龄：<input type="text" v-model="stuForm.age" style="width: 45px" readonly></li>
        <li style="margin-bottom: 20px">
          性别：
          <label class="radio-inline">
              <input type="radio" style="top: 5px" v-model="stuForm.sex" value="男"> 男
            </label>
            <label class="radio-inline">
              <input type="radio" style="top: 5px" v-model="stuForm.sex" value="女"> 女
            </label>
          </li>
        <li style="margin-bottom: 20px">出生日期：<myDatepicker @change="changeTime" :date="stuForm.birth" :option="multiOption" :limit="limit"></myDatepicker></li>
        <li style="margin-bottom: 20px">联系电话：<input type="text" v-model="stuForm.phonenum" style="width: 160px"></li>
        <li style="margin-bottom: 20px">默认密码：<input type="text" v-model="stuForm.password" value="123456" style="width: 120px" readonly></li>
        <li><input type="hidden" v-model="stuForm.jobid" value="0"></li>
      </ul>
      <div class="item_bock head_p" style="position: absolute;top: 180px;left: 650px">
     <div v-if="avatarPreview !== ''" class="btn head_img" @click.stop="uploadAvatar">
       <img :src="avatarPreview" width="98px" height="148px"/>
     </div>
     <div v-else class="setting_right" @click.stop="uploadAvatar">
       <div class="caption" style="text-align: center;margin-top:45px"><span class="btn glyphicon glyphicon-plus" style="font-size:30px;color: #666666" aria-hidden="true"></span></div>
     </div>
     <div style="width: 100px;text-align: center"><span style="font-size:15px">（添加头像）</span></div>
     <input type="file" accept="image/*" name="avatar" @change="handleFile" class="hiddenInput"/>
   </div>
   <div class="submitTip" style="margin-top: 20px;margin-left: 20px">
      <div class="error-wrap">
        <span class="error error-show" v-show="errorTip1" style="float: left;color: red">添加失败，请确认数据是否完整</span>
      </div>
      <div class="error-wrap">
        <span class="error error-show" v-show="errorTip2" style="float: left;color: red">添加失败，不允许有重复的学号</span>
      </div><br>
      <button type="submit" class="btn btn-success" to="/admin/addstu" @click.prevent="addstu">确认添加</button>
      </div>
    </form>
    </div>
</template>

<script>
import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'

export default {
  name: 'addstu',
  components: { myDatepicker },
  data () {
    return {
      addsuccess: false,
      errorTip1: false,
      errorTip2: false,
      stuForm: {
        id: '',
        name: '',
        class: '',
        age: '',
        sex: '',
        birth: { time: '' },
        phonenum: '',
        password: '123456',
        avatar: '',
        jobid: '0'
      },
      multiOption: {
        type: 'min',
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        // format: 'YYYY-M-D HH:mm',
        format: 'YYYY-MM-DD',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'width': '160px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F',
          'margin': '0'
        },
        color: { // 字体颜色
          header: '#35acff', // 头部
          headerText: '#fff' // 头部文案
        },
        buttons: { // button 文案
          ok: '确定',
          cancel: '取消'
        },
        placeholder: '点击选取日期',
        dismissible: true
      },
      limit: [{
        type: 'weekday',
        available: [1, 2, 3, 4, 5, 6, 0]
      },
      {
        type: 'fromto',
        from: '1920-01-01',
        to: new Date().getTime()
      }],
      avatarPreview: ''
    }
  },
  methods: {
    addstu () {
      this.addsuccess = true
      let formData = new FormData()
      formData.append('avatar', this.stuForm.avatar)
      formData.append('id', this.stuForm.id)
      formData.append('jobid', this.stuForm.jobid)
      this.$http.post('/admin/addstu', {stuForm: this.stuForm}).then((response) => {
        this.$http.post('/admin/addavatar', formData).then((response) => {})
        var res = response.data
        if (res.status === 2) {
          this.errorTip1 = false
          this.errorTip2 = false
          alert('学生添加成功，可以在查删学生中查看')
          this.stuForm.id = this.stuForm.name = this.stuForm.class = this.stuForm.age = this.stuForm.sex = this.stuForm.birth = this.stuForm.phonenum = this.avatarPreview = ''
          this.$router.push('/admin/addstu').catch(err => { console.log(err) })
        } else if (res.status === 1) {
          this.errorTip1 = true
          this.errorTip2 = false
          this.addsuccess = false
        } else {
          this.errorTip1 = false
          this.errorTip2 = true
          this.addsuccess = false
        }
      })
    },
    changeTime () {
      let birthTime = new Date(this.stuForm.birth.time).getTime()
      let nowTime = new Date().getTime()
      this.stuForm.age = parseInt((nowTime - birthTime) / (365 * 24 * 60 * 60 * 1000))
      console.log(this.stuForm.age)
    },
    uploadAvatar () {
      this.$el.querySelector('.hiddenInput').click()
    },
    handleFile (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      this.stuForm.avatar = file
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.avatarPreview = res.result
      }
      reader.readAsDataURL(file)
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
    left: 35%;
    top:300px;
}

.row {
    padding-left: 330px;
    width: 1880px;
}

.head_img {
  width: 100px;
  height: 150px;
  border: 1px solid;
  padding: 0px;
  border-radius: 0px;
}

.setting_right {
  width: 100px;
  height: 150px;
  border: 1px solid;
}

.hiddenInput {
  display: none;
}
</style>
