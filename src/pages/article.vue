
<template>
  <div class="container" v-if="article">
    <h1><span class=sign>{{article | sign}}</span>{{article.title}}</h1>
    <div class="author">
      <img :src="article.author.avatar_url" alt="">
      <div class="name">
        <p>{{article.author.loginname}}</p>
        <p>{{article.visit_count}}次浏览</p>
      </div>
      <div class="time">
        <p>发布于：{{article.create_at | getTime}}</p>
        <p>最后回复：{{article.last_reply_at | getTime}}</p>
      </div>
    </div>
    <div class="content markdown-body" v-html="article.content"></div>
    <h3 class="reply-title">{{article.reply_count}}回复</h3>
    <div class="reply-list">
      <ul>
        <li v-for="(item, index) in article.replies">
          <div class="top">
            <img :src="item.author.avatar_url" alt="">
            <span>{{item.author.loginname}} · {{index+1}}楼 · {{item.create_at | getTime}}</span>
            <span class="like"><span class="upvote" @click="upvote(item)">赞</span>（{{item.ups.length}}）</span>
          </div>
          <div class="markdown-body" v-html="item.content"></div>
        </li>
      </ul>
    </div>
    <div class="reply-box">
      <textarea v-model="text" placeholder="请输入要回复的内容......"></textarea>
      <button @click="submitReply">提交</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        article: null,
        accessToken: '',
        text: ''
      }
    },
    created () {
      // 获取用户的token
      this.accessToken = window.localStorage.getItem('cnodeToken')
      // 首次加载主题
      this.getArticle()
    },
    methods: {
      // 获取主题内容
      getArticle () {
        this.$http.get('https://cnodejs.org/api/v1/topic/' + this.$route.query.id).then((res) => {
          if (res.status === 200 && res.data) {
            if (res.data.success) {
              this.article = res.data.data
            }
          }
        })
      },
      // 点赞
      upvote (val) {
        if (!this.accessToken) {
          this.$router.push({name: 'login'})
          return
        }
        this.$http.post('https://cnodejs.org/api/v1/reply/' + val.id + '/ups', {
          accesstoken: this.accessToken
        }).then((res) => {
          if (res.status === 200) {
            if (res.data) {
              if (res.data.success) {
                if (res.data.action === 'up') {
                  val.ups.push('1')
                } else {
                  val.ups.pop()
                }
              } else {
                this.$toast.center(res.data.error_msg)
              }
            }
          }
        }, () => {
          this.$toast.center('操作失败')
        })
      },
      // 回复主题
      submitReply () {
        if (!this.accessToken) {
          this.$router.push({name: 'login'})
          return
        }
        if (!this.text) {
          this.$toast.center('请填写回复内容')
          return
        }
        this.$http.post('https://cnodejs.org/api/v1/topic/' + this.$route.query.id + '/replies', {
          accesstoken: this.accessToken,
          content: this.text
        }).then((res) => {
          if (res.status === 200) {
            if (res.data && res.data.success) {
              this.getArticle()
              this.text = ''
            } else {
              this.$toast.center('提交失败')
            }
          }
        }, () => {
          this.$toast.center('网络异常')
        })
      }
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
    h1 {
      padding-left: .2rem;
      background-color: #eee;
      font-size: .45rem;
      line-height: .7rem;
      .sign {
        display: inline-block;
        margin-right: .3rem;
        width: .8rem;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        font-size: .2rem;
        color: #fff;
        background-color: #afee2d;
        border-radius: 3px;
        &.top {
          color: #fff;
          background-color: #80bd01;
        }
      }
    }
    .author {
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #eee;
      margin-bottom: .4rem;
      img {
        width: 1.5rem;
        height: 1.5rem;
        margin: .25rem .5rem;
      }
      .name {
        width: 44%;
        line-height: .6rem;
        padding-top: .4rem;
        :first-child {
          font-size: .4rem;
          color: #80bd01;
          /*margin-bottom: .2rem;*/
        }
      }
      .time {
        margin-top: .4rem;
        height: 100%;
        line-height: .6rem;
        text-align: right;
      }
    }
    .content {
      padding: 0 .2rem;
    }
    .reply-title {
      font-size: .6rem;
      line-height: 1.2rem;
      padding-left: .5rem;
      background-color: #e9e9e9;
    }
    .reply-list {
      ul {
        padding: .25rem;
        li {
          border-bottom: 1px solid #eee;
          margin-bottom: .5rem;
          padding: .2rem;
          .top {
            line-height: .8rem;
            margin-bottom: .2rem;
            img {
              width: .8rem;
              height: .8rem;
              border-radius: .1rem;
              margin-right: .5rem;
              vertical-align: middle;
            }
            span {
              font-size: .4rem;
              height: .8rem;
              line-height: .8rem;
            }
            .like {
              float: right;
              span {
                color: blueviolet;
                &.active {
                  color: #55a532;
                }
              }
            }
          }
        }
      }
    }
    .reply-box {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 0 0 .6rem 0;
      text-align: center;
      textarea {
        margin: 0 auto;
        padding: .2rem;
        width: 80%;
        height: 3rem;
        font-size: .24rem;
        line-height: .5rem;
        border: 1px solid #eee;
        border-radius: 3px;
        resize: none;
      }
      button {
        margin-top: .4rem;
        margin-right: 10%;
        width: 2rem;
        height: .6rem;
        color: #fff;
        border-radius: 3px;
        background-color: #80bd01;
      }
    }
  }
</style>
