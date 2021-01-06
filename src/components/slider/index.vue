<template>
  <div class="my-slider">
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
      <swiper-slide class="swiper-item">
        <info v-if="Object.keys(userInfo).length > 0"></info>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <repos v-if="Object.keys(reposInfo).length > 0"></repos>
      </swiper-slide>
      <swiper-slide class="swiper-item" >
        <repos2 v-if="Object.keys(reposInfo).length > 0"></repos2>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <star v-if="Object.keys(reposInfo).length > 0 && Object.keys(starsInfo).length > 0"></star>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <stared v-if="Object.keys(reposInfo).length > 0 && Object.keys(starsInfo).length > 0"></stared>
      </swiper-slide>
      <!-- <swiper-slide class="swiper-item">
        <commit v-if="Object.keys(commitsInfo).length > 0"></commit>
      </swiper-slide> -->
      <!-- <swiper-slide class="swiper-item">
        <commit2 v-if="Object.keys(commitsInfo).length > 0"></commit2>
      </swiper-slide> -->
      <swiper-slide class="swiper-item">
        <orgs v-if="Object.keys(orgsInfo).length > 0"></orgs>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <end></end>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script lang="ts">
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Component, Vue, Watch } from 'vue-property-decorator';
import Info from '@/components/info/index.vue';
import Repos from '@/components/repos/index.vue';
import Repos2 from '@/components/repos2/index.vue';
// import Commit from '@/components/commit/index.vue';
// import Commit2 from '@/components/commit2/index.vue';
import Star from '@/components/star/index.vue';
import Stared from '@/components/stared/index.vue';
import Orgs from '@/components/orgs/index.vue';
import End from '@/components/end/index.vue';
import { REPOS_INFO, USERINFO, STARS_INFO, ORG, ORGS_INFO } from '@/api/interface';
import store, { fetchCommits, fetchRepos, fetchOrgs, updateState } from '@/store';

import 'swiper/dist/css/swiper.css';
import { HOME_STATUS } from '../../lib/constant';

@Component({
  components: {
    swiper,
    swiperSlide,
    Info,
    Repos,
    Repos2,
    Star,
    Stared,
    Orgs,
    End,
  },
})
export default class MySlider extends Vue {
  get userInfo(): USERINFO {
    return store.userInfo || {};
  }
  get reposInfo(): REPOS_INFO {
    return store.reposInfo || {};
  }
  get starsInfo(): STARS_INFO {
    return store.starsInfo || {};
  }
  get orgsInfo(): ORGS_INFO {
    return store.orgsInfo || {};
  }
  get commitsInfo(): any {
    return store.commitsInfo || [];
  }
  onSLideChange() {
    const swiperRef = (this.$refs.mySwiper as any).swiper;
    const { activeIndex } = swiperRef;
    console.log(activeIndex)
    if (activeIndex === 1 && Object.keys(this.reposInfo).length === 0) {
      updateState({ status: HOME_STATUS.BEGIN });
      return;
    }
    if (activeIndex === 3 && Object.keys(this.starsInfo).length === 0) {
      updateState({ status: HOME_STATUS.BEGIN });
      return;
    }
    // if (activeIndex === 5 && Object.keys(this.commitsInfo).length === 0) {
    //   updateState({ status: HOME_STATUS.BEGIN });
    //   return;
    // }
    if (activeIndex === 7 && Object.keys(this.orgsInfo).length === 0) {
      updateState({ status: HOME_STATUS.BEGIN });
    }
  }
  swiperOption = {
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: this.onSLideChange,
    },
  }
}
</script>

<style lang="scss" scoped>
.my-slider {
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}
.swiper-box {
  width: 100%;
  height: 100%;
}
.swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
