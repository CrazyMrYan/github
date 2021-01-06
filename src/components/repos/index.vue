<template>
  <background>
    <div slot="body" class="repos-total">
      <my-title :title="`${YEAR_START_FORMAT || '今'} 年仓库数据`"></my-title>
      <div class="container">
        <card>
          <div slot="body" class="repos-total-cell">
            <div class="key">你有几个仓库</div>
            <div class="value">{{repos.length || 0}}</div>
          </div>
        </card>
        <card>
          <div slot="body" class="repos-total-cell">
            <div class="key">你的编程语言 Top 5</div>
            <div class="value repos-total-language">
              <v-chart :options="languageOptions"/>
            </div>
          </div>
        </card>
        <qr-code/>
      </div>
    </div>
  </background>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Background from '@/components/common/background.vue';
import Card from '@/components/common/card.vue';
import Title from '@/components/common/title.vue';
import QrCode from '@/components/common/qrcode.vue';
import store, { updateState, fetchRepos } from '@/store';
import { YEAR_LAST_FORMAT, YEAR_START_FORMAT, COLORS, HOME_STATUS } from '@/lib/constant';
import { REPOS_INFO, REPO } from '@/api/interface';
import { toPercent } from '../../lib/utils';

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
    QrCode,
  },
})
export default class ReposTotal extends Vue {
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
  YEAR_START_FORMAT = YEAR_START_FORMAT;
  get repos(): REPO[] {
    if (this.reposInfo && this.reposInfo.repos) {
      return this.reposInfo.repos;
    }
    return [];
  }
  get reposInfo(): REPOS_INFO {
    return store.reposInfo || {};
  }
  mounted() {
    const languageOptions = { ...this.languageOptions };
    const language = this.reposInfo.language || {};
    const data: any[] = [];
    Object.keys(language).forEach((item: string) => {
      if (item !== 'other') {
        data.push({
          name: `${item}(${toPercent(language[item] / this.repos.length)})`,
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
    }
    &-language {
      width: 100%;
      height: 140px;
    }
  }
}
</style>
