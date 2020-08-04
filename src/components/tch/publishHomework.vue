/* eslint-disable use-isnan */
<template>
  <div class="app-container">
    <h1>发布{{ form.subject }}作业</h1><hr>
    <div v-show="showTip" style="margin-top: 350px">
    <h1 style="text-align: center">(目前没有可发布的作业，请前往设计作业界面提交作业设计)</h1>
  </div>
      <div class="showTopics" v-show="homeworkNumList">
      <span>请选择要发布的作业号:</span><select id="select" class="form-control" v-model="form.homeworkNum">
          <option v-for="(Form,index) in ItemForm" :key="index">{{ Form.homeworkNum }}</option>
        </select><button type="text" class="btn btn-default" @click="search(ItemForm)">确定</button>
        <span style="color: red" v-show="errTip1">请选择作业号</span><br><br>
      </div>
      <div v-show="showTopics">
        <h2>当前是第{{ form.homeworkNum }}次{{ form.subject }}作业</h2>
        <form :key="index" v-for="(Topicform,index) in TopicForm" >
          <div class="homework">
            <div class="tTpye">
              <span>{{ Topicform.topicType }}</span>
              </div><br>
              <div v-if="Topicform.topicItems.length !==0 ">
                <form :key="topicIndex" v-for="(topicItem,topicIndex) in Topicform.topicItems" style="margin-top: 20px">
                  <span style="font-size: 18px;margin-right: 7px">{{ topicIndex+1 }}、</span><ShowTopic :qType="topicItem.topicType" :question="topicItem"/>
                </form>
              </div>
          </div>
        </form><br>
      <div class="btnbox" v-show="btnshow">
        <div style="border: 1px solid #999999;height: 110px;padding-top: 10px;padding-left: 10px">
          <div class="chioceclass" style="float: left;width: 45%">
        <span>请选择要发布的班级</span><br><br>
        <form v-for="(Form,index) in classForm" :key="index">
          <label class="checkbox-inline" style="float: left;margin-left: 30px;">
          <input style="top: 3px" type="checkbox" v-model="classData" :value="Form.class"> {{ Form.class }}
          </label>
        </form>
        </div>
        <div class="chioceTime" style="float: left;border-left-style: 1px dashed #b3b3b3;width: 50%">
          <span style="margin-top: 30px;margin-bottom: 26px;margin-right: 20px;margin-left: 30px">请确定提交截止日期:</span><br>
        <myDatepicker @change="changeTime" :date="form.endTime" :option="multiOption" :limit="limit"></myDatepicker>
        </div>
        </div>
        <br>
      <form>
        <button class="btn btn-success" type="primary" @click="PublishHomework">发布作业</button>
        <button class="btn btn-warning" @click="showEdit">修改作业</button>
        <button class="btn btn-warning" type="success" @click="Deletehomework">删除作业</button>
      </form>
      </div>
    </div>
    <div class="showEditTopic" v-show="showEditTopic" >
      <form :key="index" v-for="(Topicform,index) in TopicForm" >
    <div class="homework">
      <div class="tTpye">
        <span>请选择题型:</span><select id="select" class="form-control" v-model="Topicform.topicType">
          <option v-for="(TopicType,index) in TopicTypeForm" :key="index">{{ TopicType.TypeName }}</option>
        </select>
        <span style="color: red" v-show="errTip2">请选择题型</span>
        </div><br><br>
        <div v-if="Topicform.topicItems.length !==0 ">
          <form :key="topicIndex" v-for="(topicItem,topicIndex) in Topicform.topicItems" style="margin-top: 20px">
            <h4>题目{{ topicIndex+1 }},</h4><TopicForm :qType="topicItem.topicType" :question="topicItem"/>
            <button type="text" class="btn btn-default" style="margin-top: 15px" @click="Topicform.topicItems.splice(topicIndex,1)">删除
            </button>
          </form>
        </div>
        <button type="text" class="btn btn-default" style="margin-top: 15px" size="mini" @click="addQuestion(Topicform)">
          添加题目
        </button>
        <button type="text" class="btn btn-default" style="margin-top: 15px" size="mini" @click="TopicForm.splice(index,1)">删除标题</button>
      </div>
      </form><br>
      <div class="btnbox">
      <form>
        <span style="color: red" v-show="errTip3">提交失败，必须要有题目和内容</span><br><br>
        <button class="btn btn-success" type="primary" @click="submitEdit(TopicForm)">确认修改</button>
        <button class="btn btn-warning" @click="cancelEdit">取消修改</button>
        <button class="btn btn-primary" type="success" @click="addTitle">添加标题</button>
      </form>
      </div>
    </div>
      <!-- <div v-show="showTip1">
        <div class="bckg">
        </div>
          <div class="content1">
            <div class="text1">
              <h2>确认是否提交</h2>
            </div>
            <div class="buttontype">
              <button id="btn" type="button" class="btn btn-default btn-xs" @click="submitForm">确认</button>
              <button type="button" class="btn btn-default btn-xs" @click="showTip1=false">取消</button>
            </div>
          </div>
        </div>
        <div v-show="showTip2">
        <div class="bckg">
        </div>
          <div class="content2">
            <div class="text2">
              <h2>是否重置该设计</h2>
            </div>
            <div class="buttontype">
              <button id="btn" type="button" class="btn btn-default btn-xs" @click="resetForm">确认</button>
              <button type="button" class="btn btn-default btn-xs" @click="showTip2=false">取消</button>
            </div>
          </div>
        </div> -->
  </div>
</template>

<script>
import ShowTopic from '../Topic/ShowTopic'
import TopicForm from '../Topic/TopicForm'
import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'

export default {
  name: 'publishHomework',
  components: { ShowTopic, TopicForm, myDatepicker },
  data () {
    return {
      errTip1: false,
      errTip2: false,
      errTip3: false,
      showTip: false,
      showTip1: false,
      showTip2: false,
      homeworkNumList: false,
      showTopics: false,
      showEditTopic: false,
      btnshow: false,
      form: {
        tchId: this.$store.getters.userId,
        subject: this.$store.getters.userSubject,
        class: [],
        homeworkNum: '',
        designDate: '',
        Publishdate: new Date().toString(),
        endTime: {
          time: ''
        }
      },
      multiOption: {
        type: 'min',
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format: 'YYYY-MM-DD HH:mm',
        // format: 'YYYY-M-D',
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
      TopicTypeForm: [
        { TypeName: '单选题' },
        { TypeName: '多选题' },
        { TypeName: '判断题' },
        { TypeName: '填空题' },
        { TypeName: '简答题' }
      ],
      ItemForm: [],
      TopicForm: [],
      classData: [],
      classForm: []
    }
  },
  mounted () {
    this.schTopicItem()
  },
  methods: {
    schTopicItem () {
      this.form.homeworkNum = ''
      this.$http.post('/tch/showHomework', {Form: this.form}).then((response) => {
        var res = response.data
        this.ItemForm = res.result
        if (this.ItemForm.length === 0) {
          this.showTip = true
          this.homeworkNumList = false
        } else {
          this.homeworkNumList = true
        }
      })
    },
    showTopic (Topicform) {
      Topicform.topicItems = []
      this.$http.post('/tch/showHomework', {Form: this.form}).then((response) => {
        var res = response.data
        res.result.forEach(element => {
          if (element.topicType === Topicform.topicType) {
            Topicform.topicItems.push({
              designDate: element.designDate,
              topicid: element.topicid,
              topicType: element.topicType,
              topicName: element.topicName,
              A: element.A,
              B: element.B,
              C: element.C,
              D: element.D,
              answer: element.answer,
              topicimg: element.topicimg,
              imgcode: element.imgcode,
              imgPreview: ''
            })
            this.form.designDate = element.designDate
          }
        })
      })
      this.errTip1 = false
    },
    search (form) {
      if (this.form.homeworkNum === '') {
        this.errTip1 = true
      } else {
        form.forEach(element => {
          if (this.form.homeworkNum === element.homeworkNum) {
            this.classForm = element.class
          }
        })
        this.TopicForm = []
        this.$http.post('/tch/searchHomework', {topicItemForm: this.form}).then((response) => {
          var res = response.data
          res.result.forEach((element, i) => {
            this.TopicForm.push({
              topicType: element.topicItem,
              TchId: this.form.tchId,
              HomeworkNum: this.form.homeworkNum,
              topicItems: []
            })
            this.showTopic(this.TopicForm[i])
          })
          this.showTopics = true
          this.homeworkNumList = false
          this.btnshow = true
        })
      }
    },
    addTitle () {
      this.TopicForm.push({
        topicType: '',
        TchId: this.form.tchId,
        HomeworkNum: this.form.homeworkNum,
        topicItems: []
      })
    },
    addQuestion (Topicform) {
      if (Topicform.topicType === '') {
        this.errTip2 = true
      } else {
        Topicform.topicItems.push({
          designDate: this.form.designDate,
          topicid: 0,
          topicType: Topicform.topicType,
          topicName: '',
          A: '',
          B: '',
          C: '',
          D: '',
          answer: '',
          topicimg: '',
          imgcode: '',
          imgPreview: ''
        })
        this.errTip2 = false
      }
    },
    PublishHomework () {
      this.form.class = []
      this.classData.forEach(element => {
        this.form.class.push({
          class: element
        })
      })
      if (this.form.class.length === 0) {
        alert('请选择要发布的班级')
      } else {
        let limitTime = new Date().getTime() + 60 * 60 * 24 * 1000
        let endtime = new Date(this.form.endTime.time).getTime()
        if (!isNaN(endtime) && endtime < limitTime) {
          alert('选择的时间不能低于之后24小时的时间')
        } else if (isNaN(endtime)) {
          alert('请选择日期')
        } else {
          this.$http.post('/tch/PublishHomework', {form: this.form}).then((response) => {
            alert('作业发布成功')
            this.schTopicItem()
            this.classForm = []
            this.homeworkNumList = true
            this.showTopics = false
            this.showEditTopic = false
          })
        }
      }
    },
    changeTime () {
      console.log(this.form.endTime)
    },
    showEdit () {
      this.showTopics = false
      this.showEditTopic = true
    },
    cancelEdit () {
      this.$router.push('/tch/publishHomework')
      this.showTopics = true
      this.showEditTopic = false
    },
    submitEdit (topicForm) {
      topicForm.forEach(element => {
        element.topicItems.forEach((element, i) => {
          element.topicid = i + 1
        })
      })
      this.$http.post('/tch/EditHomework', {topicForm: topicForm}).then(() => {
        topicForm.forEach(element => {
          element.topicItems.forEach(element => {
            if (element.imgPreview !== '') {
              let formData = new FormData()
              formData.append('topicImg', element.topicimg)
              formData.append('Date', element.designDate)
              formData.append('topicType', element.topicType)
              formData.append('topicId', element.topicid)
              this.$http.post('/tch/addtopicImg', formData).then((response) => {})
            }
          })
        })
        this.schTopicItem()
        this.homeworkNumList = true
        this.showTopics = false
        this.showEditTopic = false
      })
    },
    Deletehomework () {
      this.$http.post('/tch/Deletehomework', {form: this.form}).then((response) => {
        this.form.homeworkNum = this.form.designDate = this.form.Publishdate = ''
        this.ItemForm = this.TopicForm = []
        this.schTopicItem()
        this.showTopics = false
        this.btnshow = false
      })
    }
  }
}
</script>

<style scoped>
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

.content1 {
  background-color: #fff;
  position: fixed;
  top: 30%;
  left: 40%;
  width: 300px;
  height:200px;
  border: 1px solid  rgb(48, 151, 0);
  border-radius: 5px;
  padding: 10px 5px;
  z-index: 2
}

.content2 {
  background-color: #fff;
  position: fixed;
  top: 30%;
  left: 40%;
  width: 300px;
  height:200px;
  border: 1px solid  rgb(233, 171, 0);
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

.text1 {
  color: rgb(48, 151, 0);
  text-align: center;
  padding-top: 15px;
  height: 70%;
}

.text2 {
  color: rgb(233, 171, 0);
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
