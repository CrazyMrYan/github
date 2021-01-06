<template>
  <background>
    <div slot="body" class="info">
      <my-title title="基本信息"></my-title>
      <img class="info-avatar" :src="userInfo.avatar_url"/>
      <div class="bio">{{userInfo.bio}}</div>
      <div class="container">
        <card>
          <div slot="body" class="card-left-right-cell">
            <div class="key">Name</div>
            <div class="value">{{userInfo.name}}</div>
          </div>
        </card>
        <card>
          <div slot="body" class="card-left-right-cell">
            <div class="key">Repos</div>
            <div class="value">{{userInfo.public_repos}}<span class="small">个</span></div>
          </div>
        </card>
        <card>
          <div slot="body" class="card-left-right-cell">
            <div class="key">Gists</div>
            <div class="value">{{userInfo.public_gists}}<span class="small">个</span></div>
          </div>
        </card>
        <card>
          <div slot="body" class="card-left-right-cell">
            <div class="key">Followers</div>
            <div class="value">{{userInfo.followers}}<span class="small">人</span></div>
          </div>
        </card>
        <card>
          <div slot="body" class="card-left-right-cell">
            <div class="key">Following</div>
            <div class="value">{{userInfo.following}}<span class="small">人</span></div>
          </div>
        </card>
      </div>
    </div>
  </background>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Background from '@/components/common/background.vue';
import Card from '@/components/common/card.vue';
import Title from '@/components/common/title.vue';
import { USERINFO } from '../../api/interface';
import store from '@/store';

@Component({
  components: {
    Background,
    Card,
    MyTitle: Title,
  },
})
export default class Info extends Vue {
  // @globalModule.State('userInfo') userInfo: USERINFO = {};
  get userInfo(): USERINFO {
    return store.userInfo || {};
  }
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
  padding-bottom: 10px;
  overflow-y: scroll;
}

.info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info-avatar {
  width: 72px;
  height: 72px;
  margin: 48px auto 0px;
  border-radius: 72px;
}
.bio {
  width: 343px;
  margin: 14px auto 8px;
  font-size: 10px;
  text-align: center;
  color: $TIP_COLOR;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.card-left-right-cell {
  padding: 0 16px;
  height: 66px;
  display: flex;
  align-items: center;
  .key {
    flex: 2;
    font-size: 14px;
  }
  .center {
    text-align: center;
  }
  .value {
    flex: 1;
    text-align: right;
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    .small {
      margin-left: 4px;
      font-size: 12px;
    }
  }
}
</style>
