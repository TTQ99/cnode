<template>
  <div class="container">
    <textarea v-model="str" name="" id="" cols="30" rows="auto"></textarea>
    <button @click="transfer">转换</button>
    <pre>{{newStr}}</pre>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        str: '',
        newStr: ''
      }
    },
    methods: {
      transfer () {
        console.log(this.str)
        let a = this.str
        a = a.replace(/<.*>/g, '')
        // a = a.replace(/{ :.*/g, '{')
        a = a.replace(/{/g, ':{')
        // a = a.replace(/ : \S*/g, ':123,')
        // a = a.replace(/".*/g, '123,')
        this.newStr = a
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../style/base.less";
  .container {
    margin: .5rem .05rem .5rem .05rem;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    textarea {
      width: 100%;
      border: 1px solid #000;
    }
  }
</style>
