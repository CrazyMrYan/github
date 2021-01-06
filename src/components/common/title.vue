<template>
  <div class="title">
    <div class="diamond"></div>
    <p class="title-text">{{title}}</p>
    <div class="diamond"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Background extends Vue {
  @Prop() title?: string;
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';

.title {
  margin-top: 26px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.diamond {
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: #FFFFFF;
  position: relative;
  top: -8px;
}
.diamond:after {
  content: '';
  position: absolute;
  left: -8px;
  top: 8px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-top-color: #FFFFFF;
}
.title-text {
  margin: 0 8px;
  font-size: 18px;
  color: #FFFFFF;
}
</style>
