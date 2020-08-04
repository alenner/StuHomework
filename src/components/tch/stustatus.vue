<template>
  <div class="Homeworkstatus">
    <h1>学生作业情况</h1><hr>
    <span>选择已发布的作业号:</span><select id="select" class="form-control" v-model="schForm.homeworkNum">
      <option v-for="(Form,index) in ItemForm" :key="index">{{ Form.HomeworkNum }}</option>
        </select><button type="text" class="btn btn-default" @click="search">确定</button>
      <div class="stustatus" v-show="showstatus"><br>
      按学号查找：<input type="text" v-model="schForm.id">
      按姓名查找：<input type="text" v-model="schForm.name">
      班级查找：<select v-model="schForm.stuclass" style="top: 5px">
          <option v-for="(Form,index) in schForm.class" :key="index">{{ Form.class }}</option>
        </select>
      <button type="button" class="btn btn-primary btn-sm" @click="search">点击查找</button>
      <button type="button" class="btn btn-primary btn-sm" @click="showAllstatus">显示全部</button>
      <button type="button" class="btn btn-primary btn-sm" @click="showDate">修改截止日期</button>
    <table class="table">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>作业号</th>
          <th>提交情况</th>
          <th>评分</th>
          <th>提交截止日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for= "(stu,index) in dataPage.curList" :key="index">
          <td>{{ stu.stuId }}</td>
          <td>{{ stu.stuName }}</td>
          <td>{{ stu.class }}</td>
          <td>{{ stu.homeworkNum }}</td>
          <td v-if="stu.submitstatu === '未提交'" style="color: red">{{ stu.submitstatu }}</td>
          <td v-if="stu.submitstatu === '已提交'" style="color: green">{{ stu.submitstatu }}</td>
          <td v-if="stu.grade === '未评分'" style="color: red">{{ stu.grade }}</td>
          <td v-else>{{ stu.grade }}</td>
          <td>{{ stu.endTime }}</td>
        </tr>
      </tbody>
    </table>
    <pageList :dataPage= "dataPage" ref="child"/>
      <div class="error-wrap" v-show="errorTip">
          <span class="error error-show" style="text-align: center;width: 100%">无此学生信息</span>
      </div>
    </div>
    <div v-show="showTip">
        <div class="bckg">
        </div>
          <div class="content">
            <div class="contenthead" style="width: 100%;height: 80px;background-color: #4d94ff;color: white;font-size: 30px;padding-top: 18px;padding-left: 18px;font-weight: 500;">
              修改截止日期</div>
            <div class="chioceDate" style="width: 90%;height: 100px;font-size: 20px;padding-top: 30px;padding-left: 30px;margin-left: 5%;font-weight: 500;border-bottom:1px solid #b3b3b3"><span>选择日期：</span>
            <myDatepicker @change="changeTime" :date="schForm.Datechange.endTime" :option="multiOption" :limit="limit"></myDatepicker></div>
            <div class="chioceclass" style="width: 90%;height: 160px;font-size: 20px;padding-top: 30px;padding-left: 30px;margin-left: 5%;font-weight: 500"><span>选择班级：</span><br><br>
              <form v-for="(Form,index) in schForm.Datechange.schclass" :key="index">
                <label class="checkbox-inline" style="float: left;margin-left: 20px;">
                <input style="top: 3px" type="checkbox" v-model="schForm.Datechange.subnitclass" :value="Form.class"> {{ Form.class }}
                </label>
              </form>
            </div>
            <div class="buttontype">
              <button id="btn" type="button" class="btn btn-default btn-ms" style="border-style: none;background-color: #4d94ff;border-radius: 0px;color: white" @click="updnewDate(schForm.Datechange)">确认</button>
              <button type="button" class="btn btn-default btn-ms" style="border-style: none;background-color: #4d94ff;border-radius: 0px;color: white" @click="cancel">取消</button>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'
import pageList from '../PageList'

export default {
  name: 'stustatus',
  components: { myDatepicker, pageList },
  data () {
    return {
      showstatus: false,
      errorTip: false,
      showTip: false,
      schForm: {
        tchId: this.$store.getters.userId,
        id: '',
        name: '',
        stuclass: '',
        class: this.$store.getters.userClass,
        subject: this.$store.getters.userSubject,
        homeworkNum: '',
        Datechange: {
          schclass: [],
          subnitclass: [],
          subject: '',
          homeworkNum: '',
          endTime: {
            time: ''
          }
        },
        stuForm: []
      },
      dataPage: {
        curPage: 1,
        all: 0,
        pageListNum: 10,
        ListNumLenght: 5,
        pageNum: '',
        limitNum: [],
        pageList: [],
        curList: []
      },
      multiOption: {
        type: 'min',
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format: 'YYYY-M-D HH:mm',
        // format: 'YYYY-MM-DD',
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
        from: new Date().getTime(),
        to: '2050-02-20'
      }],
      ItemForm: [],
      statusForm: []
    }
  },
  created () {
    this.schHWstatus()
  },
  methods: {
    schHWstatus () {
      this.schForm.id = this.schForm.name = this.schForm.stuclass = ''
      this.$http.post('/tch/schhomeworkNum', {form: this.schForm}).then((response) => {
        var res = response.data
        this.ItemForm = res.result
      })
    },
    search () {
      this.$http.post('/tch/stuHWstatus', {form: this.schForm}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          this.errorTip = false
          this.statusForm = res.result
          this.ListPageShow()
          this.schForm.id = this.schForm.name = this.schForm.stuclass = ''
        } else {
          this.errorTip = true
          this.statusForm = res.result
          this.schForm.id = this.schForm.name = this.schForm.stuclass = ''
        }
      })
      this.showstatus = true
    },
    showAllstatus () {
      this.schForm.id = this.schForm.name = this.schForm.stuclass = ''
      this.$http.post('/tch/stuHWstatus', {form: this.schForm}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          this.errorTip = false
          this.statusForm = res.result
          this.ListPageShow()
          this.schForm.stuclass = ''
        } else {
          this.errorTip = true
          this.statusForm = res.result
        }
      })
      this.showstatus = true
    },
    ListPageShow () {
      this.dataPage.all = Math.ceil(this.statusForm.length / this.dataPage.pageListNum)
      this.dataPage.pageList = []
      this.dataPage.curPage = 1
      for (let i = 1; i <= this.dataPage.all; i++) {
        this.statusForm.forEach((element, j) => {
          let k = i * this.dataPage.pageListNum
          if (k - j > 0 && k - j < this.dataPage.pageListNum + 1) {
            this.dataPage.pageList.push({
              curPageNum: i,
              list: element
            })
          }
        })
      }
      this.$refs.child.showPageList()
    },
    showDate () {
      this.showTip = true
      this.$http.post('tch/schClass', {form: this.schForm}).then((response) => {
        let res = response.data
        this.schForm.Datechange.schclass = res.result.classForm
        this.schForm.Datechange.homeworkNum = res.result.homeworkNum
        this.schForm.Datechange.subject = res.result.subject
      })
    },
    changeTime () {
      console.log(this.schForm.Datechange.endTime)
    },
    updnewDate (Datechange) {
      if (Datechange.subnitclass.length === 0) {
        alert('请选择要发布的班级')
      } else {
        let limitTime = new Date().getTime() + 60 * 60 * 24 * 1000
        let endtime = new Date(Datechange.endTime.time).getTime()
        if (!isNaN(endtime) && endtime < limitTime) {
          alert('选择的时间不能低于之后24小时的时间')
        } else if (isNaN(endtime)) {
          alert('请选择日期')
        } else {
          this.$http.post('tch/updDate', {form: Datechange}).then((response) => {
            alert('日期修改成功，请点击确定返回')
            this.search()
            this.cancel()
          })
        }
      }
    },
    cancel () {
      this.showTip = false
      this.schForm.Datechange = {
        schclass: [],
        subnitclass: [],
        subject: '',
        homeworkNum: '',
        endTime: {
          time: ''
        }
      }
    }
  }
}
</script>

<style scoped>
.error-wrap {
width: 1500px;
padding-top: 150px;
text-align: center;
color:red;
font-size: 60px;
}
#top {
    width: 100%;
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

.row {
    padding-left: 330px;
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
  width: 450px;
  height:400px;
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

.buttontype {
  float: right;
  padding-right: 40px;
}

#btn {
  margin-right: 15px;
}

#select {
  width: 100px;
  float: left;
}

#homeworkNum {
  width: 50px;
  float: left;
}

.homework {
  width: 100%;
  background-color: rgb(241, 241, 241);
  padding: 10px;
  margin-top: 10px;
}

h3 {
  float: left;
}

span {
  float: left;
  font-size: 25px;
}
</style>
