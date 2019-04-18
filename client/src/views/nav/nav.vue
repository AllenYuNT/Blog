<!-- nav -->
<template>
    <div class="nav-wrap">
        <h3 @click="login">Allen Yu's Blog</h3>
        <div class="nav">
            <div class="item" v-for="(item,i) in links" :key="i">
                <router-link  :to="item.link" v-if="item.link">
                    <sicon class="icon" :name="item.icon" scale="2.1" />
                    <span>{{item.name}}</span>
                </router-link>
                <a v-else :href="item.href" target="_Blank">
                    <sicon class="icon" :name="item.icon" scale="2.1" />
                    <span>{{item.name}}</span>
                </a>
            </div>
        </div>
        <div class="login">
            <Modal
                v-model="loginBox"
                title="请登录"
                width="400"
                @on-ok="loginIn">
                <div class="login-box">
                    <Input prefix="ios-contact" v-model="username" placeholder="username" style="width: 230px; margin: 10px;" />
                </div>
                <div>
                    <Input prefix="md-lock" v-model="password" type="password" placeholder="password" style="width: 230px; margin: 10px;" />
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'navigation',
        data() {
            return {
                loginBox: false,
                username: '',
                password: '',
                links: [{
                        name: '首页',
                        link: '/index',
                        icon: 'index'
                    },
                    // {name: '编辑', link: '/edit', icon: 'blog'},
                    {
                        name: '归档',
                        link: '/pigeonhole',
                        icon: 'all'
                    },
                    {
                        name: '相册',
                        link: '/album',
                        icon: 'album'
                    },
                    {
                        name: 'Github',
                        href: 'https://github.com/AllenYuNT',
                        icon: 'github'
                    }
                ]
            };
        },

        components: {},

        methods: {
            login() {
                this.loginBox = true;
            },
            loginIn() {
                let req = {
                    username: this.username,
                    password: this.password
                }
                this.$api.post('/login', req).then(res => {
                    res.code == 200 ? this.loginSuccess(res) : this.$Message.error(res.msg)
                })
            },
            loginSuccess(res) {
                sessionStorage.setItem('token', `Bearer ${res.token}`);
                this.$Message.success(res.msg)
            }
        },

    }
</script>

<style scoped lang='less'>
    .nav-wrap {
        width: 100%;
        height: 190px;
        text-align: center;
        // padding-bottom: 20px;
        border-bottom: 2px solid #eee;

        h3 {
            cursor: pointer;
            margin: 0 auto;
            margin-top: 60px;
            padding: 8px 15px;
            font-size: 15px;
            display: inline-block;
            background: #111;
            color: #fff;
            padding: 8px 10px;
            display: inline-block;
            background: #111;
            color: #fff;
        }

        .nav {
            margin-top: 30px;
            font-size: 13px;

            .item {
                cursor: pointer;
                display: inline-block;
                width: 50px;
                a {
                    cursor: pointer;
                    display: inline-block;
                    text-align: center;
                    padding: 5px 0;
                    color: #000;
                    text-align: center;

                    &.router-link-active {
                        color: rgb(128, 125, 125);
                    }

                    .icon {
                        display: block;
                        margin: 5px auto;
                    }

                    span {
                        font-size: 12px;
                    }
                }
            }

        }
    }
    @media screen and (max-width: 800px) {
        .nav-wrap{
            height: 140px;
            h3 {
                margin-top: 30px;
            }
            .nav {
                margin-top: 10px;
            }
        }
    }
</style>