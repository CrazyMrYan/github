<template>
  <background>
    <div slot="body" class="repos-total">
      <my-title :title="`${YEAR_START_FORMAT || '今'} 年仓库数据`"></my-title>
      <div class="container">
        <card>
          <div slot="body" class="repos-total-cell">
            <div class="key">今年你创建了几个仓库</div>
            <div class="tip">
              {{createdCompare}}
            </div>
            <div class="value repos-total-created">
              <v-chart :options="createdOptions"/>
            </div>
          </div>
        </card>
        <card>
          <div slot="body" class="repos-total-cell">
            <div class="key">你最近忙于这个仓库</div>
            <div class="tip">
              坚持就是胜利
            </div>
            <div class="value name">
              {{latestUpdatedRepo.full_name || ''}}
            </div>
          </div>
        </card>
        <card>
          <div slot="body" class="repos-total-cell">
            <div class="key">当前 issue Open 最多的仓库</div>
            <div class="tip">
              最好不要弃坑哦~
            </div>
            <div class="value name">
              {{maxIssueRepo.full_name || ''}}
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
import { YEAR_LAST_FORMAT, YEAR_START_FORMAT, COLORS } from '@/lib/constant';
import { REPOS_INFO, REPO } from '@/api/interface';
import { compareYearData } from '@/lib/utils';

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
    QrCode,
  },
})
export default class ReposTotal extends Vue {
  createdOptions = {
    xAxis: {
      show: false,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      type: 'category',
      data: [`${YEAR_LAST_FORMAT}年`, `${YEAR_START_FORMAT}年`],
    },
    grid: {
      top: 10,
      left: '3%',
      right: '4%',
      bottom: 0,
      containLabel: true,
    },
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'insideLeft',
          offset: [10, 0],
          fontSize: 14,
        },
        data: [],
      },
    ],
    animation: false,
  }
  YEAR_START_FORMAT = YEAR_START_FORMAT;
  get createdCompare(): string {
    const { createds, lastYearCreateds } = this.reposInfo;
    return compareYearData(createds, lastYearCreateds);
  }
  get reposInfo(): REPOS_INFO {
    return store.reposInfo || {};
  }
  get maxIssueRepo(): REPO {
    if (store.reposInfo && store.reposInfo.maxIssues) {
      return store.reposInfo.maxIssues;
    }
    return {};
  }
  get latestUpdatedRepo(): REPO {
    if (store.reposInfo && store.reposInfo.latest) {
      return store.reposInfo.latest;
    }
    return {};
  }
  mounted() {
    const createdOptions = { ...this.createdOptions };
    const { createds, lastYearCreateds } = this.reposInfo;
    console.log(lastYearCreateds);
    (createdOptions.series[0].data as any) = [
      {
        name: `${YEAR_LAST_FORMAT}年`,
        value: lastYearCreateds,
        itemStyle: {
          color: COLORS[1],
        },
      },
      {
        name: `${YEAR_START_FORMAT}年`,
        value: createds,
        itemStyle: {
          color: COLORS[0],
        },
      },
    ];
    this.createdOptions = createdOptions;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.repos-total {
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
  .repos-total {
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
        font-size: 28px;
        font-weight: bold;
        color: $MAIN_TEXT_COLOR;
      }
      .name {
        font-size: 20px;
      }
      .tip {
        margin-top: 6px;
        font-size: 12px;
        color: $TIP_COLOR;
      }
    }
    &-created {
      width: 100%;
      height: 100px;
    }
  }
}
</style>
