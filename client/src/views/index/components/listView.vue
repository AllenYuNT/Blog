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
                    <li v-for="(item, j) in blog.data" :key="j" @click="showBlogDetail(item)">
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
        },
        showBlogDetail(data) {
            console.log(data);
            this.$router.push({path: `/index/${data.id}`, name: 'detail'});
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
    .wrap{
        border-left: 4px solid #eee;
        padding: 20px 0;
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
                    font-size: 28px;
                }
                
            }
            ul {
                padding: 10px 0;
                li{
                    height: 40px;
                    line-height: 40px;
                    padding: 0;
                    cursor: pointer;
                    .icon {
                        margin-left: -5px;
                    }
                    span {
                        display: inline-block;
                        margin-left: 10px;
                        vertical-align: middle;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        &.title{
                            width: 300px;
                            font-weight: 500;
                        }
                        &.time{
                            width: 50px;
                            font-size: 14px;
                        }
                    }
                    &:hover{
                        background: #eee;
                        box-shadow: 2px 5px 5px #ccc;
                    }
                }
            }
            
        }
    }
}
</style>