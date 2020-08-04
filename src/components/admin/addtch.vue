<template>
  <div><h1>添加教师信息</h1><hr>
      <form class="addstu" action="/admin/addtch" method="POST">
      <ul class="nav" style="height: 450px;margin-left: 20px;margin-top: 30px">
        <li>工号：<input type="text" v-model="tchForm.id" style="margin-bottom: 20px" autofocus></li>
        <li>姓名：<input type="text" v-model="tchForm.name" style="margin-bottom: 20px"></li>
        <li>科目：<input type="text" v-model="tchForm.subject" style="margin-bottom: 20px"></li>
        <li style="margin-bottom: 20px">性别：
          <label class="radio-inline">
              <input type="radio" style="top: 5px" v-model="tchForm.sex" value="男"> 男
            </label>
            <label class="radio-inline">
              <input type="radio" style="top: 5px" v-model="tchForm.sex" value="女"> 女
            </label>
          </li>
        <li><span style="float: left">班级：</span><div class="addClass" v-for="(form, index) in tchForm.classForm" :key="index"><input type="text" v-model="form.class" style="width: 150px;margin-right: 10px;width: 100px">
        <button type="button" class="btn btn-default btn-xs" style="border: 0px" @click="tchForm.classForm.splice(index,1)"><span class="glyphicon glyphicon-minus-sign" style="color: red;font-size: 15px" aria-hidden="true"></span></button>
        </div>
        <button type="button" class="btn btn-default btn-xs" style="border: 0px" @click="addClass"><span class="glyphicon glyphicon-plus-sign" style="color: blue;font-size: 15px;top: 4px" aria-hidden="true"></span></button>
        </li><br>
        <li>年龄：<input type="text" v-model="tchForm.age" style="margin-bottom: 20px;width: 35px" readonly></li>
        <li style="margin-bottom: 20px">出生日期：<myDatepicker @change="changeTime" :date="tchForm.birth" :option="multiOption" :limit="limit"></myDatepicker></li>
        <li>联系电话：<input type="text" v-model="tchForm.phonenum" style="margin-bottom: 20px;width: 160px"></li>
        <li>默认密码：<input type="text" v-model="tchForm.password" style="margin-bottom: 20px;width: 80px" readonly></li>
        <li><input type="hidden" v-model="tchForm.jobid" value="1"></li>
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
   <div class="submitTip" style="margin-top: 50px;margin-left: 20px">
      <div class="error-wrap">
        <span class="error error-show" v-show="errorTip1" style="float: left;color: red">添加失败，请确认数据是否完整</span>
      </div>
      <div class="error-wrap">
        <span class="error error-show" v-show="errorTip2" style="float: left;color: red">添加失败，不允许有重复的工号</span>
      </div><br>
      <button type="submit" class="btn btn-success" to="/admin/addtch" @click.prevent="addtch">确认添加</button>
      </div>
    </form>
    </div>
</template>

<script>
import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'

export default {
  name: 'addtch',
  components: { myDatepicker },
  data () {
    return {
      addsuccess: false,
      errorTip1: false,
      errorTip2: false,
      tchForm: {
        id: '',
        name: '',
        classForm: [],
        subject: '',
        age: '',
        sex: '',
        birth: { time: '' },
        phonenum: '',
        password: '123456',
        avatar: '',
        jobid: '1'
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
  mounted () {
    this.addClass()
  },
  methods: {
    addClass () {
      this.tchForm.classForm.push({class: ''})
    },
    changeTime () {
      let birthTime = new Date(this.tchForm.birth.time).getTime()
      let nowTime = new Date().getTime()
      this.tchForm.age = parseInt((nowTime - birthTime) / (365 * 24 * 60 * 60 * 1000))
    },
    uploadAvatar () {
      this.$el.querySelector('.hiddenInput').click()
    },
    handleFile (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      this.tchForm.avatar = file
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.avatarPreview = res.result
      }
      reader.readAsDataURL(file)
    },
    addtch () {
      this.addsuccess = true
      let formData = new FormData()
      formData.append('avatar', this.tchForm.avatar)
      formData.append('id', this.tchForm.id)
      formData.append('jobid', this.tchForm.jobid)
      this.$http.post('/admin/addtch', {tchForm: this.tchForm}).then((response) => {
        var res = response.data
        this.$http.post('/admin/addavatar', formData).then((response) => {})
        if (res.status === 2) {
          this.errorTip1 = false
          this.errorTip2 = false
          alert('教师添加成功，可以在查删教师中查看')
          this.tchForm.id = this.tchForm.name = this.tchForm.subject = this.tchForm.age = this.tchForm.sex = this.tchForm.birth = this.tchForm.phonenum = ''
          this.tchForm.classForm = []
          this.addClass()
          this.$router.push('/admin/addtch').catch(err => { console.log(err) })
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

.addClass {
  float: left;
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
