<template>
  <background>
    <div slot="body" class="stars">
      <my-title title="Star 数据(总)"></my-title>
      <div class="container">
        <card>
          <div slot="body" class="stars-cell">
            <div class="key">你送出几个小星星</div>
            <div class="tip">Star 了记得要看哦</div>
            <div class="value">{{stars.length || 0}}</div>
          </div>
        </card>
        <card>
          <div slot="body" class="stars-cell">
            <div class="key">你最喜欢 Star 编程语言 Top 5</div>
            <div class="value stars-language">
              <v-chart :options="languageOptions"/>
            </div>
          </div>
        </card>
        <card>
          <div slot="body" class="stars-cell">
            <div class="key">你的 Star 中最受欢迎 Top 5</div>
            <div class="value list">
              <top-list :data="mostStars"></top-list>
            </div>
          </div>
        </card>
        <qr-code/>
      </div>
    </div>
  </background>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Background from '@/components/common/background.vue';
import Card from '@/components/common/card.vue';
import Title from '@/components/common/title.vue';
import TopList from '@/components/common/topList.vue';
import QrCode from '@/components/common/qrcode.vue';
import store from '@/store';
import { REPO, REPOS_INFO, STARS_INFO } from '@/api/interface';
import { COLORS } from '../../lib/constant';
import { toPercent } from '../../lib/utils';

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
    TopList,
    QrCode,
  },
})
export default class Stars extends Vue {
  languageOptions = {
    legend: {
      show: true,
      data: {},
      orient: 'vertical',
      left: 'left',
      top: 'center',
      textStyle: {
        fontSize: 11,
      },
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'pie',
        radius: '80%',
        center: ['75%', '50%'],
        color: COLORS,
        label: {
          show: false,
        },
        data: [],
      },
    ],
    animation: false,
  }
  get stars(): REPO[] {
    if (store.starsInfo && store.starsInfo.stars) {
      return store.starsInfo.stars;
    }
    return [];
  }
  get mostStars(): REPO[] {
    if (store.starsInfo && store.starsInfo.mostStars) {
      return store.starsInfo.mostStars;
    }
    return [];
  }
  get starsInfo(): STARS_INFO {
    return store.starsInfo || {};
  }
  get reposInfo(): REPOS_INFO {
    return store.reposInfo || {};
  }
  mounted() {
    const languageOptions = { ...this.languageOptions };
    const language = this.starsInfo.language || {};
    const data: any[] = [];
    Object.keys(language).forEach((item: string) => {
      if (item !== 'other') {
        data.push({
          name: `${item}(${toPercent(language[item] / this.stars.length)})`,
          value: language[item],
        });
      }
    });
    const showData = data.sort((a: any, b: any) => b.value - a.value).slice(0, 5);
    (languageOptions.series[0].data as any) = showData;
    languageOptions.legend.data = showData.map(item => `${item.name}`);
    this.languageOptions = languageOptions;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.stars {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  height: 0;
  flex: 1;
  margin: 16px 0 0;
  padding-bottom: 10px;
  overflow-y: scroll;
  .stars {
    &-cell {
      padding: 8px 16px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .key {
        font-size: 16px;
      }
      .value {
        margin-top: 4px;
        font-size: 28px;
        font-weight: bold;
        color: $MAIN_TEXT_COLOR;
      }
      .tip {
        margin-top: 6px;
        font-size: 12px;
        color: $TIP_COLOR;
      }
      .list {
        width: 100%;
      }
    }
    &-language {
      width: 100%;
      height: 140px;
    }
  }
}
</style>
