<script setup>
import { drinkListStore } from '../../stores/drink';//🍍
const store = drinkListStore(); //🍍
import Remark from './Remark.vue'
import Discount from './Discount.vue'


</script>


<template>
  <div class="input-panel-wrap">
    <Remark v-if="store.screenControl.showInputPanel.panel == 'remark'" />
    <Discount v-else-if="store.screenControl.showInputPanel.panel == 'discount'" />
  </div>
</template>

<style lang="scss" scoped>
.input-panel-wrap {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #2b313dd5;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>