<template>
  <div id="main-layout">
    <div id="content">
      <!-- 左侧导航 -->
      <div class="sidebar home-side" v-if="isHomePage">
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
            <span :class="{'active': nav === item.link}">{{item.title}}</span>
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
      <div v-else class="sidebar content-side">
        <div class="return-home" @click="() => this.$router.push('/')"><span class="blog-img"></span>whilter的个人博客</div>
        <ul class="headers-list">
          <h3>{{$page.title}}</h3>
          <li
            v-for="(item, index) in headers"
            :title="item.title"
            :key="index"
            :style="{'padding-left': (item.level - 2) * 1.2 + 'rem'}"
            @click="handleGoHeader(item)">
            {{item.title}}
          </li>
        </ul>
      </div>
      <div class="container" style="overflow: auto">
        <!-- 首页列表 -->
        <div class="pages-list" v-if="isHomePage">
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
        <div class="page-content" v-else>
          <Content />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventUtil, debounce } from "../../assets/util"
import '../styles/theme.less'
import '../styles/iconfont.css'
import articleSummaryChunk from '../components/articleSummaryChunk'
export default {
  data() {
    return {
      resize: false,
      nav: "/"
    }
  },
  watch: {
    
  },
  methods: {
    onScroll: debounce(function() {
      this.activeSidebar()
    }, 500),
    activeSidebar() {
      const sidebarLinks = [].slice.call(document.querySelectorAll('.headers-list li'))
    },
    navLink(link) {
      this.nav = link
      this.$router.push({ path: "/" })
    },
    filterPages(cols, col_index) {
      return this.pages.filter((item, index) => {
        return index % cols == col_index
      })
    },
    handleGoHeader(item) {
      // this.$router.push({ path: this.$route.path + '#' + item.title })
      document.getElementById(item.slug).scrollIntoView()
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  computed: {
    pages() {
      return this.$site.pages
        .filter(item => {
          return item.path.indexOf(this.nav) > -1 && !item.frontmatter.home
        })
        // .sort(function(value1, value2) {
        //   return value1 - value2
        // })
    },
    isHomePage() {
      return this.$page.frontmatter.home
    },
    headers() {
      return this.$page.headers
    }
  },
  updated() {
  },
  components: {
    articleSummaryChunk,
  }
}
</script>
<style lang="less" scoped>
</style>
