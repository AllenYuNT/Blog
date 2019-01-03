<!-- detail -->
<template>
    <div>
        <div class="back" @click="back">
            <span>返回</span>
        </div>
        <div class="backToTop" v-show="showTop" @click="toTop">
            <sicon name="backToTop" scale="2.5"></sicon>
        </div>
        <div class="content">
            <span>访问量：{{pv}}</span>
        </div>
        <div class="markdown detail" v-html="mdContent">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'detail',
        data() {
            return {
                mdContent: '',
                pv: 0,
                showBackToTop: false,
                scrollTop: 0,
                time: 0,
                dParams: 20,
                scrollState: 0
            };
        },

        computed: {
            showTop: function() {
                let value = this.scrollTop > 200 ? true : false;
                return value;
            },
        },

        mounted() {
            this.$api.get(`/getBlog?id=${this.$route.params.id}`).then(res => {
                res.code == 200 ? this.initBlogData(res.data) : this.$Message.error(res.msg);
            });
            window.addEventListener('scroll', this.getScrollTop)
        },

        components: {},

        methods: {
            initBlogData(data) {
                this.mdContent = this.$replaceCodeData(data.md);
                this.pv = data.pv;
            },
            back() {
                this.$router.back()
            },
            backToTop() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
            },
            toTop(e) {
                if (!!this.scrollState) {
                    return;
                }
                this.scrollState = 1;
                e.preventDefault();
                let distance = document.documentElement.scrollTop || document.body.scrollTop;
                let _this = this;
                this.time = setInterval(function() {
                    _this.gotoTop(_this.scrollTop - _this.dParams)
                }, 10);
            },
            gotoTop(distance) {
                this.dParams += 20;
                distance = distance > 0 ? distance : 0;
                document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
                if (this.scrollTop < 10) {
                    clearInterval(this.time);
                    this.dParams = 20;
                    this.scrollState = 0;
                }
            },
            getScrollTop() {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            }
        },

    }
</script>

<style scoped lang='less'>
    .detail {
        background: #fff;
        width: 800px;
        height: auto;
        margin: 0 auto;
        padding: 50px;
        font-family: "Open Sans", "Clear Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: rgb(51, 51, 51);
        line-height: 1.6;
    }

    .back {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: auto;
        height: 30px;
        line-height: 30px;
        border: 1px solid #eee;
        border-radius: 15px;
        margin-left: -40px;
        text-align: right;
        padding: 0 20px 0 40px;
        font-size: 12px;

        &:hover {
            animation: showBack .2s;
            transform: scale(1.2);
            left: 20px;
            background: #118cf5;
            color: #fff;
        }
    }

    .backToTop {
        position: fixed;
        right: 20px;
        bottom: 30px;
        width: 40px;
        height: 40px;
        border: 1px solid #eee;
        border-radius: 3px;
        cursor: pointer;

        svg {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            animation: backToTop 1.5s infinite;
        }
    }
    .content {
        text-align: right;
        
        span {
            margin-right: 20px;
            font-size: 13px;
        }
    }

    @keyframes showBack {
        0% {
            left: 0;
        }

        100% {
            transform: scale(1.2);
            left: 20px;
        }
    }

    @keyframes backToTop {
        0% {
            top: 70%;
        }

        100% {
            top: 30%;
        }
    }
</style>