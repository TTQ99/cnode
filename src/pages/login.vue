<template>
  <div class="container">
    <h3><router-link to="index" class="orange">主页</router-link> / 登录</h3>
    <div class="content">
      <span>输入Access Token</span>
      <input type="text" v-model="token">
      <button :class="{'disabled': !token}" :disabled="!token" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        token: ''
      }
    },
    methods: {
      login () {
        this.$loading('正在登陆')
        this.$http.post('https://cnodejs.org/api/v1/accesstoken', {
          accesstoken: this.token
        }).then((res) => {
          this.$loading.close()
          if (res.status === 200) {
            if (res.data.success) {
              window.localStorage.removeItem('cnodeToken')
              window.localStorage.setItem('cnodeToken', this.token)
              this.$store.commit('setLogin', {
                login: true,
                username: res.data.loginname,
                token: this.token
              })
              this.$router.replace({name: 'user'})
            }
          }
        }, () => {
          this.$loading.close()
          this.$toast.center('登录失败')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../style/base.less";
  .container {
    margin: .5rem .05rem .5rem .05rem;
    min-height: 80vh;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    h3 {
      padding-left: .4rem;
      .h(28);
      .lh(28);
      .fs(12);
      background-color: #f6f6f6;
      color: #999;
    }
    .content {
      display: flex;
      flex-direction: column;
      padding: 2rem 0;
      align-items: center;
      input {
        margin: .3rem 0;
        width: 60%;
        height: .6rem;
        border: 1px solid #999;
        border-radius: 3px;
      }
      button {
        width: 3rem;
        height: .6rem;
        color: #fff;
        background-color: #80bd01;
        border-radius: 3px;
        &.disabled {
          background-color: #adba92;
        }
      }
    }
  }
</style>
