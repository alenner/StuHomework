<template>
  <div class="table-responsive">
      <form class="cxxs" action="/admin/cxxs" method="post">
      <h1>学生列表</h1><hr>
      按学号查找：<input type="text" v-model="schForm.id" @keyup.prevent="cxxs">
      按姓名查找：<input type="text" v-model="schForm.name" @keyup.prevent="cxxs">
      <button type="button" class="btn btn-primary btn-sm" @click="cxxs">点击查找</button>
      </form>
    <form class="scxs" action="/admin/scxs" method="post">
    <table class="table">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>年龄</th>
          <th>性别</th>
          <th>出生日期</th>
          <th>联系电话</th>
          <th>删除操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for= "(stu,index) in dataPage.curList" :key="index">
          <td>{{ stu.id }}</td>
          <td>{{ stu.name }}</td>
          <td>{{ stu.class }}</td>
          <td>{{ parseInt((new Date().getTime() - new Date(stu.birth).getTime()) / (365 * 24 * 60 * 60 * 1000)) }}</td>
          <td>{{ stu.sex }}</td>
          <td>{{ stu.birth }}</td>
          <td>{{ stu.phonenum }}</td>
          <td><a href="#" class="btn btn-danger btn-xs" @click.prevent="scxs(stu.id)">删除</a></td>
        </tr>
      </tbody>
    </table>
    <pageList :dataPage= "dataPage" ref="child"/>
    </form>
      <div class="error-wrap">
          <span class="error error-show" v-show="errorTip">无此学生信息</span>
        </div>
    </div>
</template>

<script>
import pageList from '../PageList'

export default {
  name: 'csxs',
  components: { pageList },
  data () {
    return {
      errorTip: false,
      schForm: {
        id: '',
        name: ''
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
      stuForm: []
    }
  },
  mounted: function () {
    this.cxxs()
  },
  methods: {
    // 查询显示学生信息模块
    cxxs () {
      this.$http.post('/admin/cxxs', {schForm: this.schForm}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          this.errorTip = false
          this.stuForm = res.result
          this.ListPageShow()
        } else {
          this.errorTip = true
          this.stuForm = res.result
        }
      })
    },
    ListPageShow () {
      this.dataPage.all = Math.ceil(this.stuForm.length / this.dataPage.pageListNum)
      this.dataPage.pageList = []
      this.dataPage.curPage = 1
      for (let i = 1; i <= this.dataPage.all; i++) {
        this.stuForm.forEach((element, j) => {
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
    // 删除学生信息模块
    scxs (id) {
      this.$http.post('/admin/scxs', {id: id}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          this.errorTip = false
          alert('删除成功')
          this.cxxs()
          this.$router.push('/admin/csxs').catch(err => { console.log(err) })
        } else {
          this.errorTip = true
          this.stuForm = res.result
        }
      })
    }
  }
}
</script>

<style scoped>
.error-wrap {
position: absolute;
top: 250px;
width: 1500px;
height: 500px;
padding-top: 200px;
text-align: center;
color:red;
font-size: 50px
}
.row {
  width: 100%;
}

</style>
