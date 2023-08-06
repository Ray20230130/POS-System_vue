<script setup>
import { test } from '../stores/AA';
const testStore = test();


</script>


<template>

  <div class="wrap">
    <input type="text" >
    <h1>{{testStore.counter}}</h1>
    <h1>{{testStore.doubleCount}}</h1>
    <h1>{{testStore.objCounter.A01}}</h1>
    <h1>{{testStore.objCounter.A02}}</h1>
    <button @click="testStore.counterPlus()">click</button>
    <button @click="testStore.counterA01()">click</button>
    <button @click="testStore.counterA012()">click</button>
  </div>
  
</template>

<style lang="scss" scoped>

</style>