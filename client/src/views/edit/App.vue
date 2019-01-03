<!-- App -->
<template>
    <div class="edit">
        <operating v-on:saveData="saveData" class="operating-wrap" />
        <div class="title">
            <input v-model="title" type="text" placeholder="主题">
            <input type="button" value="login" @click="login">
        </div>
        <div class="edit-box">
            <show-wrap :editData="editData" class="edit-wrap" />
            <edit-wrap ref="editWrap" :savedData="preEditData" v-on:returnEditValue="getEditValue" class="edit-wrap" />
        </div>
    </div>
</template>

<script>
    // import marked from 'marked'
    // import hljs from 'highlight.js';
    import showWrap from './components/showWrap';
    import editWrap from './components/editWrap';
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
                editData: '',
                preEditData: '',
                title: ''
            };
        },

        components: {
            showWrap,
            editWrap,
            operating
        },

        mounted() {
            console.log(this.$refs.editWrap);
        },

        methods: {
            getEditValue(res) {
                let editData = this.$replaceCodeData(res);
                this.editData = marked(editData, {
                    sanitize: true
                });
            },
            saveData(time) {
                console.log("time: " + time);
                let req = {
                    author: 'Allen Yu',
                    date: time,
                    title: this.title,
                    md: this.$replaceData(this.editData)
                }
                // console.log(new Date(time));
                this.$api.post("/saveBlog", req).then(res => {
                    this.$Message.success('保存成功');
                    this.savedDataSuccess();
                    console.log(res);
                }, err => {
                    this.$Message.error('error');
                })
            },
            savedDataSuccess() {
                this.title = '';
                this.editData = '';
                this.preEditData = '';
                this.$refs.editWrap.savedDataSuccess();
            },
            login() {
                this.$api.get('/login').then(res => {
                    console.log("login success");
                    this.$Message.success('登录成功');
                    sessionStorage.setItem('token', `Bearer ${res.token}`)
                })
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
        }
    }
</style>