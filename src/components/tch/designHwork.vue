<template>
  <div class="app-container">
    <h1>设计{{ form.subject }}作业</h1><hr>
    <div v-if="inputNum === true">
    <span>请输入作业号</span>
    <input id="homeworkNum" class="form-control" type="text" v-model="form.homeworkNum">
    <span style="color: red" v-show="errTip1">请输入作业号</span>
    <span style="color: red" v-show="errTip2">该作业号已经存在</span>
    <button type="text" class="btn btn-default" size="mini" @click="checkNum">确定</button>
    <span style="font-size: 10px; float: none; padding-left: 10px; padding-top: 10px;" v-if="showNum === 1">(当前没有存在已设计的作业号,建议从1开始...)</span>
    <span style="font-size: 10px; float: none; padding-left: 10px; padding-top: 10px;" v-if="showNum === 2">(已设计的作业号:
      <span style="font-size: 10px; float: none; padding-top: 10px;" v-for="(num, index) in DesignedNum" :key="index">
        <span style="font-size: 10px; float: none; padding-top: 10px;" v-if="index !== DesignedNum.length-1">{{ num.HomeworkNum }},</span>
      <span style="font-size: 10px; float: none; padding-top: 10px;" v-else>{{ num.HomeworkNum }}</span></span>,建议按顺序输入)</span>
    </div>
    <div v-if="inputNum === false">
    <span>作业号</span>
    <input id="homeworkNum" class="form-control" type="text" v-model="form.homeworkNum" readonly>
      <br><br>
      <form :key="index" v-for="(titleItem,index) in form.titleItems">
    <div class="homework">
      <div class="tTpye" v-if="showTip3 === false">
        <span>请选择题型:</span><select id="select" class="form-control" v-model="titleItem.TopicType">
          <option v-for="(TopicType,index) in TopicTypeForm" :key="index">{{ TopicType.TypeName }}</option>
        </select>
        <span style="color: red" v-show="errTip3">请选择题型</span><br><br>
        </div>
        <div class="tTpye" v-else>
        <span>题型{{ index+1 }}:{{ titleItem.TopicType }}</span><br>
        </div>
        <div v-if="titleItem.topicItems.length !==0 ">
          <form :key="topicIndex" v-for="(topicItem,topicIndex) in titleItem.topicItems" style="margin-top: 20px">
            <h4>题目{{ topicIndex+1 }}:</h4><TopicForm :qType="topicItem.topicType" :question="topicItem"/>
            <button type="text" class="btn btn-default" style="margin-top: 15px" @click="titleItem.topicItems.splice(topicIndex,1)">删除
            </button>
          </form>
        </div>
        <button type="text" class="btn btn-default" style="margin-top: 15px" size="mini" @click="addQuestion(titleItem)">
          添加题目
        </button>
        <button type="text" class="btn btn-default" style="margin-top: 15px" size="mini" @click="form.titleItems.splice(index,1)">删除标题</button>
      </div>
      </form><br>
      <div class="btnbox" v-show="showbtn">
      <form>
        <span style="color: red" v-show="errTip4">提交失败，必须要有题目和内容</span><br><br>
        <button class="btn btn-success" type="primary" @click="showSubmit">提交</button>
        <button class="btn btn-warning" @click="showReset">重置</button>
        <button class="btn btn-primary" type="success" @click.prevent="addTitle">添加标题</button>
      </form>
      <vue-datepicker></vue-datepicker>
      </div>
      <div v-show="showTip1">
        <div class="bckg">
        </div>
          <div class="content1">
            <div class="text1">
              <h2>确认是否提交</h2>
            </div>
            <div class="buttontype">
              <button id="btn" type="button" class="btn btn-default btn-xs" @click="submitForm(form.titleItems)">确认</button>
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
        </div>
      </div>
  </div>
</template>

<script>

import TopicForm from '../Topic/TopicForm'

export default {
  name: 'designHwork',
  components: { TopicForm },
  data () {
    return {
      errTip1: false,
      errTip2: false,
      errTip3: false,
      errTip4: false,
      showTip1: false,
      showTip2: false,
      showTip3: false,
      showTip4: false,
      showTip5: false,
      showbtn: false,
      showNum: 0,
      inputNum: false,
      form: {
        tchId: this.$store.getters.userId,
        subject: this.$store.getters.userSubject,
        class: this.$store.getters.userClass,
        homeworkNum: '',
        date: new Date().toString(),
        titleItems: []
      },
      TopicTypeForm: [
        { TypeName: '单选题' },
        { TypeName: '多选题' },
        { TypeName: '判断题' },
        { TypeName: '填空题' },
        { TypeName: '简答题' }
      ],
      currentTitleItem: null,
      DesignedNum: []
    }
  },
  mounted () {
    this.showDesignedNum()
  },
  methods: {
    submitForm (titleItems) {
      titleItems.forEach(element => {
        element.topicItems.forEach((element, i) => {
          element.topicid = i + 1
        })
      })
      this.$http.post('/tch/designHwork', {form: this.form}).then((response) => {
        titleItems.forEach(element => {
          element.topicItems.forEach(element => {
            if (element.imgPreview !== '') {
              let formData = new FormData()
              formData.append('topicImg', element.topicimg)
              formData.append('Date', element.Date)
              formData.append('topicType', element.topicType)
              formData.append('topicId', element.topicid)
              this.$http.post('/tch/addtopicImg', formData).then((response) => {})
            }
          })
        })
        alert('作业设计成功')
        setTimeout(() => {
          this.form.homeworkNum = ''
          this.showDesignedNum()
        }, 500)
      })
      this.showTip1 = false
    },
    showDesignedNum () {
      this.$http.post('/tch/checkNum', {form: this.form}).then((response) => {
        let res = response.data
        if (res.status === 0) {
          this.showNum = 1
        } else {
          this.showNum = 2
          this.DesignedNum = res.result
        }
      })
      this.inputNum = true
    },
    checkNum () {
      this.$http.post('/tch/checkNum', {form: this.form}).then((response) => {
        let res = response.data
        if (this.form.homeworkNum === '') {
          this.errTip1 = true
        } else if (res.status === 0) {
          this.errTip1 = false
          this.errTip2 = true
        } else {
          this.form.titleItems = []
          this.addTitle()
          this.inputNum = false
          this.showbtn = true
        }
      })
    },
    addTitle () {
      this.form.titleItems.push({
        TopicType: '',
        TchId: this.form.tchId,
        HomeworkNum: this.form.homeworkNum,
        topicItems: []
      })
      this.showTip3 = false
    },
    addQuestion (titleItem) {
      this.currentTitleItem = titleItem
      if (titleItem.TopicType === '') {
        this.errTip3 = true
      } else {
        this.currentTitleItem.topicItems.push({
          Date: this.form.date,
          topicid: 0,
          topicType: titleItem.TopicType,
          topicName: '',
          A: '',
          B: '',
          C: '',
          D: '',
          answer: '',
          imgPreview: '',
          topicimg: '',
          imgcode: ''
        })
        this.errTip3 = false
        this.showTip3 = true
      }
    },
    showSubmit () {
      if (this.form.homeworkNum === '' || this.form.titleItems.length === 0) {
        this.errTip4 = true
      } else this.showTip1 = true
    },
    showReset () {
      this.showTip2 = true
    },
    resetForm () {
      this.checkNum()
      this.showTip2 = false
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
