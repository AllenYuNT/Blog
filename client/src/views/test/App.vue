<!-- App -->
<template>
    <div class="test">
        <h3>test drag</h3>
        <div ref="drag" class="drag" @mousedown="getDragBox" @mouseup="completeMoveDragBox">drag-box</div>
        <ajax />
    </div>
</template>

<script>
import ajax from './components/ajax';
export default {
    name: 'App',
    data () {
        return {
            positionX: 0,
            positionY: 0
        };
    },

    components: {
        ajax
    },

    methods: {
        getDragBox(e) {
            e = e || window.event;
            console.log(e.clientX, this.$refs.drag.offsetLeft);

            this.positionX = e.clientX - this.$refs.drag.offsetLeft;
            this.positionY = e.clientY - this.$refs.drag.offsetTop;

            this.addClass(this.$refs.drag, 'drag-select');
            document.onmousemove = e => {
                this.moveGragBox(e)
            }
        },
        moveGragBox(e) {
            e = e || window.event;

            let left = e.clientX - this.positionX;
            let top = e.clientY - this.positionY;

            if(left < 0) left = 0;
            if(left >window.innerWidth - this.$refs.drag.offsetWidth) left = window.innerWidth - this.$refs.drag.offsetWidth;

            if(top < 0) top = 0;
            if(top >window.innerHeight-this.$refs.drag.offsetHeight) top = window.innerHeight-this.$refs.drag.offsetHeight;

            this.$refs.drag.style.left = left + 'px';
            this.$refs.drag.style.top = top + 'px';
        },
        completeMoveDragBox(e) {
            this.removeClass(this.$refs.drag, 'drag-select');
            document.onmousemove = null;
            document.onmouseup = null;
        }
    },

}

</script>

<style scoped lang='less'>
.test {
    top: 0;
    background: #fff;
    .drag{
        position: absolute;
        top: 50px;
        left: 50px;
        width: 200px;
        height: 200px;
        border: 1px solid #eee;
        cursor: move;
        user-select: none;
        text-align: center;
    }
    .drag-select {
        box-shadow: 0px 0px 5px 5px #35a7db;
    }
}
</style>