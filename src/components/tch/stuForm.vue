<template>
  <div class="table-responsive">
    <div class="stuForm">
    <h1>学生名单</h1><hr>
      学号查找：<input type="text" v-model="schForm.id">
      姓名查找：<input type="text" v-model="schForm.name">
      班级查找：<select v-model="schForm.stuclass">
          <option v-for="(Form,index) in schForm.class" :key="index">{{ Form.class }}</option>
        </select>
      <button type="button" class="btn btn-primary btn-sm" @click="cxxs">点击查找</button>
      <button type="button" class="btn btn-primary btn-sm" @click="showAll">显示全部</button>
    <table class="table">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>性别</th>
          <th>联系电话</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for= "(stu,index) in dataPage.curList" :key="index">
          <td>{{ stu.id }}</td>
          <td>{{ stu.name }}</td>
          <td>{{ stu.class }}</td>
          <td>{{ stu.sex }}</td>
          <td>{{ stu.phonenum }}</td>
        </tr>
      </tbody>
    </table>
    <pageList :dataPage= "dataPage" ref="child"/>
      <div class="error-wrap" v-show="errorTip">
          <span class="error error-show" style="text-align: center;width: 100%">无此学生信息</span>
      </div>
  </div>
    </div>
</template>

<script>
import pageList from '../PageList'

export default {
  name: 'stuForm',
  components: { pageList },
  data () {
    return {
      showstatus: false,
      errorTip: false,
      schForm: {
        tchId: this.$store.getters.userId,
        id: '',
        name: '',
        stuclass: '',
        class: this.$store.getters.userClass,
        subject: this.$store.getters.userSubject,
        homeworkNum: '',
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
      }
    }
  },
  created () {
    this.cxxs()
  },
  methods: {
    cxxs () {
      this.$http.post('/tch/stuForm', {schForm: this.schForm}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          this.errorTip = false
          this.schForm.stuForm = res.result
          this.dataPage.all = Math.ceil(this.schForm.stuForm.length / this.dataPage.pageListNum)
          this.dataPage.pageList = []
          this.dataPage.curPage = 1
          for (let i = 1; i <= this.dataPage.all; i++) {
            this.schForm.stuForm.forEach((element, j) => {
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
          this.schForm.stuclass = ''
        } else {
          this.errorTip = true
          this.schForm.stuForm = res.result
        }
      })
    },
    showAll () {
      this.schForm.id = this.schForm.name = this.schForm.stuclass = ''
      this.$http.post('/tch/stuForm', {schForm: this.schForm}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          this.errorTip = false
          this.schForm.stuForm = res.result
          this.dataPage.all = Math.ceil(this.schForm.stuForm.length / this.dataPage.pageListNum)
          this.dataPage.pageList = []
          this.dataPage.curPage = 1
          for (let i = 1; i <= this.dataPage.all; i++) {
            this.schForm.stuForm.forEach((element, j) => {
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
        } else {
          this.errorTip = true
          this.schForm.stuForm = res.result
        }
      })
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

</style>
