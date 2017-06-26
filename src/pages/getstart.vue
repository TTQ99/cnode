<template>
  <div class="container">
    <h3><router-link to="index" class="orange">主页</router-link> / Node.js新手入门</h3>
    <div class="content">
      <div class="list-box">
        <h4 class="title">Node.js入门</h4>
        <ul class="list">
          <li>
            <p>《快速搭建 Node.js 开发环境以及加速 npm》</p>
            <p><a href="http://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html"  target="_blank">http://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html</a></p>
          </li>
          <li>
            <p>《Node.js 包教不包会》</p>
            <p><a href="https://github.com/alsotang/node-lessons"  target="_blank">https://github.com/alsotang/node-lessons</a></p>
          </li>
          <li>
            <p>《ECMAScript 6入门》</p>
            <p><a href="http://es6.ruanyifeng.com/"  target="_blank">http://es6.ruanyifeng.com/</a></p>
          </li>
          <li>
            <p>《七天学会NodeJS》</p>
            <p><a href="https://github.com/nqdeng/7-days-nodejs"  target="_blank">https://github.com/nqdeng/7-days-nodejs</a></p>
          </li>
        </ul>
        <h4 class="title">Node.js 资源</h4>
        <ul class="list">
          <li>
            <p>《前端资源教程》</p>
            <p><a href="https://cnodejs.org/topic/56ef3edd532839c33a99d00e"  target="_blank">https://cnodejs.org/topic/56ef3edd532839c33a99d00e</a></p>
          </li>
          <li>
            <p>《国内的 npm 镜像源》</p>
            <p><a href="http://cnpmjs.org/"  target="_blank">http://cnpmjs.org/</a></p>
          </li>
          <li>
            <p>《node weekly》</p>
            <p><a href="http://nodeweekly.com/issues"  target="_blank">http://nodeweekly.com/issues</a></p>
          </li>
          <li>
            <p>《node123-node.js中文资料导航》</p>
            <p><a href="https://github.com/youyudehexie/node123"  target="_blank">https://github.com/youyudehexie/node123</a></p>
          </li>
          <li>
            <p>《A curated list of delightful Node.js packages and resources》</p>
            <p><a href="https://github.com/sindresorhus/awesome-nodejs"  target="_blank">https://github.com/sindresorhus/awesome-nodejs</a></p>
          </li>
          <li>
            <p>《Node.js Books》</p>
            <p><a href="https://github.com/pana/node-books"  target="_blank">https://github.com/pana/node-books</a></p>
          </li>
        </ul>
        <h4 class="title">Node.js 名人</h4>
        <ul class="list">
          <li>
            <p>《名人堂》</p>
            <p><a href="https://github.com/cnodejs/nodeclub/wiki/名人堂"  target="_blank">https://github.com/cnodejs/nodeclub/wiki/名人堂</a></p>
          </li>
        </ul>
        <h4 class="title">Node.js 服务器</h4>
        <div class="link">新手搭建 Node.js 服务器，推荐使用无需备案的 <a href="https://www.digitalocean.com/" target=_blank>DigitalOcean(https://www.digitalocean.com/)</a></div>
      </div>
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
  @import '../style/base.less';
 .container {
   margin: .5rem .05rem .5rem .05rem;
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
     padding: .2rem .5rem;
     .title {
       margin-bottom: .2rem;
       font-weight: 600;
       .fs(24);
       border-bottom: 1px solid #eee;
     }
     .list {
       li {
         p {
           font-size: .24rem;
           margin: .3rem 0;
           &:first-child {
             font-weight: 700;
           }
           a {
             color: blueviolet;
           }
         }
       }
     }
     .link {
       font-size: .14rem;
       margin: .3rem 0;
       a {
         color: blueviolet;
       }
     }
   }
 }
</style>
