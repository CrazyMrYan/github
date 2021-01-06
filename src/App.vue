<template>
  <div id="app">
    <home v-if="status === HOME_STATUS.INIT"></home>
    <my-slider v-if="status !== HOME_STATUS.INIT && status !== HOME_STATUS.ERROR"></my-slider>
    <div v-if="status === HOME_STATUS.ERROR">
      不好意思，访问 GitHub 出错了，请重试 ~
      <div class="retry-btn" @click="reTry">刷新页面</div>
    </div>

    <van-overlay :show="loading" @click="closeLoading">
      <div class="wrapper" @click.stop>
        <card>
          <div class="tip" slot="body">
            <div>需要从 GitHub 请求并分析数据，所以生成数据会比较慢，请耐心等待~</div>
            <div class="content">等待的时间，你也可以思考一下，{{YEAR_START_FORMAT}} 年...</div>
            <div class="content">涨了多少工资...</div>
            <div class="content">加班了几个小时...</div>
            <div class="content">写了几个 bug...</div>
            <div class="content">气哭了几个产品...</div>
            <div class="content">new 了几个对象...</div>
            <div class="content">想想心好痛...</div>
            <div class="content">还是静静等待吧</div>
          </div>
        </card>
        <van-loading size="24px" vertical v-if="loading" class="home-loading" color="#ffffff">正在生成数据...</van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Home from '@/components/home/index.vue';
import Card from '@/components/common/card.vue';
import MySlider from '@/components/slider/index.vue';
import { HOME_STATUS, YEAR_START_FORMAT } from '@/lib/constant';
import store from '@/store';

@Component({
  components: {
    Home,
    MySlider,
    Card,
  },
})
export default class App extends Vue {
  loading: boolean = false
  HOME_STATUS = HOME_STATUS;
  YEAR_START_FORMAT = YEAR_START_FORMAT;
  get status() {
    return store.status;
  }
  @Watch('status')
  onWatchStatus() {
    switch (this.status) {
    case 1: this.showLoading(); break;
    default: this.closeLoading(); break;
    }
  }
  showLoading() {
    this.loading = true;
  }
  closeLoading() {
    this.loading = false;
  }
  reTry() {
    window.location.href = process.env.NODE_ENV === 'production' ? 'http://crazy.lovemysoul.vip/github/' : '/';
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tip {
    padding: 16px 12px;
    font-size: 16px;
    color: $MAIN_TEXT_COLOR;
  }
  .content {
    margin-top: 12px;
    font-size: 14px;
    color: $TIP_COLOR;
    text-align: center;
  }
  .home-loading {
    margin-top: 24px;
    color: #ffffff !important;
  }
}
.retry-btn {
  border: 1px solid #333333;
  border-radius: 4px;
  width: 120px;
  text-align: center;
  height: 36px;
  line-height: 36px;
  margin: 20px auto;
}
</style>
