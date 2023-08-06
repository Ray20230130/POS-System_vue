<script setup>
</script>


<template>
  <div class="product-menu-wrap">
    <div class="list">
      <div class="item">
        <button disabled>電子券</button>
      </div>
      <div class="item">
        <button disabled>套餐</button>
      </div>
      <div class="item">
        <button disabled>會員</button>
      </div>
      <div class="item">
        <button disabled>開錢櫃</button>
      </div>
      <div class="item">
        <button disabled>重新點餐</button>
      </div>
      <div class="item">
        <button disabled>清空列表</button>
      </div>
      <div class="item">
        <button disabled>掛單</button>
      </div>
      <div class="item">
        <button disabled>瀏覽</button>
      </div>
    </div>
    <div class="checkout">
      <button>
        <font-awesome-icon :icon="['fas', 'sack-dollar']" />
        結帳
        </button>
      </div>
  </div>
</template>

<style lang="scss" scoped>
.product-menu-wrap {
  width: 100%;
  height: 100%;
  padding: 0px;
  display: flex;

  .list {
    flex-basis: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    .item {
      flex-basis: 25%;
      height: 75px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      button{
        width: 100%;
        height: 100%;
        background-color: rgb(200, 219, 240);
        box-shadow: 2px 2px 2px #7f8492;
        border: none;
        border-radius: 10px;
      }
    }
  }

  .checkout {
    flex-basis: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    button{
        width: 100%;
        height: 100%;
        background-color: rgb(11, 50, 95);
        box-shadow: 2px 2px 2px #48526d;
        color: #fff;
        border: none;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.5em;
      }

  }

}
</style>