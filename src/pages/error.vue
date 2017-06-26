<template>
  <div class="container">
    <div class="content">
      <img src="../assets/nodata.png" alt="">
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .container {
    margin: .5rem .05rem .5rem .05rem;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #d4d4d4;
      height: 60vh;
      img {
        width: 4rem;
      }
    }
  }
</style>
