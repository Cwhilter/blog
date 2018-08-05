<template>
    <div id="main-layout">
        <div id="content">
            <div class="sidebar">
                <scroll :size="0.4">
                    <div class="personal-info">
                        <div class="profile-head"></div>
                        <div class="personal-name">whilter</div>
                        
                    </div>
                    <div class="nav-content">
                        <div class="nav-first-title" v-for="item in $site.themeConfig.sidebar" @click="navLink(item.link)">
                            <span>{{item.title}}</span> 
                        </div>
                    </div>
                    <div class="quotes">
                        <div>talk is cheap</div>
                        <div>show me the code</div>
                        <div class="contact">
                            <a href="www.baidu.com"><i class="iconfont icon-zhihu"></i></a>
                            <a href="https://github.com/Cwhilter" target="_blank"><i class="iconfont icon-github"></i></a>
                            <a href="www.baidu.com"><i class="iconfont icon-xinlangweibo"></i></a>
                            <a href="www.baidu.com"><i class="iconfont icon-my_light"></i></a>
                        </div>
                        
                    </div>
               </scroll> 
            </div>
            <div class="container">
                <scroll :wheel-size="40" :resize="resize" :size="0.6">
                    <div class="pages-list" v-if="$page.frontmatter.home">
                        <div class="lg-screen">
                            <div class="col">
                                <template v-for="(item,index) in filterPages(3,0)">
                                    <div class="page-chunk">
                                        <div class="content-summary">
                                            <div class="title">
                                                {{item.frontmatter.title}}
                                            </div>
                                            <div class="summary">
                                                <img :src="'/images/' + item.frontmatter.illustration.link" alt="" align="top" :class="[item.frontmatter.illustration.position]">
                                                <p>{{item.frontmatter.summary.first}}</p>
                                                <p>{{item.frontmatter.summary.second}}</p>
                                            </div>
                                        </div>
                                        <div class="page-chunk-footer">
                                            <date :time="item.lastUpdated"/>
                                            <i class="iconfont icon-news_hot_light tag-icon"></i> <span v-for="list in item.frontmatter.tag">{{list}}  </span>
                                            <router-link :to="item.path">查看详情 >></router-link> </span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="col">
                               <template v-for="(item,index) in filterPages(3,1)">
                                    <div class="page-chunk">
                                        <div class="content-summary">
                                            <div class="title">
                                                {{item.frontmatter.title}}
                                            </div>
                                            <div class="summary">
                                                <img :src="'/images/' + item.frontmatter.illustration.link" alt="" align="top" :class="[item.frontmatter.illustration.position]">
                                                <p>{{item.frontmatter.summary.first}}</p>
                                                <p>{{item.frontmatter.summary.second}}</p>
                                            </div>
                                        </div>
                                        <div class="page-chunk-footer">
                                            <date :time="item.lastUpdated"/>
                                            <i class="iconfont icon-news_hot_light tag-icon"></i> <span v-for="list in item.frontmatter.tag">{{list}}  </span>
                                            <router-link :to="item.path">查看详情 >></router-link> </span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="col">
                                <template v-for="(item,index) in filterPages(3,2)">
                                    <div class="page-chunk">
                                        <div class="content-summary">
                                            <div class="title">
                                                {{item.frontmatter.title}}
                                            </div>
                                            <div class="summary">
                                                <img :src="'/images/' + item.frontmatter.illustration.link" alt="" align="top" :class="[item.frontmatter.illustration.position]">
                                                <p>{{item.frontmatter.summary.first}}</p>
                                                <p>{{item.frontmatter.summary.second}}</p>
                                            </div>
                                        </div>
                                        <div class="page-chunk-footer">
                                            <date :time="item.lastUpdated"/>
                                            <i class="iconfont icon-news_hot_light tag-icon"></i> <span v-for="list in item.frontmatter.tag">{{list}}  </span>
                                            <router-link :to="item.path">查看详情 >></router-link> </span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="sm-screen">
                            <div class="col">
                                 <template v-for="(item,index) in filterPages(2,0)">
                                    <div class="page-chunk">
                                        <div class="content-summary">
                                            <div class="title">
                                                {{item.frontmatter.title}}
                                            </div>
                                            <div class="summary">
                                                <img :src="'/images/' + item.frontmatter.illustration.link" alt="" align="top" :class="[item.frontmatter.illustration.position]">
                                                <p>{{item.frontmatter.summary.first}}</p>
                                                <p>{{item.frontmatter.summary.second}}</p>
                                            </div>
                                        </div>
                                        <div class="page-chunk-footer">
                                            <date :time="item.lastUpdated"/>
                                            <i class="iconfont icon-news_hot_light tag-icon"></i> <span v-for="list in item.frontmatter.tag">{{list}}  </span>
                                            <router-link :to="item.path">查看详情 >></router-link> </span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="col">
                                 <template v-for="(item,index) in filterPages(2,1)">
                                    <div class="page-chunk">
                                        <div class="content-summary">
                                            <div class="title">
                                                {{item.frontmatter.title}}
                                            </div>
                                            <div class="summary">
                                                <img :src="'/images/' + item.frontmatter.illustration.link" alt="" align="top" :class="[item.frontmatter.illustration.position]">
                                                <p>{{item.frontmatter.summary.first}}</p>
                                                <p>{{item.frontmatter.summary.second}}</p>
                                            </div>
                                        </div>
                                        <div class="page-chunk-footer">
                                            <date :time="item.lastUpdated"/>
                                            <i class="iconfont icon-news_hot_light tag-icon"></i> <span v-for="list in item.frontmatter.tag">{{list}}  </span>
                                            <router-link :to="item.path">查看详情 >></router-link> </span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="page-content" v-if="!$page.frontmatter.home">
                        <Content/>
                    </div>
                </scroll>
            </div>
            <!-- <div class="directory"></div> -->
        </div>

    </div>
</template>

<script>
import {EventUtil} from '../assets/util'
import scroll from '../components/scroll.vue'
import '../public/css/theme.less'
export default {
    data(){
        return {
            resize: false,
            nav: '/'
        }
    },
    watch: {
        '$route'(to,from){
            this.scrollResize();

        }
    },
    methods: {
        scrollResize(){
            this.resize = !this.resize;
        },
        navLink(link){
            this.nav = link;
            this.scrollResize();
            this.$router.push({path: '/'});
            this.$nextTick(function(){
                this.scrollResize();
            })
        },
        filterPages(cols,col_index){
            return this.pages.filter((item,index) => {
                return index % cols == col_index;
            })
        }
    },
    mounted(){
        this.scrollResize();
        EventUtil.add(window, 'resize', this.scrollResize);
    },
    computed: {
        pages: function(){
            return this.$site.pages.filter(item => {
                return item.path.indexOf(this.nav) > -1;
            }).sort(function(value1,value2){
                return value1 - value2;
            })
        }
    },
    updated() {
        console.log('update')
    },
    components: {
        scroll
    }
};
</script>
<style lang="less" scoped>


</style>
