<template>
    <span>
        <i class="iconfont icon-time" style="margin-right:0.4rem"></i>{{date}}
    </span>
</template>

<script>
import {dateFormat} from '../assets/util.js'
export default {
    computed: {

    },
    props: {
        time: {
            type: Number,
            default: Date.now()
        }
    },
    data(){
        return {
            date: dateFormat('yyyy-MM-dd',this.time)
        }
    },
    components: {
        
    }
};
</script>
<style lang="less" scoped>

</style>
