<template>
  <div>
    <div v-if="qType=='单选题'">
      <div v-if="question.topicimg !== ''" class="q-content">
          <span style="font-size: 18px;float: left;width: 900px;margin-right: 70px;margin-bottom: 40px;white-space:pre-wrap">{{ question.topicName }}</span>
          <div class="item_bock head_p" style="width: 550px;float: right">
            <div class="btn head_img">
              <img :src="question.topicimg" width="400px" height="230px"/>
            <div style="width: 150px;margin-left: 115px;margin-bottom:5px"><span>{{ question.imgcode }}</span></div>
            </div>
          </div>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">A:{{ question.A }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">B:{{ question.B }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">C:{{ question.C }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">D:{{ question.D }}</h4>
          <h4 style="margin-bottom: 30px;font-weight: lighter">正确答案：{{ question.answer }}</h4>
      </div>
      <div v-else class="q-content">
        <span style="font-size: 18px;float: left;width: 900px;margin-right: 70px;white-space:pre-wrap;margin-bottom: 40px">{{ question.topicName }}</span><br><br>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">A:{{ question.A }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">B:{{ question.B }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">C:{{ question.C }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">D:{{ question.D }}</h4>
          <h4 style="margin-top: 30px;font-weight: lighter">正确答案：{{ question.answer }}</h4>
      </div>
    </div>
    <div v-else-if="qType=='多选题'">
      <div v-if="question.topicimg !== ''" class="q-content">
          <span style="font-size: 18px;float: left;width: 900px;margin-right: 70px;margin-bottom: 40px;white-space:pre-wrap">{{ question.topicName }}</span>
          <div class="item_bock head_p" style="width: 550px;float: right">
            <div class="btn head_img">
              <img :src="question.topicimg" width="400px" height="230px"/>
            <div style="width: 150px;margin-left: 115px;margin-bottom:5px"><span>{{ question.imgcode }}</span></div>
            </div>
          </div>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">A:{{ question.A }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">B:{{ question.B }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">C:{{ question.C }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">D:{{ question.D }}</h4>
          <h4 style="margin-bottom: 30px;font-weight: lighter">正确答案：{{ question.answer }}</h4>
      </div>
      <div v-else class="q-content">
        <span style="font-size: 18px;float: left;width: 900px;margin-right: 70px;white-space:pre-wrap;margin-bottom: 40px">{{ question.topicName }}</span><br><br>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">A:{{ question.A }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">B:{{ question.B }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">C:{{ question.C }}</h4>
          <h4 style="margin-bottom: 30px;margin-left: 20px;font-weight: lighter">D:{{ question.D }}</h4>
          <h4 style="margin-top: 30px;font-weight: lighter">正确答案：{{ question.answer }}</h4>
      </div>
    </div>
    <div v-else-if="qType=='判断题'">
      <div v-if="question.topicimg !== ''" class="q-content">
          <span style="font-size: 18px;float: left;width: 900px;margin-right: 70px;white-space:pre-wrap;height: 300px">{{ question.topicName }}</span>
          <div class="item_bock head_p" style="width: 550px;float: right;height: 320px">
            <div class="btn head_img">
              <img :src="question.topicimg" width="400px" height="230px"/>
            <div style="width: 150px;margin-left: 115px;margin-bottom:5px"><span>{{ question.imgcode }}</span></div>
            </div>
          </div>
          <h4 style="margin-bottom: 40px;font-weight: lighter">正确答案：{{ question.answer }}</h4>
      </div>
      <div v-else class="q-content">
        <span style="font-size: 18px;float: left;width: 900px;margin-right: 70px;white-space:pre-wrap;margin-bottom: 40px">{{ question.topicName }}</span><br><br>
          <h4 style="margin-top: 40px;font-weight: lighter">正确答案：{{ question.answer }}</h4>
      </div>
    </div>
    <div v-else-if="qType=='填空题'">
      <div v-if="question.topicimg !== ''" class="q-content">
          <span style="font-size: 18px;float: left;width: 900px;margin-right: 70px;white-space:pre-wrap;height: 300px">{{ question.topicName }}</span>
          <div class="item_bock head_p" style="width: 550px;float: right;height: 320px">
            <div class="btn head_img">
              <img :src="question.topicimg" width="400px" height="230px"/>
            <div style="width: 150px;margin-left: 115px;margin-bottom:5px"><span>{{ question.imgcode }}</span></div>
            </div>
          </div>
          <h4 style="margin-bottom: 40px;font-weight: lighter">正确答案：{{ question.answer }}</h4>
      </div>
      <div v-else class="q-content">
        <span style="font-size: 18px;float: left;width: 900px;margin-right: 70px;white-space:pre-wrap;margin-bottom: 40px">{{ question.topicName }}</span><br><br>
          <h4 style="margin-top: 40px;font-weight: lighter">正确答案：{{ question.answer }}</h4>
      </div>
    </div>
    <div v-else-if="qType=='简答题'">
      <div v-if="question.topicimg !== ''" class="q-content">
          <span style="font-size: 18px;float: left;width: 900px;margin-right: 70px;white-space:pre-wrap;height: 300px">{{ question.topicName }}</span>
          <div class="item_bock head_p" style="width: 550px;float: right;height: 320px">
            <div class="btn head_img">
              <img :src="question.topicimg" width="400px" height="230px"/>
            <div style="width: 150px;margin-left: 115px;margin-bottom:5px"><span>{{ question.imgcode }}</span></div>
            </div>
          </div>
          <h4 style="margin-bottom: 40px;font-weight: lighter">正确答案：{{ question.answer }}</h4>
      </div>
      <div v-else class="q-content">
        <span style="font-size: 18px;float: left;width: 900px;margin-right: 70px;white-space:pre-wrap;margin-bottom: 40px">{{ question.topicName }}</span><br><br>
          <h4 style="margin-top: 40px;font-weight: lighter">正确答案：{{ question.answer }}</h4>
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
  }
}
</script>
