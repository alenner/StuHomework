<template>
<div class="checkHomework">
  <div v-show="showTip" style="margin-top: 350px">
    <h1>提交作业名单</h1><hr>
    <h1 style="text-align: center">(当前没有可批改的作业)</h1>
  </div>
  <div class="chiocehomeworkNum" v-show="showHomeworkNum">
    <h1>提交作业名单</h1><hr>
    <span>选择要批改的作业号:</span><select id="select" class="form-control" v-model="form.homeworkNum">
      <option v-for="(Form,index) in homeworkNumList" :key="index">{{ Form.homeworkNum }}</option>
        </select><button type="text" class="btn btn-default" @click="schForm(form.homeworkNum)">确定</button>
  </div><br>
  <div class="table-responsive" v-show="showList">
        <table class="table">
          <thead>
            <tr>
              <th>学号</th>
              <th>姓名</th>
              <th>班级</th>
              <th>作业号</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for= "(form,index) in dataPage.curList" :key="index">
              <td>{{ form.stuId }}</td>
              <td>{{ form.stuName }}</td>
              <td>{{ form.class }}</td>
              <td>{{ form.homeworkNum }}</td>
              <td><button type="button" class="btn btn-primary btn-xs" @click="Checkhomework(form)">批改作业</button></td>
            </tr>
          </tbody>
        </table>
        <pageList :dataPage= "dataPage" ref="child"/>
  </div>
  <div class="homework" v-show="ShowTopic">
    <h1>{{ currentList.stuName }}的第{{ currentList.homeworkNum }}次{{ form.subject }}作业情况</h1><hr>
    <form class="homeworkTopic" :key="index" v-for="(topicForm,index) in currentList.homeworkTopic">
      <div class="tTpye">
        <span>{{ topicForm.TopicType }}</span>
      </div><br><br>
      <div v-if="topicForm.TopicForm.length !==0 ">
        <form :key="topicIndex" v-for="(topicItem,topicIndex) in topicForm.TopicForm" style="margin-top: 20px">
          <span style="font-size: 18px;margin-right: 7px">{{ topicIndex+1 }}、</span><ShowstuHomework :qType="topicItem.topicType" :question="topicItem"/>
        </form>
      </div>
    </form>
    <div>
      <form class="form-inline">
        <div class="form-group">
          <p class="form-control-static">请输入成绩：</p>
          </div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="currentList.stuGrade" placeholder="成绩评级由高到低依次为A+、A、B+、B、C+、C、D">
          </div>
        <button class="btn btn-success" type="primary" @click="submitGrade">提交成绩</button>
        <button class="btn btn-warning" @click="cancelSubmit">取消提交</button>
      </form>
      </div>
  </div>
</div>
</template>

<script>
import ShowstuHomework from '../Topic/ShowstuHomework'
import pageList from '../PageList'

export default {
  name: 'checkHomework',
  components: { ShowstuHomework, pageList },
  data () {
    return {
      showList: false,
      ShowTopic: false,
      showHomeworkNum: false,
      showTip: false,
      Flag: false,
      form: {
        id: this.$store.getters.userId,
        subject: this.$store.getters.userSubject,
        class: this.$store.getters.userClass,
        homeworkNum: ''
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
      homeworkNumList: [],
      homeworkForm: [],
      currentList: {}
    }
  },
  mounted () {
    this.schhomework(this.Flag)
  },
  methods: {
    schhomework (Flag) {
      this.$http.post('/tch/schCheckNum', {form: this.form}).then((response) => {
        let res = response.data
        if (res.status === 0) {
          this.showTip = true
          this.ShowTopic = false
        } else {
          this.homeworkNumList = res.result
          if (Flag === true) {
            this.cancelSubmit()
            this.Flag = false
          } else {
            this.showHomeworkNum = true
          }
        }
      })
    },
    schForm (homeworkNum) {
      this.homeworkForm = []
      this.homeworkNumList.forEach(Element => {
        if (homeworkNum === Element.homeworkNum) {
          Element.submitForm.forEach(element => {
            if (element.grade === 'E' && element.submitDate !== '') {
              this.homeworkForm.push({
                stuId: element.stuId,
                stuName: element.stuName,
                class: element.class,
                homeworkNum: element.homeworkNum,
                HWpublishDate: element.HWpublishDate,
                submitDate: element.submitDate,
                stuGrade: '',
                homeworkTopic: []
              })
            }
          })
        }
      })
      this.ListPageShow()
      this.showHomeworkNum = true
      this.showList = true
      this.ShowTopic = false
    },
    ListPageShow () {
      this.dataPage.all = Math.ceil(this.homeworkForm.length / this.dataPage.pageListNum)
      this.dataPage.pageList = []
      this.dataPage.curPage = 1
      for (let i = 1; i <= this.dataPage.all; i++) {
        this.homeworkForm.forEach((element, j) => {
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
    Checkhomework (list) {
      this.currentList = list
      this.$http.post('/tch/schtopicItems', {form: list}).then((response) => {
        let res = response.data
        res.result.forEach((element, i) => {
          list.homeworkTopic.push({
            TopicType: element.topicItem,
            TopicForm: []
          })
          this.showTopic(list.homeworkTopic[i])
        })
        this.showHomeworkNum = false
        this.showList = false
        this.ShowTopic = true
      })
    },
    showTopic (homeworkTopic) {
      this.$http.post('/tch/showTopics', {form: this.currentList}).then((response) => {
        let res = response.data
        res.result.forEach(element => {
          if (homeworkTopic.TopicType === element.topicType) {
            homeworkTopic.TopicForm.push({
              topicType: element.topicType,
              topicName: element.topicName,
              A: element.A,
              B: element.B,
              C: element.C,
              D: element.D,
              answer: element.answer,
              realAnswer: element.realAnswer,
              topicimg: element.topicimg,
              imgcode: element.imgcode
            })
          }
        })
      })
    },
    submitGrade () {
      this.$http.post('/tch/submitGrade', {form: this.currentList}).then((response) => {
        this.Flag = true
        this.schhomework(this.Flag)
        alert('完成作业评分，可以在管理学生功能中查看作业成绩')
      })
    },
    cancelSubmit () {
      this.schForm(this.form.homeworkNum)
      this.showHomeworkNum = true
      this.showList = true
      this.ShowTopic = false
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

.homeworkTopic {
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
