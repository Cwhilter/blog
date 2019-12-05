<style lang="less" scoped>

</style>
<template>
  <div>
    <div class="page-chunk">
      <div class="content-summary">
        <div class="title">{{articleInfo.frontmatter.title}}</div>
        <div class="summary">
          <img
            v-if="articleInfo.frontmatter.illustration"
            :src="'../images/' + articleInfo.frontmatter.illustration.link"
            alt
            align="top"
            :class="[articleInfo.frontmatter.illustration.position || 'right']"
          />
          <p>{{articleInfo.frontmatter.summary.first}}</p>
          <p>{{articleInfo.frontmatter.summary.second}}</p>
        </div>
      </div>
      <div class="page-chunk-footer">
        <i class="iconfont icon-news_hot_light tag-icon"></i>
        <span>{{articleInfo.frontmatter.tag.join('、')}}</span>
        <router-link :to="articleInfo.path">查看详情 >></router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  }
}
</script>