<template>
  <div class="qrcode">
    <img class="qrcode-img" src="http://crazy-x-lovemysoul-x-vip.img.abc188.com/images/beishang.png"/>
    <div class="tip">
      <p>长按扫码</p>
      <p>关注悲伤日记回复 “2020回顾”</p>
      <p>我在 GitHub 的这一年~</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/common/card.vue';

@Component({
  components: {
    Card,
  },
})
export default class QrCode extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.qrcode {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 220px;
  height: 60px;
  margin: 12px 16px;
  display: flex;
  align-items: center;
  z-index: 9999;
  &-img {
    width: 50px;
    height: 50px;
  }
  .tip {
    margin-left: 4px;
    font-size: 10px;
    color: $TIP_COLOR;
  }
}

@media screen and (max-device-height: 668px){
  .qrcode {
    position: relative;
  }
}
</style>
