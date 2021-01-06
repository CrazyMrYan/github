<template>
  <background>
    <div slot="body" class="commit2">
      <my-title :title="`${YEAR_START_FORMAT || '今'} 年 Commit 数据`"></my-title>
      <div class="container">
        <card>
          <div slot="body" class="commit2-cell">
            <div class="key">Commit {{YEAR_START_FORMAT}} 年趋势</div>
            <div class="value chart">
              <v-chart :options="commitsOptions"/>
            </div>
          </div>
        </card>
        <card>
          <div slot="body" class="commit2-cell">
            <div class="key">Commit 最勤奋的一周</div>
            <div class="tip">偷偷告诉我，这一周是不是工作不饱和</div>
            <div class="value">{{mostWeekRepo.week}}</div>
            <div class="title">
              <div class="title-cell">其中这个仓库最多</div>
              <div class="title-cell">Commit</div>
            </div>
            <div class="detail">
              <div class="detail-cell">{{mostWeekRepo.repo}}</div>
              <div class="detail-cell total">{{mostWeekRepo.total}}</div>
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
import QrCode from '@/components/common/qrcode.vue';
import store from '@/store';
import { COLORS, YEAR_START_FORMAT } from '../../lib/constant';

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
    QrCode,
  },
})
export default class Commit2 extends Vue {
  commitsOptions = {
    xAxis: {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 8,
      },
      data: [],
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    grid: {
      top: 20,
      left: '2%',
      right: '2%',
      bottom: 0,
      containLabel: true,
    },
    series: [
      {
        type: 'line',
        color: COLORS[0],
        label: {
          show: true,
          position: 'top',
          fontSize: 14,
        },
        data: [],
      },
    ],
    animation: false,
  }
  YEAR_START_FORMAT = YEAR_START_FORMAT
  get weekRanks(): any {
    if (store.commitsInfo && store.commitsInfo.weekRanks) {
      return store.commitsInfo.weekRanks;
    }
    return [];
  }
  get mostWeekRepo(): any {
    if (store.commitsInfo && store.commitsInfo.mostWeekRepo) {
      return store.commitsInfo.mostWeekRepo;
    }
    return [];
  }
  get commitsInfo(): any {
    return store.commitsInfo || {};
  }
  mounted() {
    const commitsOptions = { ...this.commitsOptions };
    (commitsOptions.xAxis.data as any) = this.weekRanks.map((item: any) => item.week);
    (commitsOptions.series[0].data as any) = this.weekRanks.map((item: any) => item.total);
    this.commitsOptions = commitsOptions;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.commit2 {
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
  .commit2 {
    &-cell {
      padding: 8px 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .key {
        font-size: 16px;
      }
      .value {
        margin-top: 4px;
        font-size: 24px;
        font-weight: bold;
        color: $MAIN_TEXT_COLOR;
      }
      .tip {
        margin-top: 6px;
        font-size: 12px;
        color: $TIP_COLOR;
      }
      .chart {
        width: 100%;
        height: 140px;
      }
      .title {
        padding: 4px 0;
        width: 100%;
        display: flex;
        align-items: center;
        .title-cell {
          flex: 1;
          text-align: center;
          font-size: 12px;
          color: $TIP_COLOR;
        }
      }
      .detail {
        padding: 2px 0;
        width: 100%;
        display: flex;
        align-items: center;
        .detail-cell {
          flex: 1;
          text-align: center;
          font-size: 14px;
        }
        .total {
          font-size: 20px;
        }
      }
    }
    &-language {
      width: 100%;
      height: 160px;
    }
  }
}
</style>
