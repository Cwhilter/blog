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
            <a target="_blank" href="https://www.zhihu.com/people/wang-peng-40-82/activities">
              <i class="iconfont icon-zhihu"></i>
            </a>
            <a target="_blank" href="https://github.com/Cwhilter">
              <i class="iconfont icon-github"></i>
            </a>
            <a target="_blank" href="https://www.baidu.com">
              <i class="iconfont icon-xinlangweibo"></i>
            </a>
            <a target="_blank" href="http://www.whilter.info">
              <i class="iconfont icon-my_light"></i>
            </a>
          </div>
        </div>
      </div>
      <div v-else class="sidebar content-side">
        <router-link class="blog-img-container" to="/"><span class="blog-img"></span></router-link>
        <!-- <div class="return-home" @click="() => this.$router.push('/')"></div> -->
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
        <div class="pages-list" v-show="isHomePage">
          <div class="search-container">
            <SearchBox/>
          </div>
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
        <div id="page-content" class="page-content" v-show="!isHomePage">
          <Content />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventUtil, debounce } from "../../assets/util"
import '../styles/iconfont.css'
// import '../styles/theme.less'
import articleSummaryChunk from '../components/articleSummaryChunk'
import moment from 'moment'
import SearchBox from '@SearchBox'
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
    activeSidebar() {
      const sidebarLinks = [].slice.call(document.querySelectorAll('.headers-list li'))
    },
    navLink(link) {
      this.nav = link
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
  },
  computed: {
    pages() {
      return this.$site.pages
        .filter(item => {
          return item.path.indexOf(this.nav) > -1 && !item.frontmatter.home
        })
        .sort(function(value1, value2) {
          return moment(value1.lastUpdated, 'MM-DD-YYYY, hh:mm:ss aA').unix() - moment(value2.lastUpdated, 'MM-DD-YYYY, hh:mm:ss aA').unix()
        })
    },
    isHomePage() {
      return this.$page.frontmatter.home
    },
    headers() {
      return this.$page.headers
    }
  },
  updated() {
    const hash = this.$route.hash
    window.document.getElementById(hash.slice(1) || 'page-content').scrollIntoView()
  },
  components: {
    articleSummaryChunk,
    SearchBox
  }
}
</script>
<style lang="less" scoped>
</style>
