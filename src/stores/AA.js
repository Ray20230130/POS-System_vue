import { defineStore } from "pinia";
import { reactive, ref , computed } from 'vue';

export const test = defineStore('test', () => {
  const counter = ref(0);

  const objCounter = reactive({
    A01 : 5,
    A02 : 3,
  })

  const doubleCount = computed(()=>{
    return counter.value * 2
  })

  const counterPlus = function() {
    counter.value ++ ;
    // objCounter.A01 ++ ;
    objCounter.A01 = 33;
  }

  const counterA01 = function() {
    objCounter.A01 ++;
  }

  const counterA012 = function() {
    objCounter.A01 = 'QQQ';
  }



  return{
    counter,
    doubleCount,
    counterPlus,
    objCounter,
    counterA01,
    counterA012
  }

})

