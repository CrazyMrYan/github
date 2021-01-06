<template>
  <background :hasArrow="false">
    <div slot="body" class="end">
      <my-title title="尾声"></my-title>
      <div class="container">
         <card>
          <div slot="body" class="end-cell">
            <div class="content center">如果觉得还挺有意思，可以 Star 一下 ~</div>
            <div class="content">
              <div class="star-btn" @click="star">赏你一个 Star 吧~</div>
            </div>
          </div>
        </card>
         <card>
          <div slot="body" class="end-cell">
            <div class="content">也可以截图保存二维码分享给朋友们~</div>
            <div class="content">
              <div class="qrcode"><img class="qrcode-img" src="http://crazy-x-lovemysoul-x-vip.img.abc188.com/images/github.png"/></div>
            </div>
          </div>
        </card>
         <!-- <card>
          <div slot="body" class="end-cell">
            <div class="content">
            </div>
          </div>
        </card> -->
      </div>
    </div>
  </background>
</template>

<script lang="ts">
import { Toast } from 'vant';
import { Component, Vue } from 'vue-property-decorator';
import Background from '@/components/common/background.vue';
import Card from '@/components/common/card.vue';
import Title from '@/components/common/title.vue';
import store from '@/store';
import { authenticate } from '../../lib/auth';

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
  },
})
export default class Orgs extends Vue {
  get octokit() {
    return store.octokit;
  }
  async star() {
    let { octokit } = this;
    if (!this.octokit) {
      octokit = await authenticate();
    }
    await octokit.activity.starRepo({
      owner: 'crazymryan',
      repo: 'github',
    });
    Toast('谢谢啦~');
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.end {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  height: 0;
  flex: 1;
  margin: 10px 0 0;
  padding-bottom: 10px;
  overflow-y: scroll;
  .end-cell {
    padding: 12px;
    .center {
      text-align: center;
    }
    .content {
      margin-bottom: 6px;
      font-size: 12px;
      color: $TIP_COLOR;
      .weixin {
        display: flex;
        justify-content: center;
        &-img {
          width: 300px;
          height: 95px;
        }
      }
      .qrcode {
        display: flex;
        justify-content: center;
        &-img {
          width: 120px;
          height: 120px;
        }
      }
      .star-btn {
        width: 240px;
        height: 36px;
        margin: 12px auto 0;
        border-radius: 4px;
        line-height: 36px;
        text-align: center;
        background: $SUB_BASE_COLOR;
        color: #FFFFFF;
        font-size: 14px;
      }
      .coffee {
        display: flex;
        justify-content: center;
        &-img {
          width: 200px;
          height: 200px;
        }
      }
    }
  }
}
</style>
