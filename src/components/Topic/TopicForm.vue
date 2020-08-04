<template>
  <div style="line-height:2">
    <div v-if="qType=='单选题'">
      <div class="q-content">
        <input type="hidden" v-model="question.topicType">
          <textarea class="form-control" rows="10" style="width:1300px;float: left" v-model="question.topicName"></textarea>
          <div class="item_bock head_p" style="width: 250px;float: left">
            <div v-if="question.imgPreview !== ''" class="btn head_img">
              <img :src="question.imgPreview" width="180px" height="180px" @click.stop="uploadImg"/>
            <div style="width: 150px;margin-left: 17px;margin-bottom:5px"><input type="text" v-model="question.imgcode" class="form-control" placeholder="图片说明"></div>
            </div>
            <div v-else-if="question.topicimg !== '' && question.imgPreview === ''" class="btn head_img">
              <img :src="question.topicimg" width="180px" height="180px" @click.stop="uploadImg"/>
            <div style="width: 150px;margin-left: 17px;margin-bottom:5px"><input type="text" v-model="question.imgcode" class="form-control" placeholder="图片说明"></div>
            </div>
            <div v-else-if="question.topicimg === '' && question.imgPreview === ''" class="setting_right" style="margin-bottom:10px;margin-top: 10px">
              <div class="caption" style="text-align: center;width: 180px;height: 180px;border: 1px solid #d9d9d9;margin-left: 40px" @click.stop="uploadImg"><span class="btn glyphicon glyphicon-plus" style="font-size:30px;color: #666666;top:55px" aria-hidden="true"></span>
              </div><span style="font-size: 15px;color: #666666;margin-left: 90px">(附加图片)</span>
            </div>
            <input type="file" accept="image/*" name="avatar" @change="handleFile" class="hiddenInput" style="display: none"/>
          </div>
          A:<input class="form-control" type="text" v-model="question.A">
          B:<input class="form-control" type="text" v-model="question.B">
          C:<input class="form-control" type="text" v-model="question.C">
          D:<input class="form-control" type="text" v-model="question.D">
          正确答案：<span style="color: red" v-show="errTip1">请以大写字母输入对应选项</span><input  class="form-control" type="text" v-model="question.answer" @keyup="errTipOne" placeholder="以大写字母输入对应选项" >
      </div>
    </div>
    <div v-else-if="qType=='多选题'">
      <div class="q-content">
        <input type="hidden" v-model="question.topicType">
          <textarea class="form-control" rows="10" style="width:1300px;float: left" v-model="question.topicName"></textarea>
          <div class="item_bock head_p" style="width: 250px;float: left">
            <div v-if="question.imgPreview !== ''" class="btn head_img">
              <img :src="question.imgPreview" width="180px" height="180px" @click.stop="uploadImg"/>
            <div style="width: 150px;margin-left: 17px;margin-bottom:5px"><input type="text" v-model="question.imgcode" class="form-control" placeholder="图片说明"></div>
            </div>
            <div v-else-if="question.topicimg !== '' && question.imgPreview === ''" class="btn head_img">
              <img :src="question.topicimg" width="180px" height="180px" @click.stop="uploadImg"/>
            <div style="width: 150px;margin-left: 17px;margin-bottom:5px"><input type="text" v-model="question.imgcode" class="form-control" placeholder="图片说明"></div>
            </div>
            <div v-else-if="question.topicimg === '' && question.imgPreview === ''" class="setting_right" style="margin-bottom:10px;margin-top: 10px">
              <div class="caption" style="text-align: center;width: 180px;height: 180px;border: 1px solid #d9d9d9;margin-left: 40px" @click.stop="uploadImg"><span class="btn glyphicon glyphicon-plus" style="font-size:30px;color: #666666;top:55px" aria-hidden="true"></span>
              </div><span style="font-size: 15px;color: #666666;margin-left: 90px">(附加图片)</span>
            </div>
            <input type="file" accept="image/*" name="avatar" @change="handleFile" class="hiddenInput" style="display: none"/>
          </div>
          A:<input class="form-control" type="text" v-model="question.A">
          B:<input class="form-control" type="text" v-model="question.B">
          C:<input class="form-control" type="text" v-model="question.C">
          D:<input class="form-control" type="text" v-model="question.D">
          正确答案：<span style="color: red" v-show="errTip2">请以大写字母输入对应选项以及不能输入单个选项</span><input  class="form-control" type="text" v-model="question.answer" @keyup="errTipTwo" placeholder="以大写字母输入对应选项">
      </div>
    </div>
    <div v-else-if="qType=='判断题'">
      <div class="q-content">
        <input type="hidden" v-model="question.topicType">
          <textarea class="form-control" rows="10" style="width:1300px;float: left" v-model="question.topicName"></textarea>
          <div class="item_bock head_p" style="width: 250px;float: left">
            <div v-if="question.imgPreview !== ''" class="btn head_img">
              <img :src="question.imgPreview" width="180px" height="180px" @click.stop="uploadImg"/>
            <div style="width: 150px;margin-left: 17px;margin-bottom:5px"><input type="text" v-model="question.imgcode" class="form-control" placeholder="图片说明"></div>
            </div>
            <div v-else-if="question.topicimg !== '' && question.imgPreview === ''" class="btn head_img">
              <img :src="question.topicimg" width="180px" height="180px" @click.stop="uploadImg"/>
            <div style="width: 150px;margin-left: 17px;margin-bottom:5px"><input type="text" v-model="question.imgcode" class="form-control" placeholder="图片说明"></div>
            </div>
            <div v-else-if="question.topicimg === '' && question.imgPreview === ''" class="setting_right" style="margin-bottom:10px;margin-top: 10px">
              <div class="caption" style="text-align: center;width: 180px;height: 180px;border: 1px solid #d9d9d9;margin-left: 40px" @click.stop="uploadImg"><span class="btn glyphicon glyphicon-plus" style="font-size:30px;color: #666666;top:55px" aria-hidden="true"></span>
              </div><span style="font-size: 15px;color: #666666;margin-left: 90px">(附加图片)</span>
            </div>
            <input type="file" accept="image/*" name="avatar" @change="handleFile" class="hiddenInput" style="display: none"/>
          </div>
          正确答案：<span style="color: red" v-show="errTip3">请按照提示输入</span><input  class="form-control" type="text" v-model="question.answer" @keyup="errTipThree" placeholder="正确为：'T'，错误为：'F'">
      </div>
    </div>
    <div v-else-if="qType=='填空题'">
      <div class="q-content">
        <input type="hidden" v-model="question.topicType">
          <textarea class="form-control" rows="10" style="width:1300px;float: left" v-model="question.topicName"></textarea>
          <div class="item_bock head_p" style="width: 250px;float: left">
            <div v-if="question.imgPreview !== ''" class="btn head_img">
              <img :src="question.imgPreview" width="180px" height="180px" @click.stop="uploadImg"/>
            <div style="width: 150px;margin-left: 17px;margin-bottom:5px"><input type="text" v-model="question.imgcode" class="form-control" placeholder="图片说明"></div>
            </div>
            <div v-else-if="question.topicimg !== '' && question.imgPreview === ''" class="btn head_img">
              <img :src="question.topicimg" width="180px" height="180px" @click.stop="uploadImg"/>
            <div style="width: 150px;margin-left: 17px;margin-bottom:5px"><input type="text" v-model="question.imgcode" class="form-control" placeholder="图片说明"></div>
            </div>
            <div v-else-if="question.topicimg === '' && question.imgPreview === ''" class="setting_right" style="margin-bottom:10px;margin-top: 10px">
              <div class="caption" style="text-align: center;width: 180px;height: 180px;border: 1px solid #d9d9d9;margin-left: 40px" @click.stop="uploadImg"><span class="btn glyphicon glyphicon-plus" style="font-size:30px;color: #666666;top:55px" aria-hidden="true"></span>
              </div><span style="font-size: 15px;color: #666666;margin-left: 90px">(附加图片)</span>
            </div>
            <input type="file" accept="image/*" name="avatar" @change="handleFile" class="hiddenInput" style="display: none"/>
          </div>
          正确答案：<input  class="form-control" type="text" v-model="question.answer">
      </div>
    </div>
    <div v-else-if="qType=='简答题'">
      <div class="q-content">
        <input type="hidden" v-model="question.topicType">
          <textarea class="form-control" rows="10" style="width:1300px;float: left" v-model="question.topicName"></textarea>
          <div class="item_bock head_p" style="width: 250px;float: left">
            <div v-if="question.imgPreview !== ''" class="btn head_img">
              <img :src="question.imgPreview" width="180px" height="180px" @click.stop="uploadImg"/>
            <div style="width: 150px;margin-left: 17px;margin-bottom:5px"><input type="text" v-model="question.imgcode" class="form-control" placeholder="图片说明"></div>
            </div>
            <div v-else-if="question.topicimg !== '' && question.imgPreview === ''" class="btn head_img">
              <img :src="question.topicimg" width="180px" height="180px" @click.stop="uploadImg"/>
            <div style="width: 150px;margin-left: 17px;margin-bottom:5px"><input type="text" v-model="question.imgcode" class="form-control" placeholder="图片说明"></div>
            </div>
            <div v-else-if="question.topicimg === '' && question.imgPreview === ''" class="setting_right" style="margin-bottom:10px;margin-top: 10px">
              <div class="caption" style="text-align: center;width: 180px;height: 180px;border: 1px solid #d9d9d9;margin-left: 40px" @click.stop="uploadImg"><span class="btn glyphicon glyphicon-plus" style="font-size:30px;color: #666666;top:55px" aria-hidden="true"></span>
              </div><span style="font-size: 15px;color: #666666;margin-left: 90px">(附加图片)</span>
            </div>
            <input type="file" accept="image/*" name="avatar" @change="handleFile" class="hiddenInput" style="display: none"/>
          </div>
          正确答案：<textarea class="form-control" rows="4" v-model="question.answer"></textarea>
      </div>
    </div>
    <div v-else>
    </div>
  </div>

</template>

<script>
export default {
  name: 'TopicForm',
  data () {
    return {
      errTip1: false,
      errTip2: false,
      errTip3: false
    }
  },
  props: {
    question: {
      type: Object,
      default: function () {
        return {}
      }
    },
    qType: {
      type: String,
      default: ''
    }
  },
  methods: {
    errTipOne () {
      if (this.question.answer !== 'A' && 'B' && 'C' && 'D' && '') {
        this.errTip1 = true
      } else {
        this.errTip1 = false
      }
    },
    errTipTwo () {
      if (this.question.answer !== 'AB' && 'BC' && 'CD' && 'AD' && 'AC' && 'BD' && 'ABC' && 'ACD' && 'ABD' && 'BCD' && 'ABCD' && '') {
        this.errTip2 = true
      } else {
        this.errTip2 = false
      }
    },
    errTipThree () {
      if (this.question.answer !== 'T' && 'F' && '') {
        this.errTip3 = true
      } else {
        this.errTip3 = false
      }
    },
    uploadImg () {
      this.$el.querySelector('.hiddenInput').click()
    },
    handleFile (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      this.question.topicimg = file
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.question.imgPreview = res.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
