<template>
  <div class="container">
    <h3 class=path><router-link to="index" class="orange">主页</router-link> / 消息</h3>
    <div class="content">
      <div class=list>
        <div class="tab">
          <h4 :class="{'active': read}" @click="read=true">已读消息</h4><h4 :class="{'active': !read}" @click="read=false">未读消息</h4>
        </div>
        <ul v-if="read">
          <li v-for="item in readList">
            <div>
              <img :src="item.author.avatar_url" alt="">
              <span class="name">{{item.author.loginname}}</span>&nbsp;在话题中 &nbsp;
              <router-link :to="{name:'article',query:{id: item.topic.id}}">{{item.topic.title}}</router-link>&nbsp;
              <span>@你</span>
            </div>
            <div class="markdown-body text" v-html="item.reply.content"></div>
          </li>
          <li v-if="readList.length === 0" class="noinfo">暂无消息</li>
        </ul>
        <ul v-if="!read">
          <li v-for="item in unreadList">
            <div>
              <img :src="item.author.avatar_url" alt="">
              <span class="name">{{item.author.loginname}}</span>&nbsp;在话题中 &nbsp;
              <router-link :to="{name:'article',query:{id: item.topic.id}}">{{item.topic.title}}</router-link>&nbsp;
              <span>@你</span>
            </div>
            <div class="markdown-body text" v-html="item.reply.content"></div>
          </li>
          <li v-if="unreadList.length === 0" class="noinfo">暂无消息</li>
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
        read: true,
        accessToken: '',
        readList: [],
        unreadList: []
      }
    },
    created () {
      if (!this.$store.state.token) {
        this.$router.replace({name: 'index'})
        return
      } else {
        this.accessToken = this.$store.state.token
      }
      this.$loading('正在加载')
      // 获取用户信息
      this.$http.get('https://cnodejs.org/api/v1/messages?accesstoken=' + this.accessToken).then((res) => {
        this.$loading.close()
        if (res.status === 200) {
          if (res.data) {
            if (res.data.success) {
              this.readList = res.data.data.has_read_messages
              this.unreadList = res.data.data.hasnot_read_messages
            } else {
              this.$toast.center('加载失败')
            }
          }
        }
      }, () => {
        this.$loading.close()
        this.$toast.center('网络异常')
      })
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
      .list {
        padding: .4rem .2rem;
        margin-bottom: .2rem;
        width: 100%;
        .tab {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          border-bottom: 1px solid #999;
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
            flex-direction: column;
            padding: .4rem 0;
            border-bottom: 1px solid #eee;
            &.noinfo {
              border: none;
              text-align: center;
            }
            div {
              line-height: .6rem;
              img {
                margin-right: .4rem;
                width: .8rem;
                height: .8rem;
                border-radius: 3px;
                vertical-align: middle;
              }
              .name {
                color: #80bd01;
              }
              a {
                color: blueviolet;
              }
            }
            .text {
              margin-top: .2rem;
            }
          }
        }
      }
    }
  }
</style>
