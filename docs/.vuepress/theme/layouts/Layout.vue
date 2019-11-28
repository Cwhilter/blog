<template>
  <div id="main-layout">
    <div id="content">
      <!-- 左侧导航 -->
      <div class="sidebar">
        <div class="personal-info">
          <div class="profile-head"></div>
          <div class="personal-name">whilter</div>
        </div>
        <div class="nav-content">
          <div
            class="nav-first-title"
            v-for="item in $site.themeConfig.sidebar"
            @click="navLink(item.link)"
          >
            <span>{{item.title}}</span>
          </div>
        </div>
        <div class="quotes">
          <div>talk is cheap</div>
          <div>show me the code</div>
          <div class="contact">
            <a href="www.baidu.com">
              <i class="iconfont icon-zhihu"></i>
            </a>
            <a href="https://github.com/Cwhilter" target="_blank">
              <i class="iconfont icon-github"></i>
            </a>
            <a href="www.baidu.com">
              <i class="iconfont icon-xinlangweibo"></i>
            </a>
            <a href="www.baidu.com">
              <i class="iconfont icon-my_light"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="container" style="overflow: auto">
        <!-- 首页列表 -->
        <!-- <scroll :wheel-size="40" :resize="resize" :size="0.6"> -->
        <div class="pages-list" v-if="$page.frontmatter.home">
          <div class="lg-screen">
            <div class="col">
              <articleSummaryChunk v-for="(item,index) in filterPages(3, 0)" :key="index" :articleInfo="item"/>
            </div>
            <div class="col">
              <articleSummaryChunk v-for="(item,index) in filterPages(3, 1)" :key="index" :articleInfo="item"/>              
            </div>
            <div class="col">
              <articleSummaryChunk v-for="(item,index) in filterPages(3, 2)" :key="index" :articleInfo="item"/>              
            </div>
          </div>
          <div class="sm-screen">
            <div class="col">
              <articleSummaryChunk v-for="(item,index) in filterPages(2, 0)" :key="index" :articleInfo="item"/>
            </div>
            <div class="col">
              <articleSummaryChunk v-for="(item,index) in filterPages(2, 1)" :key="index" :articleInfo="item"/>
            </div>
          </div>
        </div>
        <!-- 文章内容 -->
        <div class="page-content" v-if="!$page.frontmatter.home">
          <Content />
        </div>
        <!-- </scroll> -->
      </div>
      <!-- <div class="directory"></div> -->
    </div>
  </div>
</template>

<script>
import { EventUtil } from "../../assets/util"
import scroll from "../components/scroll.vue"
import '../styles/theme.less'
import articleSummaryChunk from '../components/articleSummaryChunk'
export default {
  data() {
    return {
      resize: false,
      nav: "/"
    }
  },
  watch: {
    $route(to, from) {
      this.scrollResize()
    }
  },
  methods: {
    scrollResize() {
      this.resize = !this.resize
    },
    navLink(link) {
      this.nav = link
      this.scrollResize()
      this.$router.push({ path: "/" })
      this.$nextTick(function() {
        this.scrollResize()
      })
    },
    filterPages(cols, col_index) {
      return this.pages.filter((item, index) => {
        return index % cols == col_index
      })
    }
  },
  mounted() {
    this.scrollResize()
    EventUtil.add(window, "resize", this.scrollResize)
  },
  computed: {
    pages: function() {
      return this.$site.pages
        .filter(item => {
          return item.path.indexOf(this.nav) > -1 && !item.frontmatter.home
        })
        .sort(function(value1, value2) {
          return value1 - value2
        })
    }
  },
  updated() {
    console.log("update")
  },
  components: {
    scroll,
    articleSummaryChunk
  }
}
</script>
<style lang="less" scoped>
</style>
