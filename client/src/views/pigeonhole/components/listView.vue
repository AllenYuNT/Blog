<!-- listView -->
<template>
    <div class="list-view">
        <div class="listData">
            <div class="item-wrap">
                <div class="item" v-for="(item, i) in listData" :key="i" @click="showItem(item)">
                    <div @click.stop="editItem(item)" class="edit-item">
                        <sicon name="edit" scale="2.0"></sicon>
                    </div>
                    <h3>{{item.title}}</h3>
                    <h4>{{item.time}}</h4>
                </div>
            </div>
            <div class="pagination">
                <pagination v-if="showPageination" :pagedata="pageData" v-on:returnThePageNum="getThePageNum" />
            </div>
        </div>
    </div>
</template>

<script>
    import pagination from './pagination'
    export default {
        name: 'listView',
        data() {
            return {
                listData: [],
                showPageination: false,
                pageData: {
                    allPage: 15,
                    showItem: 3
                },
            };
        },

        mounted() {
            let req = {
                page: 1,
                pageSize: 5
            }
            this.$api.post("/getBlog", req).then(res => {
                res.code == 200 ? this.initListData(res.data) : this.$Message.error(res.msg)
            }, err => {
                this.$Message.error('服务器错误')
            })
        },

        components: {
            pagination
        },

        methods: {
            initListData(data) {
                this.listData = data.rows.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        time: this.$getLocalTime(item.date, true),
                    }
                });
                this.pageData.allPage = Math.ceil(data.count / 5);
                this.showPageination = true;
            },
            getThePageNum(res) {
                let req = {
                    page: res,
                    pageSize: 5
                }
                this.$api.post("/getBlog", req).then(res => {
                    res.code == 200 ? this.initListData(res.data) : this.$Message.error(res.msg)
                }, err => {
                    this.$Message.error('服务器错误')
                })
            },
            showItem(data) {
                this.$router.push({
                    path: `/pigeonhole/${data.id}`
                });
            },
            editItem(data) {
                if(sessionStorage.getItem('token')) {
                    this.$router.push({path: `/edit/${data.id}`})
                }else{
                    this.$Message.error("你没有权限")
                }
            }
        },

    }
</script>

<style scoped lang='less'>
    .list-view {
        width: auto;
        height: auto;
        .listData {
            .item-wrap {
                height: 440px;
                .item {
                    cursor: pointer;
                    width: 400px;
                    position: relative;
                    height: auto;
                    padding: 15px 0;
                    margin: 15px auto;
                    border: 1px solid #eee;
                    box-shadow: 2px 5px 5px #ddd;
                    text-align: center;
                    z-index: 10;

                    h3 {
                        font-weight: 500;
                        height: 25px;
                        text-align: center;
                        font-size: 1.1rem;
                    }

                    h4 {
                        font-size: 0.8rem;
                        text-align: center;
                        height: 18px;
                        border-bottom: 1px dashed #eee;
                    }
                    span{
                        cursor: pointer;
                        display: inline-block;
                        font-size: 0.6rem;
                        padding: 0 20px;
                        height: 25px;
                        line-height: 25px;
                        &:hover {
                            color: #0ba0ef;
                        }
                    }
                    &:hover {
                        border: 1px solid #eee;
                        box-shadow: 4px 8px 8px #ccc;
                        animation: showItem .2s;
                        transform: scale(1.1);
                    }

                    .edit-item {
                        cursor: pointer;
                        position: absolute;
                        right: 5px;
                        top: 5px;
                        z-index: 20;

                        &:hover {
                            transform: scale(1.2)
                        }
                    }
                }
            }
        }

        @keyframes showItem {
            0% {
                transform: scale(1.0)
            }

            70% {
                transform: scale(1.2)
            }

            100% {
                transform: scale(1.1);
            }
        }
    }
    @media screen and (max-width: 800px) {
        .list-view {
            .listData {
                .item-wrap {
                    height: 350px;
                    .item {
                        width: 80vw;
                        padding: 5px;
                        h3 {
                            font-size: 0.9rem;
                        }
                        h4 {
                            font-size: 0.4rem;
                        }
                    }
                }
            }
        }
    }
</style>