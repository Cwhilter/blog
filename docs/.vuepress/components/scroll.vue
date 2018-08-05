<template>
    <div class="component-scroll-wrapper" :style="{width: wrapperWidth,height: wrapperHeight}" ref="wrapper" @mousewheel="handleMouseWheel" @DOMMouseScroll="handleMouseWheel">
        <div class="component-scroll-container" ref="container">
            <div ref="content" class="component-scroll-content" :style="{top: vertical.scrollOffset + 'px', left: horizontal.scrollOffset + 'px', width: setContentWidth, height: setContentHeight}">
                <slot>
                    
                </slot>
            </div>
            <div class="vertical-scroll" ref="stripContainer" @click.stop="stopEvent" v-show="this.vertical.wrapper < this.vertical.content" :style="{height: setContentHeight, width: (size ? size : 0.8) + 'rem'}">
                <div class="vertical-scroll-bar" @mouseout="recoverScrollBg" @mouseover="changeScrollBg" ref="strip" @mousedown.stop="handlerMouseDown('vertical',$event)" :style="{height: vertical.scrollBar + 'px', top: vertical.scrollBarOffset + 'px', backgroundColor: scrollBarBg}"></div>
            </div>
            <div class="horizontal-scroll" ref="stripContainer" @click.stop="stopEvent" v-show="this.horizontal.wrapper < this.horizontal.content" :style="{width: setContentWidth, height: (size ? size : 0.8) + 'rem'}">
                <div class="horizontal-scroll-bar" @mouseout="recoverScrollBg" @mouseover="changeScrollBg" ref="strip" @mousedown.stop="handlerMouseDown('horizontal',$event)" :style="{width: horizontal.scrollBar + 'px', left: horizontal.scrollBarOffset + 'px', backgroundColor: scrollBarBg}"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {EventUtil,debounce} from '../assets/util'

export default {
    props: {
        maxWidth: {
            type: Number,
            default: 0
        },
        maxHeight: {
            type: Number,
            default: 0
        },
        resize: Boolean,
        size: Number,
        bgColor: {
            type: String,
            default: '#d3d6d9'
        },
        hoverBgColor: {
            type: String,
            default: '#959ba2'
        },
        wheelSize: {
            type: Number,
            default: 100,
        },
        allowPageScroll: {
            type: Boolean,
            default: false
        }, //是否 使用滚轮到达顶端/底端时，滚动窗口
    },
    data(){
        return {
            initSize: {},
            remSize: 16,
            vertical: {
                wrapper: 0,
                content: 0,     
                scrollBar: 0,
                scrollOffset: 0,
                scrollBarOffset: 0,
                startMove: false,
                axis: 0,            
            },
            horizontal: {
                wrapper: 0,
                content: 0,     
                scrollBar: 0,
                scrollOffset: 0,
                scrollBarOffset: 0,
                startMove: false,
                axis: 0,     
            },
            scrollBarBg: '#d3d6d9',
            timeoutIdD: Object,
            binded: false,            
            direction: 'vertical',
            throttle: 14,          
            moveThrottle: this.generateThrottle(this.throttle)
        }
    },
    mounted(){
        this.scrollBarBg = this.bgColor; 
        EventUtil.add(window, 'load', this._checkScroll)
        EventUtil.add(window, 'resize', debounce(this.resizeScroll,100))
        this.remSize = parseInt(window.document.documentElement.style.fontSize);
    },
    beforeDestroy(){
        EventUtil.remove(window, 'load', this._checkScroll);
    },
    computed: {
        setContentWidth:function(){
            return this.vertical.wrapper < this.vertical.content ? 'calc(100% - ' + (this.size ? this.size : 0.8) + 'rem' + ')' : '100%';
        },
        setContentHeight: function(){
            return this.horizontal.wrapper < this.horizontal.content ? 'calc(100% - ' + (this.size ? this.size : 0.8) + 'rem' + ')' : '100%'
        },
        wrapperHeight(){
            return this.maxHeight == 0 || this.vertical.content <= this.maxHeight * this.remSize ? '100%' : this.maxHeight * this.remSize + 'px';
        },
        wrapperWidth(){
            return this.maxWidth == 0 || this.horizontal.content <= this.maxWidth * this.remSize ? '100%' : this.maxWidth * this.remSize + 'px';
        }
    },
    methods: {
        stopEvent(){
            return;
        },
        generateThrottle(throttleTime) {
            let time = Date.now()
            return function (now) {
                // 如果没有设置节流时间， 使用默认配置的时间 14毫秒
                if (now - time > (throttleTime || 14)) {
                time = now
                return true
                }
            }
        },
        changeScrollBg(){
            this.scrollBarBg = this.hoverBgColor;
        },
        recoverScrollBg(){
            this.scrollBarBg = this.bgColor;            
        },
        bindEvents () {
            // 已绑定过了 不再重复绑定

            if (this.binded) return
            EventUtil.add(document, 'mouseup', this.handlerMouseUp)
            EventUtil.add(document, 'mousemove', this.handlerMove)
            this.binded = true
        },
        // 鼠标按下事件
        handlerMouseDown (direction,event) {
            event.preventDefault()
            event.stopPropagation()
            event.stopImmediatePropagation()
            this.direction = direction;            
            // 只有鼠标左键可以拖动
            if (event.button !== 0) {
                return
            }
            
            // 标记开始拖拽滚动条
            this[direction].startMove = true
            // 记录鼠标起始的位置
            const clientAxis = direction == 'vertical' ? 'clientY' : 'clientX';            
            this[direction].axis = event[clientAxis];
            // 给document绑定 mouseup与mousemove
            this.bindEvents()
            return false
        },
        handlerMouseUp (event) {
            let direction = this.direction;
            // 鼠标抬起, 结束拖拽状态
            this[direction].startMove = false
        },
        handlerMove (event) {
            // 如果不是在鼠标按下的状态 || 节流控制，在指定时间内只执行一次
            let direction = this.direction;            
            if (!this[direction].startMove || !this.moveThrottle(Date.now())) return
            event.preventDefault()
            event.stopPropagation()
            event.stopImmediatePropagation()
            /**
             * offset = 鼠标移动的偏移量 + 滚动条当前的偏移量
             * offset为滚动条需要移动到的位置
             * event[this.config.clientAxis] - this.axis = 鼠标移动后与移动前的偏移量
             */
            const clientAxis = direction == 'vertical' ? 'clientY' : 'clientX';
            const offset = this[direction].axis - event[clientAxis];
            // 更新鼠标偏移量的值
            this[direction].axis = event[clientAxis];
            this.changeOffset(offset,direction)
        },
        resizeScroll(){
            if(this.$refs['wrapper'] && this.$refs['content']){
                this.$nextTick(function(){
                    this.remSize = parseInt(window.document.documentElement.style.fontSize);
                    let slot = this.$slots.default[0].elm;
                    this.vertical.content = this.$refs['content'].scrollHeight;
                    if(this.maxHeight !== 0){
                        this.vertical.wrapper = this.maxHeight * this.remSize;
                    }else{
                        this.vertical.wrapper = this.$refs['wrapper'].clientHeight;                    
                    }
                    
                    //设置滚动条高度
                    this.vertical.scrollBar = this.vertical.wrapper * this.vertical.wrapper / this.vertical.content;
                    this.vertical.scrollOffset = 0;
                    this.vertical.scrollBarOffset = 0;
                    //this.vertical.heightDif = this.vertical.wrapperHeight - this.vertical.verticalScrollBar;
                    this.horizontal.content = slot.scrollWidth;
                    //如果没有设置maxWidth采用wrapper的clientWidth
                    if(this.maxWidth !== 0){
                        this.horizontal.wrapper = this.maxWidth * this.remSize;
                    }else{
                        this.horizontal.wrapper = this.$refs['wrapper'].clientWidth;
                    }
                    
                    //设置滚动条高度
                    this.horizontal.scrollBar = this.horizontal.wrapper * this.horizontal.wrapper / this.horizontal.content;
                    //通过上次停留位置计算滚动条位置
                    this.horizontal.scrollOffset = 0;
                    this.horizontal.scrollBarOffset = 0;
                })
            }
        },
        _checkScroll(){
            if(this.$refs['wrapper'] && this.$refs['content']){
                this.$nextTick(function(){
                    this.remSize = parseInt(window.document.documentElement.style.fontSize);
                    let slot = this.$slots.default[0].elm;
                    let bottom = this.vertical.wrapper - this.vertical.scrollBar - this.vertical.scrollBarOffset;
                    let v_lastContent = this.vertical.content;
                    let right = this.horizontal.wrapper - this.horizontal.scrollBar - this.horizontal.scrollBarOffset;
                    let h_lastContent = this.horizontal.content;
                    this.vertical.content = this.$refs['content'].scrollHeight;
                    if(this.maxHeight !== 0){
                        this.vertical.wrapper = this.maxHeight * this.remSize;
                    }else{
                        this.vertical.wrapper = this.$refs['wrapper'].clientHeight;                    
                    }
                    
                    //设置滚动条高度
                    this.vertical.scrollBar = this.vertical.wrapper * this.vertical.wrapper / this.vertical.content;
                    this.vertical.scrollOffset = 0;
                    this.vertical.scrollBarOffset = 0;
                    // if(this.vertical.wrapper >= this.vertical.content){
                    //     this.vertical.scrollOffset = 0;
                    //     this.vertical.scrollBarOffset = 0;
                    // }else if(v_lastContent > this.vertical.content){
                    //     if(bottom < (v_lastContent - this.vertical.content) * (this.vertical.wrapper / v_lastContent)){
                    //         this.vertical.scrollOffset = this.vertical.wrapper - this.vertical.content;
                    //         this.vertical.scrollBarOffset = this.vertical.wrapper - this.vertical.scrollBar;
                    //     }
                    // }
                    //this.vertical.heightDif = this.vertical.wrapperHeight - this.vertical.verticalScrollBar;
                    this.horizontal.content = slot.scrollWidth;
                    //如果没有设置maxWidth采用wrapper的clientWidth
                    if(this.maxWidth !== 0){
                        this.horizontal.wrapper = this.maxWidth * this.remSize;
                    }else{
                        this.horizontal.wrapper = this.$refs['wrapper'].clientWidth;
                    }
                    
                    //设置滚动条高度
                    this.horizontal.scrollBar = this.horizontal.wrapper * this.horizontal.wrapper / this.horizontal.content;
                    this.horizontal.scrollOffset = 0;
                    this.horizontal.scrollBarOffset = 0;
                    //通过上次停留位置计算滚动条位置
                    // if(this.horizontal.wrapper >= this.horizontal.content){
                    //     this.horizontal.scrollOffset = 0;
                    //     this.horizontal.scrollBarOffset = 0;
                    // }else if(h_lastContent > this.horizontal.content){
                    //     if(right < (h_lastContent - this.horizontal.content) * (this.horizontal.wrapper / h_lastContent)){
                    //         this.horizontal.scrollOffset = this.horizontal.wrapper - this.horizontal.content;
                    //         this.horizontal.scrollBarOffset = this.horizontal.wrapper - this.horizontal.scrollBar;
                    //     }
                    // }
                })
            }
        },
        changeOffset(offset,direction){
            this.scrollBarBg = this.hoverBgColor;            
            let distance = Math.ceil(this[direction].scrollBarOffset - offset);
            let distanceDif = this[direction].wrapper - this[direction].scrollBar;
            if(distance >= distanceDif){
                this[direction].scrollBarOffset = distanceDif;
                this[direction].scrollOffset = -(this[direction].content - this[direction].wrapper);
                return false;
            }
            if(distance < 0){
                this[direction].scrollBarOffset = 0;
                this[direction].scrollOffset = 0;
                return false;
            }
            this[direction].scrollBarOffset -= offset;
            this[direction].scrollOffset += offset * (this[direction].content / this[direction].wrapper);
            return true;
        },
        handleMouseWheel(event){
            if(this.vertical.wrapper < this.vertical.content){
                event = EventUtil.getEvent(event);
                
                let delta = EventUtil.getWheelDelta(event);
                let offset = (delta/120)*this.wheelSize;
                let bool = this.changeOffset(offset, 'vertical');
                if(this.allowPageScroll){
                    if(bool){
                        event.stopPropagation();                
                    }
                }else{
                    event.stopPropagation();
                }
                
            }
            
        }
    },
    watch: {
        resize: function(){
            this._checkScroll();
        },
        scrollBarBg: function(newData){
            if(newData == this.hoverBgColor){
                clearTimeout(this.timeoutIdD);
                this.timeoutIdD = setTimeout(() => {
                    this.scrollBarBg = this.bgColor;
                },1000)
            }
        }
    },
    components: {
        
    }
};
</script>
<style lang="less" scoped>


</style>
