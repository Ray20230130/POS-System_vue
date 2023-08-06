<script setup>
import LeftSide from './components/LeftSide.vue'
import RightSide from './components/RightSide.vue'
import InputPanel from './components/InputPanel/InputPanel.vue'

import { drinkListStore } from './stores/drink'; //🍍
const store = drinkListStore(); //🍍


</script>

<template>
    <div class="col-xl-10 offset-xl-1 main-wrap">

      <div class="board">
        <div class="show-order">
          <LeftSide />
        </div>
        <div class="controller">
          <RightSide />
        </div>
      </div>

      <div class="input-panel" v-if="store.$state.screenControl.showInputPanel.back">
        <InputPanel />
      </div>

    </div>
</template>

<style lang="scss" scoped>

.main-wrap{
  position: relative;
}
.board {
  background-color: #2B313D;
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 1em;
  .show-order {
    width: 35%;
    // background-color: #fff;
  }

  .controller {
    margin-left: 10px;
    width: 65%;
    flex-grow: 1;
  }
}

</style>
