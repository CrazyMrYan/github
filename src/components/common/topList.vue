<template>
  <div class="top-list">
    <div class="top-list-item" v-for="(item, index) in data" :key="index">
      <div class="top-list-item-left">{{index + 1}}. {{item[keyName]}}</div>
      <div class="top-list-item-right">{{item[valueName]}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class TopList extends Vue {
  @Prop() data?: any[]
  @Prop({
    default: 'full_name',
  }) keyName?: string
  @Prop({
    default: 'stargazers_count',
  }) valueName?: string
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.top-list {
  width: 100%;
  &-item {
    margin-top: 2px;
    height: 24px;
    display: flex;
    align-items: center;
    &-left {
      flex: 3;
      font-size: 14px;
      font-weight: normal;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    &-right {
      flex: 1;
      font-weight: normal;
      text-align: right;
      font-size: 14px;
      color: $TIP_COLOR;
    }
  }
}
</style>
