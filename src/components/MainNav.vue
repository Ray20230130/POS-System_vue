<script setup>
</script>


<template>
  <div class="nav-wrap">
    <div class="logo">
      <img
        src="../assets/images/流心飲料(長).png"
        alt=""
      >
    </div>
    <a href="#">掛單</a>
    <a href="#">內部平台</a>
    <a href="#">外部平台</a>
    <div class="btns">
      <button class="order">訂單</button>
      <button class="manage">管理</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-wrap {
  // background-color: darkorchid;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 80px;
    margin-left: 20px;
    img {
      width: 100%;
    }

  }
  a{
    color: #fff;
    font-weight: 900;

  }
  .btns{
    button{
      border: none;
      background-color: burlywood;
      padding: .2em .5em;
      border-radius: 5px;
      margin: 0 .2em;
    }
  }
}
</style>