<template>
    <div class="showListPage">
        <div v-if="dataPage.all === 1"></div>
        <div v-else>
            <nav class="Listpage" style="position: absolute;top:785px" aria-label="Page navigation">
                <div style="text-align: center">
                  <ul class="pagination">
                    <li>
                      <a v-if="dataPage.curPage === 1" class="btn" aria-label="Previous" style="border-radius: 0;color: black">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                      <a v-else class="btn" aria-label="Previous" style="border-radius: 0;color: black" @click="dataPage.curPage--,showPageList()">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                  </ul>
                    <ul class="pagination" v-for="n in dataPage.limitNum" :key="n">
                      <li>
                        <a class="btn" v-if="n === dataPage.curPage" style="border-radius: 0;color: black;background-color:#0099ff;color: white" @click="dataPage.curPage=n,showPageList()">{{ n }}</a>
                        <a class="btn" v-else style="border-radius: 0;color: black" @click="dataPage.curPage=n,showPageList()">{{ n }}</a>
                      </li>
                    </ul>
                  <ul class="pagination">
                    <li>
                      <a v-if="dataPage.curPage === dataPage.all" class="btn" style="border-radius: 0;color: black">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                      <a v-else class="btn" style="border-radius: 0;color: black" @click="dataPage.curPage++,showPageList()" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                  <ul class="pagination">
                  <span style="border-type: none;float: left;margin-right: 5px;margin-left: 10px;font-size:17px;padding-top: 5px">共{{ dataPage.all }}页,请输入想要跳转的页数：</span>
                    <li>
                      <input type="text" class="pageNum" style="float: left;height: 34px;width: 37px;border: 1px solid #d9d9d9;margin-right: 5px;font-size:17px" @keyup.enter="searchPageList" v-model="dataPage.pageNum">
                      <a class="btn" style="border-radius: 0;color: black" @click="searchPageList" aria-label="Next">
                        <span aria-hidden="true">go&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PageList',
  props: {
    dataPage: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    showPageList () {
      this.dataPage.limitNum = []
      let ListCenterNum = Math.ceil(this.dataPage.ListNumLenght / 2)
      if (this.dataPage.curPage <= ListCenterNum && this.dataPage.all >= this.dataPage.ListNumLenght) {
        for (let i = 1; i <= this.dataPage.ListNumLenght; i++) {
          this.dataPage.limitNum.push(i)
        }
      } else if (this.dataPage.curPage <= ListCenterNum && this.dataPage.all < this.dataPage.ListNumLenght) {
        for (let i = 1; i <= this.dataPage.all; i++) {
          this.dataPage.limitNum.push(i)
        }
      } else if (this.dataPage.curPage > ListCenterNum && this.dataPage.curPage <= this.dataPage.all - (ListCenterNum - 1)) {
        for (let i = this.dataPage.curPage - (ListCenterNum - 1); i <= this.dataPage.curPage + (ListCenterNum - 1); i++) {
          this.dataPage.limitNum.push(i)
        }
      } else if (this.dataPage.curPage > this.dataPage.all - (ListCenterNum - 1)) {
        if (this.dataPage.all >= this.dataPage.ListNumLenght) {
          for (let i = this.dataPage.all - (this.dataPage.ListNumLenght - 1); i <= this.dataPage.all; i++) {
            this.dataPage.limitNum.push(i)
          }
        } else {
          for (let i = this.dataPage.all - (this.dataPage.all - 1); i <= this.dataPage.all; i++) {
            this.dataPage.limitNum.push(i)
          }
        }
      }
      this.dataPage.curList = []
      this.dataPage.pageList.forEach(element => {
        if (this.dataPage.curPage === element.curPageNum) {
          this.dataPage.curList.push(element.list)
        }
      })
    },
    searchPageList () {
      if (parseInt(this.dataPage.pageNum) < 1 || this.dataPage.pageNum > this.dataPage.all) {
        alert('请输入正确的页数')
      } else if (isNaN(parseInt(this.dataPage.pageNum))) {
        alert('请输入一个整数')
      } else {
        this.dataPage.curPage = parseInt(this.dataPage.pageNum)
        this.showPageList()
        this.dataPage.pageNum = ''
      }
    }
  }
}
</script>

<style>

</style>
