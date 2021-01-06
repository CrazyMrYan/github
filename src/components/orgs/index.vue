<template>
  <background>
    <div slot="body" class="orgs">
      <my-title title="组织数据(总)"></my-title>
      <div class="container">
        <template v-if="orgsInfo.orgs && orgsInfo.orgs.length > 0">
          <card v-for="(item, index) in orgsInfo.orgs" :key="index" :alt="item.login" >
            <div slot="body" class="org-cell">
              <div class="org-info">
                <img class="org-avatar" :src="item.avatar_url"/>
                <span class="org-name">{{item.name || item.login || '神秘组织'}}</span>
              </div>
              <div class="org-desc">{{item.description || '这个组织有点懒，没有留下任何信息~'}}</div>
            </div>
          </card>
        </template>
        <card v-else>
          <div slot="body" class="org-cell">
            <div class="org-empty">你还没加入任何公开组织哦~</div>
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
import { REPO, REPOS_INFO, STARS_INFO, ORG } from '@/api/interface';
import { COLORS } from '../../lib/constant';
import { toPercent } from '../../lib/utils';

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
    QrCode,
  },
})
export default class Orgs extends Vue {
  get orgsInfo(): any {
    return store.orgsInfo || {};
  }
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.orgs {
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
  .org {
    &-cell {
      padding: 12px 16px;
      .org-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .org-avatar {
          width: 35px;
          height: 35px;
        }
        .org-name {
          font-size: 16px;
          color: $MAIN_TEXT_COLOR;
          font-weight: bold;
        }
      }
      .org-desc {
        margin-top: 12px;
        font-size: 14px;
        color: $TIP_COLOR;
      }
      .org-empty {
        margin-top: 12px;
        text-align: center;
        font-size: 14px;
        color: $TIP_COLOR;
      }
    }
  }
}
</style>
