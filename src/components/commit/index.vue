<template>
  <background>
    <div slot="body" class="commits">
      <my-title :title="`${YEAR_START_FORMAT || '今'} 年 Commit 数据`"></my-title>
      <div class="container">
        <card>
          <div slot="body" class="commits-cell">
            <div class="key">勤奋的你今年  Commit 了</div>
            <div class="tip">继续加油哟 💪</div>
            <div class="value">{{commitsInfo.total || 0}}</div>
          </div>
        </card>
        <card>
          <div slot="body" class="commits-cell">
            <div class="key">Commit 最多的 Top 5</div>
            <div class="value list">
              <top-list :data="ranks || []" keyName="repo" valueName="total"></top-list>
            </div>
          </div>
        </card>
        <card>
          <div slot="body" class="commits-cell">
            <div class="key">Commit 最勤奋的一天</div>
            <div class="tip">不知道为什么突然就奋斗起来了</div>
            <div class="value">{{mostDayRepo.day}}</div>
            <div class="title">
              <div class="title-cell">仓库</div>
              <div class="title-cell">Commit</div>
            </div>
            <div class="detail">
              <div class="detail-cell">{{mostDayRepo.repo}}</div>
              <div class="detail-cell total">{{mostDayRepo.total}}</div>
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
import { COLORS, YEAR_START_FORMAT } from '../../lib/constant';
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
export default class Commit extends Vue {
  YEAR_START_FORMAT = YEAR_START_FORMAT;
  get ranks(): any {
    if (store.commitsInfo && store.commitsInfo.ranks) {
      return store.commitsInfo.ranks;
    }
    return [];
  }
  get mostDayRepo(): any {
    if (store.commitsInfo && store.commitsInfo.mostDayRepo) {
      return store.commitsInfo.mostDayRepo;
    }
    return [];
  }
  get commitsInfo(): any {
    return store.commitsInfo || {};
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.commits {
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
  .commits {
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
      .tip {
        margin-top: 6px;
        font-size: 12px;
        color: $TIP_COLOR;
      }
      .list {
        width: 100%;
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
