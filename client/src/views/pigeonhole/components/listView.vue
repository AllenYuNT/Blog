<!-- listView -->
<template>
    <div class="list-view">
        <div class="listData">
            <div class="item" v-for="(item, i) in listData" :key="i" @click="showItem(item)">
                <sicon @click="editItem" class="edit-item" name="edit" scale="2.0"></sicon>
                <h3>{{item.title}}</h3>
                <h4>{{item.time}}</h4>
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
                }
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
                console.log(data);
                this.$router.push({path: `/pigeonhole/${data.id}`});
            },
            editItem(event) {
                console.log(event);
            }
        },

    }
</script>

<style scoped lang='less'>
    .list-view {
        width: auto;
        height: auto;

        .listData {
            .item {
                cursor: pointer;
                width: 400px;
                // text-align: center;
                height: auto;
                padding: 10px 0;
                margin: 15px auto;
                border: 1px solid #fff;
                box-shadow: 2px 5px 5px #ddd;

                h3 {
                    font-weight: 500;
                    height: 25px;
                    text-align: center;
                }

                h4 {
                    font-size: 13px;
                    text-align: center;
                }

                &:hover {
                    border: 1px solid #eee;
                    box-shadow: 4px 8px 8px #ccc;
                    animation: showItem .2s;
                    transform: scale(1.1);
                }
                .edit-item{
                    position: relative;
                    top: -10px;
                    left: 380px;
                    z-index: 20;
                    &:hover{
                        transform: scale(1.2)
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
</style>