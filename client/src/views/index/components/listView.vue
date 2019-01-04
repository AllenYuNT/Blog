<!-- listView -->
<template>
    <div class="listView">
        <ul class="wrap" v-if="showDetail">
            <li v-for="(blog, i) in blogs" :key="i">
                <div class="year">
                    <i class="icon"></i>
                    <span>{{blog.time}}</span>
                </div>
                
                <ul>
                    <li ref="listView" v-for="(item, j) in blog.data" :key="j" @click="showBlogDetail(item)">
                        <i class="icon"></i>
                        <span class="time">{{item.time}}</span>
                        <span class="title">{{item.title}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'listView',
    data () {
        return {
            blogs: {},
            showDetail: false
        };
    },
    mounted() {
        let req = {
            page: 1,
            pageSize: 10
        }
        this.$api.post("/getBlog", req).then(res => {
            res.code == 200 ? this.initListData(res.data) : this.$Message.error(res.msg)
        }, err => {this.$Message.error('服务器错误')})
    },

    components: {},

    methods: {
        initListData(data) {
            let blogs = {};
            data.rows.map(item => {
                let year = new Date(item.date).getFullYear();
                if(!blogs['year-' + year]) {
                    blogs['year-' + year] = {
                        time: year,
                        data: []
                    }
                }
            })
            data.rows.map(item => {
                let year = new Date(item.date).getFullYear();
                item.time = this.$getLocalTime(item.date);
                if(blogs['year-' + year].time == year) {
                    blogs['year-' + year].data.push(item)
                }
            })
            this.blogs = blogs;
            this.showDetail = true;

            this.$nextTick(() => {
                this.showItem()
            })
        },
        showItem() {
            let listView = this.$refs.listView;
            let i = 0;
            let showAnima = setInterval(() => {
                if(i<listView.length) {
                    this.addClass(listView[i], 'showItem');
                    i++;
                }else {
                    clearInterval(showAnima)
                }
            }, 200)
        },
        showBlogDetail(data) {
            this.$router.push({path: `/index/${data.id}`});
        }
    },
}

</script>

<style scoped lang='less'>
.listView {
    width: 500px;
    height: auto;
    margin: 20px auto;
    // border: 1px solid #eee;
    font-size: 0.8rem;
    .wrap{
        border-left: 4px solid #eee;
        padding: 20px 0 0 0;
        li {
            padding-bottom: 10px;
            .icon {
                display: inline-block;
                vertical-align: middle;
                width: 6px;
                height: 6px;
                background: #777;
                border-radius: 50%;
                margin-right: 10px;
                vertical-align: middle;
            }
            .year{
                // height: 30px;
                padding: 10px 0;
                .icon{
                    width: 8px;
                    height: 8px;
                    margin-left: -6px;
                }
                span {
                    vertical-align: middle;
                    font-size: 1.5rem;
                }
                
            }
            ul {
                padding: 10px 0 0 0;
                li{
                    cursor: pointer;
                    height: 35px;
                    line-height: 35px;
                    padding: 0;
                    position: relative;
                    opacity: 0;
                    .icon {
                        margin-left: -5px;
                        z-index: 10;
                    }
                    span {
                        display: inline-block;
                        margin-left: 10px;
                        vertical-align: middle;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        &.title{
                            width: auto;
                            font-weight: 500;
                            max-width: 300px;
                        }
                        &.time{
                            width: 50px;
                            font-size: 0.6rem;
                        }
                    }
                    &:hover{
                        background: #eee;
                        color: #000;
                        box-shadow: 2px 5px 5px #ccc;
                    }
                    &.showItem {
                        animation: showListItem 0.4s;
                        opacity: 1;
                    }
                }
            }
            
        }
    }

    @keyframes showListItem {
        0%{
            transform: translate(70%, 0);
            opacity: 0;
        }
        100%{
            transform: translate(0, 0);
            opacity: 1;
        }
    }
}
@media screen and (max-width: 800px) {
    .listView {
        width: 80vw;
        // transform: scale(0.8);
        margin: 0 auto;
        .wrap {
            li {
                ul {
                    li {
                        span {
                            &.title{
                                max-width: 200px;
                            }
                        }
                    }
                }
            }
        }
        
    }
}
</style>