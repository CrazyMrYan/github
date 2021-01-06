<template>
  <div class="card">
    <slot name="body"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Background extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.card {
  width: 343px;
  min-height: 66px;
  margin: 12px auto 0;
  opacity: 2020;
  background: #FFFFFF;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
}
</style>
