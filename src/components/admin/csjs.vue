<template>
  <div class="table-responsive">
    <h1>教师列表</h1><hr>
      按工号查找：<input type="text" v-model="schForm.id">
      按姓名查找：<input type="text" v-model="schForm.name">
      <button type="button" class="btn btn-primary btn-sm" @click="cxjs">点击查找</button>
    <form class="scjs" action="/admin/scjs" method="post">
    <table class="table">
      <thead>
        <tr>
          <th>工号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>科目</th>
          <th>年龄</th>
          <th>性别</th>
          <th>出生日期</th>
          <th>联系电话</th>
          <th>删除操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for= "(tch,index) in dataPage.curList" :key="index">
          <td>{{ tch.id }}</td>
          <td>{{ tch.name }}</td>
          <td><span v-for= "(Tch,index) in tch.class" :key="index"><span v-if="index !== tch.class.length-1">{{ Tch.class }},</span><span v-else>{{ Tch.class }}</span></span></td>
          <td>{{ tch.subject }}</td>
          <td>{{ parseInt((new Date().getTime() - new Date(tch.birth).getTime()) / (365 * 24 * 60 * 60 * 1000)) }}</td>
          <td>{{ tch.sex }}</td>
          <td>{{ tch.birth }}</td>
          <td>{{ tch.phonenum }}</td>
          <td><a href="#" class="btn btn-danger btn-xs" @click.prevent="scjs(tch.id)">删除</a></td>
        </tr>
      </tbody>
    </table>
    <pageList :dataPage= "dataPage" ref="child"/>
    </form>
      <div class="error-wrap">
          <span class="error error-show" v-show="errorTip">无此教师信息</span>
        </div>
    </div>
</template>

<script>
import pageList from '../PageList'

export default {
  name: 'csjs',
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
      tchForm: []
    }
  },
  mounted () {
    this.cxjs()
  },
  methods: {
    // 查询显示教师信息模块
    cxjs () {
      this.$http.post('/admin/cxjs', {schForm: this.schForm}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          this.errorTip = false
          this.tchForm = res.result
          this.ListPageShow()
        } else {
          this.errorTip = true
          this.tchForm = res.result
        }
      })
    },
    ListPageShow () {
      this.dataPage.all = Math.ceil(this.tchForm.length / this.dataPage.pageListNum)
      this.dataPage.pageList = []
      this.dataPage.curPage = 1
      for (let i = 1; i <= this.dataPage.all; i++) {
        this.tchForm.forEach((element, j) => {
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
    // 删除教师信息模块
    scjs (id) {
      this.$http.post('/admin/scjs', {id: id}).then((response) => {
        var res = response.data
        if (res.status === 1) {
          this.errorTip = false
          alert('删除成功')
          this.cxjs()
          this.$router.push('/admin/csjs').catch(err => { console.log(err) })
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
