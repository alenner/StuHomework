<template>
<div class="app-container">
  <div class="homeworkList" v-show="HomeworkList">
    <h1>作业列表</h1><hr>
    按科目查找：<input type="text" v-model="schForm.subject">
    按作业号查找：<input type="text" v-model="schForm.homeworkNum">
    <button type="button" class="btn btn-primary btn-sm" @click="schHomework">点击查找</button>
    <table class="table" style="margin-top: 25px">
      <thead>
        <tr>
          <th>科目</th>
          <th>作业号</th>
          <th>提交情况</th>
          <th>评分</th>
          <th>操作</th>
          <th>截止日期</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(List,index) in dataPage.curList">
          <td>{{ List.subject }}</td>
          <td>{{ List.HomeworkNum }}</td>
          <td v-if="List.submitDate !== ''" style="color: green">已提交</td>
          <td v-else style="color: red">未提交</td>
          <td v-if="List.grade !== 'E'" style="color: green">{{ List.grade }}</td>
          <td v-else style="color: red">未评分</td>
          <td v-if="List.submitDate !== ''"><button type="button" class="btn btn-primary btn-sm" @click="searchDetail(List)">查看详情</button></td>
          <td v-else><button type="button" class="btn btn-primary btn-sm" @click="showHomework(List)">点击作答</button></td>
          <td v-if="List.submitDate !== ''">无</td>
          <td v-else-if="List.submitDate === '' && form.nowDate > new Date(List.endTime).getTime()" style="color: red">已超时({{ List.endTime }})</td>
          <td v-else>{{ List.endTime }}</td>
        </tr>
      </tbody>
    </table>
    <pageList :dataPage= "dataPage" ref="child"/>
  </div>
  <div v-show="ShowTopic">
  <div class="homework" v-if="currentList.submitDate === ''">
    <h1>当前是第{{ currentList.HomeworkNum }}次{{ currentList.subject }}作业</h1><hr>
    <form class="homeworkTopic" :key="index" v-for="(topicForm,index) in currentList.homeworkTopic">
      <div class="tTpye">
        <span>{{ topicForm.TopicType }}</span>
      </div><br><br>
      <div v-if="topicForm.TopicForm.length !==0 ">
        <form :key="topicIndex" v-for="(topicItem,topicIndex) in topicForm.TopicForm" style="margin-top: 20px">
          <span style="font-size: 18px">{{ topicIndex+1 }}、</span><ShowHomework :qStatu="currentList" :qType="topicItem.topicType" :question="topicItem"/>
        </form>
      </div>
    </form>
    <div class="btnbox">
      <form>
        <button class="btn btn-success" type="primary" @click="submitAnswer(currentList.homeworkTopic)">提交作业</button>
        <button class="btn btn-warning" @click="cancelAnswer">取消作答</button>
      </form>
      </div>
  </div>
  <div class="homework" v-else-if="currentList.submitDate !== '' && currentList.grade === 'E'">
    <h1>当前是第{{ currentList.HomeworkNum }}次{{ currentList.subject }}作业</h1><hr>
    <form class="homeworkTopic" :key="index" v-for="(topicForm,index) in currentList.homeworkTopic">
      <div class="tTpye">
        <span>{{ topicForm.TopicType }}</span>
      </div><br><br>
      <div v-if="topicForm.TopicForm.length !==0 ">
        <form :key="topicIndex" v-for="(topicItem,topicIndex) in topicForm.TopicForm" style="margin-top: 20px">
          <span style="font-size: 18px">{{ topicIndex+1 }}、</span><ShowHomework :qStatu="currentList" :qType="topicItem.topicType" :question="topicItem"/>
        </form>
      </div>
    </form>
    <div class="btnbox">
      <form>
        <button class="btn btn-warning" @click="cancelAnswer">返回</button>
      </form>
      </div>
  </div>
  <div class="homework" v-else-if="currentList.submitDate !== '' && currentList.grade !== 'E'">
    <h1>当前是第{{ currentList.HomeworkNum }}次{{ currentList.subject }}作业</h1><hr>
    <form class="homeworkTopic" :key="index" v-for="(topicForm,index) in currentList.homeworkTopic">
      <div class="tTpye">
        <span>{{ topicForm.TopicType }}</span>
      </div><br><br>
      <div v-if="topicForm.TopicForm.length !==0 ">
        <form :key="topicIndex" v-for="(topicItem,topicIndex) in topicForm.TopicForm" style="margin-top: 20px">
          <span style="font-size: 18px">{{ topicIndex+1 }}、</span><ShowHomework :qStatu="currentList" :qType="topicItem.topicType" :question="topicItem"/>
        </form>
      </div>
    </form>
    <div class="btnbox">
      <form>
        <button class="btn btn-success" @click="saveNote">保存笔记</button>
        <button class="btn btn-warning" @click="cancelAnswer">返回</button>
      </form>
      </div>
  </div>
  </div>
</div>
</template>

<script>
import ShowHomework from '../Topic/ShowHomework'
import pageList from '../PageList'

export default {
  name: 'homework',
  components: { ShowHomework, pageList },
  data () {
    return {
      HomeworkList: false,
      ShowTopic: false,
      form: {
        stuId: this.$store.getters.userId,
        stuName: this.$store.getters.userName,
        class: this.$store.getters.stuClass,
        nowDate: new Date().getTime()
      },
      schForm: {
        subject: '',
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
      homeworkList: [],
      currentList: {}
    }
  },
  mounted () {
    this.showList()
  },
  methods: {
    showList () {
      this.homeworkList = []
      this.$http.post('/stu/homeworkList', {form: this.form}).then((response) => {
        let res = response.data
        res.result.forEach(element => {
          if (element.publishDate !== '') {
            this.homeworkList.push({
              stuId: this.$store.getters.userId,
              stuName: this.$store.getters.userName,
              class: this.$store.getters.stuClass,
              HomeworkNum: element.homeworkNum,
              subject: element.subject,
              HWpublishDate: element.publishDate,
              submitDate: element.submitDate,
              grade: element.grade,
              endTime: element.endTime,
              homeworkTopic: []
            })
          }
        })
        this.ListPageShow()
      })
      this.HomeworkList = true
      this.ShowTopic = false
    },
    schHomework () {
      if (this.schForm.subject === '' && this.schForm.homeworkNum === '') {
        this.showList()
      } else {
        if (this.schForm.subject !== '' && this.schForm.homeworkNum === '') {
          this.homeworkList = []
          this.$http.post('/stu/homeworkList', {form: this.form}).then((response) => {
            let res = response.data
            res.result.forEach(element => {
              if (element.publishDate !== '' && element.subject === this.schForm.subject) {
                this.homeworkList.push({
                  stuId: this.$store.getters.userId,
                  stuName: this.$store.getters.userName,
                  class: this.$store.getters.stuClass,
                  HomeworkNum: element.homeworkNum,
                  subject: element.subject,
                  HWpublishDate: element.publishDate,
                  submitDate: element.submitDate,
                  grade: element.grade,
                  homeworkTopic: []
                })
              }
            })
            this.ListPageShow()
            this.schForm.subject = this.schForm.homeworkNum = ''
          })
        } else if (this.schForm.subject === '' && this.schForm.homeworkNum !== '') {
          this.homeworkList = []
          this.$http.post('/stu/homeworkList', {form: this.form}).then((response) => {
            let res = response.data
            res.result.forEach(element => {
              if (element.publishDate !== '' && element.homeworkNum === this.schForm.homeworkNum) {
                this.homeworkList.push({
                  stuId: this.$store.getters.userId,
                  stuName: this.$store.getters.userName,
                  class: this.$store.getters.stuClass,
                  HomeworkNum: element.homeworkNum,
                  subject: element.subject,
                  HWpublishDate: element.publishDate,
                  submitDate: element.submitDate,
                  grade: element.grade,
                  homeworkTopic: []
                })
              }
            })
            this.ListPageShow()
            this.schForm.subject = this.schForm.homeworkNum = ''
          })
        } else {
          this.homeworkList = []
          this.$http.post('/stu/homeworkList', {form: this.form}).then((response) => {
            let res = response.data
            res.result.forEach(element => {
              if (element.publishDate !== '' && element.homeworkNum === this.schForm.homeworkNum && element.subject === this.schForm.subject) {
                this.homeworkList.push({
                  stuId: this.$store.getters.userId,
                  stuName: this.$store.getters.userName,
                  class: this.$store.getters.stuClass,
                  HomeworkNum: element.homeworkNum,
                  subject: element.subject,
                  HWpublishDate: element.publishDate,
                  submitDate: element.submitDate,
                  grade: element.grade,
                  homeworkTopic: []
                })
              }
            })
            this.ListPageShow()
            this.schForm.subject = this.schForm.homeworkNum = ''
          })
        }
      }
    },
    ListPageShow () {
      this.dataPage.all = Math.ceil(this.homeworkList.length / this.dataPage.pageListNum)
      this.dataPage.pageList = []
      this.dataPage.curPage = 1
      for (let i = 1; i <= this.dataPage.all; i++) {
        this.homeworkList.forEach((element, j) => {
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
    searchDetail (list) {
      this.currentList = list
      this.$http.post('/stu/schHomework', {form: {class: list.class, HomeworkNum: list.HomeworkNum, subject: list.subject}}).then((response) => {
        let res = response.data
        res.result.forEach((element, i) => {
          list.homeworkTopic.push({
            TopicType: element.topicItem,
            TopicForm: []
          })
          if (list.grade === 'E') {
            this.showDetail1(list.homeworkTopic[i])
          } else {
            this.showDetail2(list.homeworkTopic[i])
          }
        })
      })
      this.HomeworkList = false
      this.ShowTopic = true
    },
    showDetail1 (homeworkTopic) {
      this.$http.post('/stu/showDetail', {form: {class: this.form.class, HomeworkNum: this.currentList.HomeworkNum, subject: this.currentList.subject, stuId: this.currentList.stuId}}).then((response) => {
        let res = response.data
        res.result.forEach(element => {
          if (homeworkTopic.TopicType === element.topicType) {
            homeworkTopic.TopicForm.push({
              topicid: element.topicid,
              topicType: element.topicType,
              topicName: element.topicName,
              A: element.A,
              B: element.B,
              C: element.C,
              D: element.D,
              topicimg: element.topicimg,
              imgcode: element.imgcode,
              answer: element.answer
            })
          }
        })
      })
    },
    showDetail2 (homeworkTopic) {
      this.$http.post('/stu/showDetail', {form: {class: this.form.class, HomeworkNum: this.currentList.HomeworkNum, subject: this.currentList.subject, stuId: this.currentList.stuId}}).then((response) => {
        let res = response.data
        res.result.forEach(element => {
          if (homeworkTopic.TopicType === element.topicType) {
            homeworkTopic.TopicForm.push({
              topicid: element.topicid,
              topicType: element.topicType,
              topicName: element.topicName,
              A: element.A,
              B: element.B,
              C: element.C,
              D: element.D,
              topicimg: element.topicimg,
              imgcode: element.imgcode,
              answer: element.answer,
              realAnswer: element.realAnswer,
              homeworkNote: element.Note
            })
          }
        })
      })
    },
    showHomework (list) {
      let endTime = new Date(list.endTime.replace(/-/g, '/')).getTime()
      if (this.form.nowDate < endTime) {
        this.currentList = list
        this.$http.post('/stu/schHomework', {form: {class: list.class, HomeworkNum: list.HomeworkNum, subject: list.subject}}).then((response) => {
          let res = response.data
          res.result.forEach((element, i) => {
            list.homeworkTopic.push({
              TopicType: element.topicItem,
              TopicForm: []
            })
            this.showTopic(list.homeworkTopic[i])
          })
        })
        this.HomeworkList = false
        this.ShowTopic = true
      } else {
        alert('已经超过截止日期，无法作答该作业')
      }
    },
    showTopic (homeworkTopic) {
      this.$http.post('/stu/showTopicForm', {form: {class: this.form.class, HomeworkNum: this.currentList.HomeworkNum, subject: this.currentList.subject}}).then((response) => {
        let res = response.data
        res.result.forEach(element => {
          if (homeworkTopic.TopicType === element.topicType) {
            homeworkTopic.TopicForm.push({
              topicid: element.topicid,
              topicType: element.topicType,
              topicName: element.topicName,
              A: element.A,
              B: element.B,
              C: element.C,
              D: element.D,
              answer: '',
              topicimg: element.topicimg,
              imgcode: element.imgcode
            })
          }
        })
      })
    },
    submitAnswer (topicForm) {
      let statu = new Promise((resolve, reject) => {
        let Form = []
        topicForm.forEach(element => {
          if (element.TopicForm.findIndex(item => item.answer === '') !== -1) {
            Form.push(element)
          }
        })
        resolve(Form.length)
      })
      statu.then((Form) => {
        if (Form !== 0) {
          alert('作业提交失败，请全部作答完毕')
        } else {
          this.currentList.submitDate = new Date().toString()
          this.$http.post('/stu/addHWstatus', {form: this.currentList}).then((response) => {})
          this.$http.post('/stu/addstuAnswer', {form: this.currentList}).then((response) => {})
          alert('作业提交完成')
          setTimeout(() => {
            this.showList()
          }, 500)
        }
      })
    },
    saveNote () {
      this.$http.post('/stu/saveNote', {form: this.currentList}).then((response) => {})
      alert('笔记保存成功')
    },
    cancelAnswer () {
      this.showList()
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

.Listpage {
  position: absolute;
  top:785px
}
</style>
