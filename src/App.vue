<template>
  <div id="app">
    <header>
      <h1><a href="/"><img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt=""></a></h1>
      <!--<div class="search"><input type="text"></div>-->
      <nav>
        <router-link to="/index">首页</router-link>
        <router-link to="/new" v-if="$store.state.login">发布主题</router-link>
        <router-link to="/getstart">新手入门</router-link>
        <router-link to="/api">API</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/login" v-if="!$store.state.login">登录</router-link>
        <router-link to="/user" v-if="$store.state.login">用户</router-link>
        <router-link to="/info" v-if="$store.state.login">消息</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from '@/store/store'
  export default {
    name: 'app',
    date () {
      return {
        show: false,
        accessToken: null
      }
    },
    mounted () {},
    created () {
      this.accessToken = window.localStorage.getItem('cnodeToken')
      if (this.accessToken) {
        this.checkLogin()
      } else {
        this.$store.commit('setLogin', {
          login: false,
          username: '',
          token: ''
        })
      }
    },
    methods: {
      checkLogin () {
        this.$http.post('https://cnodejs.org/api/v1/accesstoken', {
          accesstoken: this.accessToken
        }).then((res) => {
          this.$loading.close()
          if (res.status === 200) {
            if (res.data.success) {
              this.$store.commit('setLogin', {
                login: true,
                username: res.data.loginname,
                token: this.accessToken
              })
            }
          }
        }, () => {
          window.localStorage.removeItem('cnodeToken')
        })
      }
    },
    store
}
</script>

<style lang="less">
  @import "style/base.less";
  @import "style/markdown.css";
  #app {
    padding: 0 .05rem;
    header {
      margin: 0;
      background-color: #444;
      h1 {
        text-align: center;
        a {
          .h(60);
          .lh(60);
          img {
            .w(100);
            vertical-align: middle;
          }
        }
      }
      .search {
        text-align: center;
        input {
          .w(130);
          .h(10);
        }
      }
      nav {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 0 .4rem;
        .lh(30);
        .fs(14);
        a {
          color: #c8c6c8;
        }
      }
    }
  }
</style>
