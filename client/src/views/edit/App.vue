<!-- App -->
<template>
    <div class="edit">
        <operating v-on:saveData="saveData" class="operating-wrap" />
        <div class="title">
            <input v-model="title" type="text" placeholder="主题">
        </div>
        <div class="edit-box">
            <show-wrap :markedData="markedData" class="edit-wrap" />
            <div class="editWrap">
                <textarea v-model="editData" @input="changeValue" @keydown.tab="tab" placeholder="write something here" />
            </div> 
        </div>
    </div>
</template>

<script>
    // import marked from 'marked'
    // import hljs from 'highlight.js';
    import showWrap from './components/showWrap';
    import operating from './components/operating.vue';

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        }
    });

    export default {
        name: 'App',
        data() {
            return {
                editData: '', //编辑框内输入的内容
                markedData: '', //转化后内容
                title: '',
            };
        },

        components: {
            showWrap,
            operating
        },

        mounted() {
            let id = this.$route.params.id;
            if(id){
                this.$api.get(`/getBlog?id=${this.$route.params.id}`).then(res => {
                    res.code == 200 ? this.initBlogData(res.data) : this.$Message.error(res.msg);
                });
            }
        },

        methods: {
            initBlogData(data) {
                this.title = data.title;
                this.editData = this.$replaceCodeData(data.mddata);
                this.markedData = this.$replaceCodeData(data.md);
                console.log(data.date);
            },
            // 屏蔽teatarea tab默认事件
            tab(e) {
                this.editData = this.editData + "    ";
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            },
            changeValue() {
                this.markedData = marked( this.editData, {
                    sanitize: true
                });
            },
            saveData(time) {
                let id = this.$route.params.id;
                let reqUrl = '/saveBlog';
                let req = {
                    author: 'Allen Yu',
                    date: time,
                    title: this.title,
                    md: this.$replace(this.markedData),
                    mddata: this.$replace(this.editData)
                }
                if (id) {
                    req = Object.assign({}, req, {id: id})   
                    reqUrl = '/updateBlog'
                }
                console.log(req);
                this.$api.post(reqUrl, req).then(res => {
                    this.$Message.success('保存成功');
                    this.savedDataSuccess();
                }, err => {
                    this.$Message.error('error');
                })
            },
            savedDataSuccess() {
                this.$router.push('/pigeonhole')
            }
        }

    }
</script>

<style scoped lang='less'>
    .edit {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .operating-wrap{
            width: auto;
            height: 30px;
            padding: 0 40px;
        }
        .title {
            position: absolute;
            top: 0;
            left: 40px;
            input {
                height: 30px;
                line-height: 30px;
                border: 1px solid #eee;
                border-radius: 4px;
                padding: 0 10px;
                font-size: 13px;
            }
        }
        .edit-box {
            position: absolute;
            top: 30px;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 10px 30px;
            display: flex;

            .edit-wrap {
                flex: 1;
                margin: 0 10px;
                padding: 10px 20px;
                border: 1px solid #eee;
                border-radius: 5px;
            }
            .editWrap {
                flex: 1;
                margin: 0 10px;
                padding: 10px 20px;
                border: 1px solid #eee;
                border-radius: 5px;
                textarea {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    line-height: 25px;
                }
    }
        }
    }
</style>