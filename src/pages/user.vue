<template>
  <div class="container">
    <h3 class=path><router-link to="index" class="orange">主页</router-link> / 用户</h3>
    <div class=content v-if=userInfo>
      <img :src="userInfo.avatar_url" alt="">
      <h2>{{userInfo.loginname}}</h2>
      <div class="logout"><button @click="logout">退出</button></div>
      <div class=list>
        <div class="tab">
          <h4 :class="{'active': replyList}" @click="replyList=true">回复内容</h4><h4 :class="{'active': !replyList}" @click="replyList=false">发布内容</h4>
        </div>
        <ul v-if="replyList">
          <li v-for="item in userInfo.recent_replies">
            <img :src="item.author.avatar_url" alt="">
            <div>
              <h5><router-link :to="{name:'article',query:{id: item.id}}">{{item.title}}</router-link></h5>
              <p>
                <span>{{item.author.loginname}}</span>
                <span>{{item.last_reply_at | getTime}}</span>
              </p>
            </div>
          </li>
        </ul>
        <ul v-if="!replyList">
          <li v-for="item in userInfo.recent_topics">
            <img :src="item.author.avatar_url" alt="">
            <div>
              <h5><router-link :to="{name:'article',query:{id: item.id}}">{{item.title}}</router-link></h5>
              <p>
                <span>{{item.author.loginname}}</span>
                <span>{{item.last_reply_at | getTime}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store/store'
  export default {
    data () {
      return {
        userInfo: null,
        replyList: true
      }
    },
    created () {
      if (!this.$store.state.username) {
        this.$router.replace({name: 'index'})
        return
      }
      this.$loading('正在加载')
      // 获取用户信息
      this.$http.get('https://cnodejs.org/api/v1/user/' + this.$store.state.username).then((res) => {
        this.$loading.close()
        if (res.status === 200) {
          if (res.data) {
            if (res.data.success) {
              this.userInfo = res.data.data
            }
          }
        }
      }, () => {
        this.$loading.close()
        this.$toast.center('获取用户信息失败')
      })
    },
    methods: {
      // 退出登录，清空localStorage缓存和vuex
      logout () {
        this.$store.commit('setLogin', {
          login: false,
          username: ''
        })
        window.localStorage.removeItem('cnodeToken')
        this.$router.replace({name: 'index'})
      }
    },
    store
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang=less scoped>
  .container {
    .path {
      padding-left: .4rem;
      background-color: #f6f6f6;
      color: #999;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: .2rem;
      min-height: 60vh;
      background-color: #fff;
      >img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      >h2 {
        font-size: .4rem;
        color: #80bd01;
      }
      .logout {
        button {
          width: 3rem;
          height: .6rem;
          color: #fff;
          background-color: #adba92;
          border-radius: 3px;
        }
      }
      .list {
        padding: .4rem .2rem;
        margin-bottom: .2rem;
        width: 100%;
        .tab {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          border: 1px solid #999;
          border-left: none;
          border-right: none;
          h4 {
            font-size: .4rem;
            color: #000;
            line-height: .8rem;
            &.active {
              color: #55a532;
              border-bottom: 2px solid #80bd01;
            }
          }
        }
        ul {
          li {
            display: flex;
            flex-direction: row;
            padding: .4rem 0;
            width: 100%;
            border-bottom: 1px solid #eee;
            img {
              margin-right: .4rem;
              width: .8rem;
              height: .8rem;
              border-radius: 3px;
            }
            div {
              width: 85%;
              h5 {
                font-size: .36rem;
                font-weight: 700;
                white-space:nowrap;
                text-overflow:ellipsis;
                -o-text-overflow:ellipsis;
                overflow: hidden;
              }
              p {
                font-size: .22rem;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              }
            }
          }
        }
      }
    }
  }
</style>
