<template>
  <div class="container">
    <div class="navbar">
      <span :class="{'active':type == 'all'}" @click="chargeTab('all')">全部</span>
      <span :class="{'active':type == 'good'}" @click="chargeTab('good')">精华</span>
      <span :class="{'active':type == 'share'}" @click="chargeTab('share')">分享</span>
      <span :class="{'active':type == 'ask'}" @click="chargeTab('ask')">问答</span>
      <span :class="{'active':type == 'job'}" @click="chargeTab('job')">招聘</span>
      <span :class="{'active':type == 'dev'}" @click="chargeTab('dev')">测试</span>
    </div>
    <ul>
      <li v-for="item in list">
        <img :src="item.author.avatar_url" alt="">
        <div  class="sign">
          <span :class="{'top': item.top || item.good}">{{item | sign(item)}}</span>
        </div>
        <div class="title-box">
            <p class="title"><router-link :to="{name:'article',query:{id: item.id}}">{{item.title}}</router-link></p>
            <div class="number">
              <p><span class="reply">{{item.reply_count}}</span> / {{item.visit_count}}</p>
              <p class="time">{{item.last_reply_at | getTime}}</p>
            </div>
        </div>
      </li>
    </ul>
    <mugen-scroll :handler="getTips" :should-handle="!loading"></mugen-scroll>
  </div>
</template>

<script>
  import mugenScroll from 'vue-mugen-scroll'
  export default {
    data () {
      return {
        type: 'all',
        list: [],
        loading: false,
        page: 0,
        nomore: false
      }
    },
    created () {
      this.getTips()
    },
    methods: {
      // 获取对应主题的文章列表
      getTips () {
        if (this.nomore) {
          this.$toast.center('暂无更多数据...')
          return
        }
        this.page ++
        this.loading = true
        this.$loading('正在加载')
        this.$http.get('https://cnodejs.org/api/v1/topics?page=' + this.page + '&limit=20&tab=' + this.type + '&mdrender=true').then((res) => {
          if (res.status === 200 && res.data) {
            this.$loading.close()
            this.loading = false
            if (res.data.success) {
              if (res.data.data.length > 0) { // 数组为空，没有更多数据无需在请求
                this.list = this.list.concat(res.data.data)
              } else {
                this.nomore = true
              }
            } else {
              this.$toast.center('请求失败')
            }
          }
        }, () => {
          this.$loading.close()
          this.loading = false
          this.$router.push({path: 'error'})
        })
      },
      // 切换主题
      chargeTab (val) {
        // 重置请求选项
        this.page = 0
        this.nomore = false
        this.list = []
        this.type = val
        this.getTips()
      }
    },
    components: {
      mugenScroll
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
    .navbar {
      padding-left: .5rem;
      height: .8rem;
      line-height: .8rem;
      font-size: .3rem;
      color: #999;
      background-color: #f6f6f6;
      span {
        height: .7rem;
        padding: 0 .3rem;
        color: #80bd01;
        border-radius: 3px;
        &.active {
          color: #fff;
          background-color: #80bd01;
        }
      }
    }
    ul {
      li {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 1.6rem;
        line-height: 1.6rem;
        border-bottom: 1px solid #eee;
        img {
          width: 1rem;
          padding: .3rem;
        }
        .sign {
          width: 1.2rem;
          span {
            padding: 2px 4px;
            height: .6rem;
            font-size: .26rem;
            color: #999;
            background-color: #e5e5e5;
            border-radius: 3px;
            &.top {
              color: #fff;
              background: #80bd01;
            }
          }
        }
        .title-box {
          width: 68%;
          line-height: .8rem;
          .title {
            margin-top: .2rem;
            width: 100%;
            height: .6rem;
            white-space:nowrap;
            text-overflow:ellipsis;
            -o-text-overflow:ellipsis;
            overflow: hidden;
          }
          .number {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
        }
      }
    }
  }
</style>
