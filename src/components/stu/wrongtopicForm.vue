<template>
  <div class="wrongtopic">
    <h1>错题笔记</h1><hr>
  <div v-show="showTip" style="margin-top: 350px">
    <h1 style="text-align: center">(当前没有错题笔记)</h1>
  </div>
  <div class="homeworkList" v-show="TopicList">
    按科目查找：<input type="text" v-model="schForm.subject">
    按作业号查找：<input type="text" v-model="schForm.homeworkNum">
    <button type="button" class="btn btn-primary btn-sm" @click="schHomework">点击查找</button>
    <table class="table">
      <thead>
        <tr>
          <th>科目</th>
          <th>作业号</th>
          <th>题型</th>
          <th>题号</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(List,index) in dataPage.curList">
          <td>{{ List.subject }}</td>
          <td>{{ List.homeworkNum }}</td>
          <td>{{ List.topicType }}</td>
          <td>{{ List.topicid }}</td>
          <td><button type="button" class="btn btn-primary btn-sm" @click="searchDetail(List)">查看笔记</button></td>
        </tr>
      </tbody>
    </table>
    <pageList :dataPage= "dataPage" ref="child"/>
  </div>
  <div class="homework" v-show="showTopic">
      <div class="tTpye">
        <span>{{ currentList.showTopic.topicType }}</span>
      </div><br>
      <div>
          <span style="font-size: 18px;margin-right: 15px;margin-left: 15px;float: left">{{ currentList.showTopic.topicid }}、</span><ShowHomework :qStatu="currentList" :qType="currentList.showTopic.topicType" :question="currentList.showTopic"/>
      </div>
    <div class="btnbox">
      <form>
        <button class="btn btn-success" @click="saveNote">保存笔记</button>
        <button class="btn btn-warning" @click="cancelAnswer">返回</button>
      </form>
      </div>
  </div>
  </div>
</template>

<script>

import ShowHomework from '../Topic/ShowHomework'
import pageList from '../PageList'

export default {
  name: 'wrongtopicForm',
  components: { ShowHomework, pageList },
  data () {
    return {
      TopicList: false,
      ShowNote: false,
      showTip: false,
      showTopic: false,
      form: {
        stuId: this.$store.getters.userId,
        stuName: this.$store.getters.userName,
        class: this.$store.getters.stuClass
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
      topicList: [],
      schedList: [],
      currentList: {
        homeworkNum: '',
        subject: '',
        submitDate: '',
        publishDate: '',
        topicid: '',
        topicType: '',
        grade: '',
        showTopic: {}
      }
    }
  },
  mounted () {
    this.schlist()
  },
  methods: {
    schlist () {
      this.$http.post('stu/schtopicList', {form: this.form}).then((response) => {
        let res = response.data
        if (res.status === 0) {
          this.TopicList = false
          this.showTip = true
          this.showTopic = false
        } else {
          this.schedList = res.result
          this.schHomework()
          this.TopicList = true
          this.showTip = false
          this.showTopic = false
        }
      })
    },
    schHomework () {
      if (this.schForm.subject === '' && this.schForm.homeworkNum === '') {
        this.topicList = this.schedList
        this.ListPageShow()
      } else if (this.schForm.subject !== '' && this.schForm.homeworkNum === '') {
        this.topicList = []
        this.schedList.forEach(element => {
          if (this.schForm.subject === element.subject) {
            this.topicList.push(element)
          }
        })
        this.ListPageShow()
      } else if (this.schForm.subject === '' && this.schForm.homeworkNum !== '') {
        this.topicList = []
        this.schedList.forEach(element => {
          if (this.schForm.homeworkNum === element.homeworkNum) {
            this.topicList.push(element)
          }
        })
        this.ListPageShow()
      } else {
        this.topicList = []
        this.schedList.forEach(element => {
          if (this.schForm.homeworkNum === element.homeworkNum && this.schForm.subject === element.subject) {
            this.topicList.push(element)
          }
        })
        this.ListPageShow()
      }
    },
    ListPageShow () {
      this.dataPage.all = Math.ceil(this.topicList.length / this.dataPage.pageListNum)
      this.dataPage.pageList = []
      this.dataPage.curPage = 1
      for (let i = 1; i <= this.dataPage.all; i++) {
        this.topicList.forEach((element, j) => {
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
    searchDetail (List) {
      this.$http.post('stu/showwrongtopic', {list: List}).then((response) => {
        let res = response.data
        List.showTopic = res.result
        this.currentList = List
        this.showTopic = true
        this.TopicList = false
      })
    },
    saveNote () {
      this.$http.post('/stu/savewrongNote', {form: this.currentList}).then((response) => {})
      alert('笔记保存成功')
    },
    cancelAnswer () {
      this.schlist()
    }
  }
}
</script>

<style>
.Listpage {
  position: absolute;
  top:785px
}
</style>
