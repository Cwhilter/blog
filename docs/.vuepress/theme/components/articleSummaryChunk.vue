<style lang="less" scoped>
.page-chunk {
  border-radius: 10px;
  margin-bottom: 1.5rem;
  width        : 100%;
  background   : #fff;
  background   : rgba(255, 255, 255, 0.5);
  box-shadow   : 0 1px 1px rgba(0, 0, 0, 0.2);

  .content-summary {
    color   : #666;
    padding : 1rem 1rem 0 1rem;
    height  : calc(~'100% - 45px');
    overflow: hidden;

    .title {
      height     : 50px;
      line-height: 50px;
      font-size  : 18px;
      font-weight: 550;
    }

    .summary {
      font-size  : 12px;
      line-height: 2;
      height     : calc(~'100% - 50px');

      p {
        text-indent: 2em;
      }
      img {
        max-height: 500px;
      }
      img.right {
        float    : right;
        max-width: 200px;
      }

      img.left {
        float    : left;
        max-width: 150px;
      }

      img.top {
        max-width: 100%;
        max-height: 300px;
        margin: 0 auto;
        display: block;
      }
    }
  }

  .page-chunk-footer {
    padding-left : 1rem;
    padding-right: 1rem;
    border-top   : 1px solid #eaeaea;
    height       : 45px;
    line-height  : 45px;
    color        : #bbb;
    font-size    : 14px;

    a {
      float       : right;
    }

    .tag-icon {
      // margin-left   : 20px;
      margin-right  : 8px;
      vertical-align: middle;
    }

    .icon-php {
      font-size: 28px;
    }
  }
}
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