<template>
  <div class="container">
    <h3 class="path"><router-link to="index" class="orange">主页</router-link> / 发布主题</h3>
    <div class="content">
      <h4 class="title">
        <input type="text" placeholder="输入标题" v-model=title minlength=4>
      </h4>
      <div class="type">
        <span>发布板块</span>
        <div class="selected">
          <select v-model=type>
            <option value="dev">测试</option>
            <option value="ask">问答</option>
            <option value="share">分享</option>
            <option value="job">招聘</option>
          </select>
        </div>
      </div>
      <textarea placeholder="输入内容......" v-model="text"></textarea>
      <div class="btn">
        <button @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        type: null,
        text: ''
      }
    },
    methods: {
      // 发布新主题
      submit () {
        // 标题长度必须>5， 否则提交失败
        if (this.title.length < 5) {
          this.$toast.center('标题字数太少，必须大于等于5')
          return
        }
        if (!this.type) {
          this.$toast.center('请选择要发布的板块')
          return
        }
        if (!this.text) {
          this.$toast.center('内容不能为空')
          return
        }
        this.$loading('正在提交')
        this.$http.post('https://cnodejs.org/api/v1/topics', {
          accesstoken: ' 4fc3f28f-28e4-4d81-9211-87d071f0156b',
          title: this.title,
          tab: this.type,
          content: this.text
        }).then((res) => {
          this.$loading.close()
          if (res.status === 200) {
            if (res.data) {
              if (res.data.success) {
                this.$router.push({
                  path: 'article',
                  query: {
                    id: res.data.topic_id
                  }
                })
              } else {
                this.$toast.center('提交失败')
              }
            }
          }
        }, () => {
          this.$loading.close()
          this.$toast.center('提交失败')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang=less scoped>
  .container {
    .content {
      display: flex;
      flex-direction: column;
      padding: .2rem .2rem;
      .title {
        margin: .2rem 0;
        padding-left: .3rem;
        line-height: .6rem;
        border: 1px solid #999;
        border-radius: 3px;
      }
      .type {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: .2rem;
        margin-bottom: .2rem;
        padding-left: .3rem;
        line-height: .6rem;
        .selected {
          position: relative;
          height: .6rem;
          line-height: .6rem;
          select {
            padding-left: .2rem;
            width: 4rem;
            height: .6rem;
            margin-left: .2rem;
            border-radius: 3px;
          }
          &:before {
            position: absolute;
            right: .2rem;
            top: .05rem;
            width: .3rem;
            height: .3rem;
            border: 1px solid #999;
            border-top: none;
            border-left: none;
            transform: rotate(45deg);
            content: " ";
          }
        }
      }
      textarea {
        margin: .4rem 0;
        height: 45vh;
        padding: .2rem;
        line-height: .6rem;
        border-radius: 3px;
        overflow: auto;
      }
      .btn {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        button {
          margin-bottom: .4rem;
          margin-right: .2rem;
          width: 2rem;
          height: .6rem;
          line-height: .6rem;
          font-size: .36rem;
          color: #fff;
          background-color: #80bd01;
          border-radius: 3px;
        }
      }
    }
  }
</style>
