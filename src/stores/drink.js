import { defineStore } from "pinia";
import { reactive, ref } from 'vue';

import drinkMenu from '../assets/JsonData/DrinkMenu.json'

export const drinkListStore = defineStore('drinkListStore', () => {
  // test
  const test = reactive({
    A1: {
      B1:0
    },
    A2:{
      B2:0
    }
  })

  // 讀取菜單的價錢的路徑數值。
  const myChooseMap = reactive({
    navIndex: 0,
    menuIndex: 0
  })

  // 飲料菜單的 JSON
  const drinkMenuData = reactive(drinkMenu)

  // 視窗控制
  const screenControl = reactive({
    showDetail: false,
    showInputPanel: {
      back: false,
      panel: 'discount'
    }
  })

  // 點單細節
  const detailData = reactive({
    btnCapacity: ['中杯', '大杯'],
    btnTemp: ['多冰', '正常冰', '少冰', '去冰', '熱一點', '熱的', '溫的', '常溫'],
    btnSweet: ['全糖', '7分糖', '5分糖', '3分糖', '1分糖', '無糖'],
    btnAddBubble: ['珍珠', '黃金珍珠', '焙烏龍茶凍'],
    btnCupNum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    btnDiscount: ['環保杯', '分享瓶', '分享瓶回收000', '活動1', '活動2']

  })

  // 空訂單 (reset 用)
  const originNewOrder = reactive({
    productName: '',
    productPrice: 0,
    bubble: [],
    bubblePrice: 0,
    cupNum: 1,
    capacity: "",
    sweet: "",
    temp: "",
    remark: "",
    discount: []
  })

  // 新訂單
  const newOrder = reactive({
    productName: '',
    productPrice: 0,
    bubble: [],
    bubblePrice: 0,
    cupNum: 1,
    capacity: "",
    sweet: "",
    temp: "",
    remark: "",
    discount: []
  })

  const cancelInputPanel = () => {
    // 跳出輸入面板
    screenControl.showInputPanel.back = false;
  }

  const moveToInputPanel = (item) => {
    // // 進入輸入面板
    screenControl.showInputPanel.back = true;
    screenControl.showInputPanel.panel = item;
  }

  // const clearLocalStorage = (item) => {
  //   // 清空名為 item 的 LocalStorage
  //   if(localStorage.getItem(item)){
  //     let temporaryArr = JSON.parse(localStorage.getItem(item));
  //     temporaryArr.length = 0;
  //     localStorage.setItem(item,JSON.stringify(temporaryArr));
  //   }
  // }



  return {
    // const
    test,
    myChooseMap,
    drinkMenuData,
    screenControl,
    detailData,
    originNewOrder,
    newOrder,

    // computed

    // function
    cancelInputPanel,
    moveToInputPanel,
  }
})

// export const drinkList = defineStore({

//   id: "drinkList",
//   state: () => ({
//     myChooseMap: {
//       navIndex: 0,
//       menuIndex: 0
//     },
//     drinkMenuData: drinkMenuData,
//     screenControl: {
//       showDetail: ref(false),
//       showInputPanel:{
//         back: false,
//         panel: 'discount'
//       }
//     },
//     detailData: {
//       btnCapacity: ref(['中杯', '大杯']),
//       btnTemp: ref(['多冰', '正常冰', '少冰', '去冰', '熱一點', '熱的', '溫的', '常溫']),
//       btnSweet: ref(['全糖', '7分糖', '5分糖', '3分糖', '1分糖', '無糖']),
//       btnAddBubble: ref(['珍珠', '黃金珍珠', '焙烏龍茶凍']),
//       btnCupNum: ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
//       btnDiscount: ref(['環保杯', '分享瓶', '分享瓶回收000', '活動1', '活動2'])

//     },
//     OriginNewOrder: ref({ // 空的物件，reset用
//       productName: '',
//       productPrice: 0,
//       bubble: [],
//       cupNum: 0,
//       capacity: "",
//       sweet: "",
//       temp: "",
//       remark: "",
//       discount: []
//     }),
//     newOrder: ({
//       productName: '',
//       productPrice: 0,
//       bubble: [],
//       cupNum: 0,
//       capacity: "",
//       sweet: "",
//       temp: "",
//       remark: "",
//       discount: []
//     })
//   }),
//   getters: {

//   },
//   actions: {
//     callLog() {
//       console.log(this.index);
//     },
//     cancelInputPanel(){
//       // 跳出輸入面板
//       this.screenControl.showInputPanel.back = false;
//     },
//     moveToInputPanel( item ){
//       // 進入輸入面板
//       this.screenControl.showInputPanel.back = true;
//       this.screenControl.showInputPanel.panel = item;
//     },
//   }

// })